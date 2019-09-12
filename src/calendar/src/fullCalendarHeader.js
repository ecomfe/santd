/**
 * @file Santd full calendar header file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {getMonthName} from './util/index';
import Select from '../../select';

export default san.defineComponent({
    dataTypes: {
        value: DataTypes.object,
        locale: DataTypes.object,
        yearSelectOffset: DataTypes.number,
        yearSelectTotal: DataTypes.number,
        Select: DataTypes.func,
        prefixCls: DataTypes.string,
        type: DataTypes.string,
        showTypeSwitch: DataTypes.bool,
        headerComponents: DataTypes.array
    },
    initData() {
        return {
            yearSelectOffset: 10,
            yearSelectTotal: 20
        };
    },
    computed: {
        month() {
            return String(this.data.get('value').month());
        },
        year() {
            return String(this.data.get('value').year());
        },
        months() {
            const value = this.data.get('value').clone();
            const result = [];

            for (let i = 0; i < 12; i++) {
                value.month(i);
                result.push({label: getMonthName(value), value: String(i)});
            }
            return result;
        },
        years() {
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
    },
    components: {
        's-select': Select,
        's-option': Select.Option
    },
    handleChangeTypeToDate() {
        this.fire('typeChange', 'date');
    },
    handleChangeTypeToMonth() {
        this.fire('typeChange', 'month');
    },
    handleChangeMonth(month) {
        const value = this.data.get('value').clone();
        value.month(parseInt(month, 10));
        this.fire('valueChange', value);
    },
    handleChangeYear(year) {
        const value = this.data.get('value').clone();
        value.year(parseInt(year, 10));
        this.fire('valueChange', value);
    },
    template: `
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
});
