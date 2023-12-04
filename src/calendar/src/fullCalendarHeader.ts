/**
 * @file Santd full calendar header file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import {getMonthName} from './util/index';
import Select from '../../select';

export default class FullCalendarHeader extends Base<I.FullCalendarHeaderState, I.FullCalendarHeaderProps, I.FullCalendarHeaderComputed>{
    initData(): I.FullCalendarHeaderState {
        return {
            yearSelectOffset: 10,
            yearSelectTotal: 20,
        };
    }
    static computed: I.FullCalendarHeaderComputed = {
        month(this: FullCalendarHeader) {
            return String(this.data.get('value').month());
        },
        year(this: FullCalendarHeader) {
            return String(this.data.get('value').year());
        },
        months(this: FullCalendarHeader) {
            const result = [];

            for (let i = 0; i < 12; i++) {
                result.push({label: getMonthName(this.data.get('value').month(i)), value: String(i)});
            }
            return result;
        },
        years(this: FullCalendarHeader) {
            const yearSelectOffset = this.data.get('yearSelectOffset');
            const yearSelectTotal = this.data.get('yearSelectTotal');
            const year = this.data.get('year');
            const start = Number(year) - yearSelectOffset;
            const end = start + yearSelectTotal;
            const result = [];

            for (let i = start; i < end; i++) {
                result.push({label: i, value: String(i)});
            }
            return result;
        }
    };
    static components = {
        's-select': Select,
        's-option': Select.Option
    };
    handleChangeTypeToDate(): void {
        this.fire('typeChange', 'date');
    };
    handleChangeTypeToMonth(): void {
        this.fire('typeChange', 'month');
    };
    handleChangeMonth(month: string): void {
        this.fire('valueChange', this.data.get('value').month(parseInt(month, 10)));
    };
    handleChangeYear(year: string): void {
        this.fire('valueChange', this.data.get('value').year(parseInt(year, 10)));
    };
    static template = /* html */ `
        <div class="{{prefixCls}}-header">
            <span class="{{prefixCls}}-header-switcher" s-if="showTypeSwitch">
                <span class="{{prefixCls}}-header-switcher-focus" s-if="type === 'date'">{{locale.month}}</span>
                <span
                    s-else
                    class="{{prefixCls}}-header-switcher-normal"
                    on-click="handleChangeTypeToDate"
                >{{locale.month}}</span>
                <span class="{{prefixCls}}-header-switcher-focus" s-if="type === 'month'">{{locale.year}}</span>
                <span
                    s-else
                    class="{{prefixCls}}-header-switcher-normal"
                    on-click="handleChangeTypeToMonth"
                >{{locale.year}}</span>
            </span>
            <s-select
                s-if="type !== 'month'"
                class="{{prefixCls}}-header-month-select"
                value="{{month}}"
                showSearch="{{false}}"
                on-change="handleChangeMonth"
            >
                <s-option s-for="month in months" value="{{month.value}}">{{month.label}}</s-option>
            </s-select>
            <s-select
                class="{{prefixCls}}-header-year-select"
                value="{{year}}"
                showSearch="{{false}}"
            >
                <s-option s-for="year in years" value="{{year.value}}">{{year.label}}</s-option>
            </s-select>
        </div>
    `
};
