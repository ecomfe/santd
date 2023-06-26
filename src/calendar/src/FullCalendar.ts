/**
 * @file Santd full calendar source file
 * @author mayihui@baidu.com
 **/
import Base from 'santd/base';
import DateTable from './date/DateTable';
import MonthTable from './month/MonthTable';
import dayjs from 'dayjs';
import * as I from './interface';
import {dayjsType} from '../interface';


export default class FullCalendar extends Base {
    static components = {
        's-datetable': DateTable,
        's-monthtable': MonthTable,
    };
    static initData(): I.FullCalendarState {
        return {
            defaultType: 'date',
            fullscreen: false,
            showTypeSwitch: true,
            showHeader: true,
        };
    };
    attached(): void {
        console.log('fullcalendar: ', this.data.get())
    }
    inited(): void {
        const type = this.data.get('type');
        const defaultType = this.data.get('defaultType');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const selectedValue = this.data.get('selectedValue');
        const defaultSelectedValue = this.data.get('defaultSelectedValue');

        this.data.set('type', type || defaultType);
        this.data.set('value', value || defaultValue || dayjs());
        this.data.set('selectedValue', selectedValue || defaultSelectedValue);
        this.data.set('hasMonthCellRender', !!this.sourceSlots.named.customMonthCellRender);
        this.data.set('hasDateCellRender', !!this.sourceSlots.named.customDateCellRender);
    };
    handleSelect(value: dayjsType): void {
        this.data.set('value', value);
        this.fire('select', value);
    };
    handleMonthSelect(value: dayjsType): void {
        this.data.set('value', value);
        this.fire('select', value);
    };
    setType(type: string): void {
        this.data.set('type', type);
        this.fire('typeChange', type);
    };
    static template = /* html */ `
        <div
            class="{{prefixCls}} {{prefixCls}}-full {{fullscreen ? prefixCls + '-fullscreen': ''}}"
            tabIndex="0"
        >
            <calendarheader
                s-if="showHeader"
                prefixCls="{{prefixCls}}"
                key="calendar-header"
                type="{{type}}"
                value="{{value}}"
                locale="{{locale}}"
                showTypeSwitch="{{showTypeSwitch}}"
                fullscreen="{{fullscreen}}"
                on-typeChange="setType"
                on-valueChange="setValue"
            />
            <div key="calendar-body" class="{{prefixCls}}-calendar-body">
            <s-datetable
                s-if="type === 'date'"
                locale="{{locale}}"
                prefixCls="{{prefixCls}}"
                value="{{value}}"
                disabledDate="{{disabledDate}}"
                hasDateRender="{{hasDateCellRender}}"
                on-select="handleSelect"
            >
                <slot
                    name="customDateCellRender"
                    slot="dateRender"
                    var-rootPrefixCls="{{rootPrefixCls}}"
                    var-prefixCls="{{prefixCls}}"
                    var-date="{{date}}"
                    var-value="{{value}}"
                />
            </s-datetable>
            <s-monthtable
                s-else
                locale="{{locale}}"
                prefixCls="{{prefixCls}}-month-panel"
                rootPrefixCls="{{prefixCls}}"
                value="{{value}}"
                disabledDate="{{disabledDate}}"
                hasMonthRender="{{hasMonthCellRender}}"
                on-select="handleMonthSelect"
            >
                <slot
                    name="customMonthCellRender"
                    slot="monthRender"
                    var-rootPrefixCls="{{rootPrefixCls}}"
                    var-prefixCls="{{prefixCls}}"
                    var-month="{{month}}"
                    var-value="{{value}}"
                />
            </s-monthtable>
            </div>
        </div>
    `
};
