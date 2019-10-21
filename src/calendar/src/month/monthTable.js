/**
 * @file Santd calendar month table file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {getTodayTime, getMonthName} from '../util/index';

const ROW = 4;
const COL = 3;

export default san.defineComponent({
    dataTypes: {
        disabledDate: DataTypes.func,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        months() {
            const value = this.data.get('value');

            const months = [];
            let index = 0;

            for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
                months[rowIndex] = [];
                for (let colIndex = 0; colIndex < COL; colIndex++) {
                    const current = value.clone();
                    current.month(index);
                    const content = getMonthName(current);
                    months[rowIndex][colIndex] = {
                        value: index,
                        content,
                        title: content,
                        current: current
                    };
                    index++;
                }
            }
            return months;
        }
    },
    getContentClass(monthData) {
        const value = this.data.get('value');
        const today = getTodayTime(value);
        const disabledDate = this.data.get('disabledDate');
        const prefixCls = this.data.get('prefixCls');
        const currentMonth = value.month();

        let disabled = false;
        if (disabledDate) {
            const testValue = value.clone();
            testValue.month(monthData.value);
            disabled = disabledDate(testValue);
        }

        let classArr = [`${prefixCls}-cell`];
        let isEqu = today.year() === value.year() && monthData.value === today.month();
        disabled && classArr.push(`${prefixCls}-cell-disabled`);
        monthData.value === currentMonth && classArr.push(`${prefixCls}-selected-cell`);
        isEqu && classArr.push(`${prefixCls}-current-cell`);
        return classArr;
    },
    handleChooseMonth(monthData) {
        const value = this.data.get('value');
        const disabledDate = this.data.get('disabledDate');
        let disabled = false;
        if (disabledDate) {
            const testValue = value.clone();
            testValue.month(monthData.value);
            disabled = disabledDate(testValue);
        }

        if (!disabled) {
            const next = value.clone();
            next.month(monthData.value);
            this.fire('select', next);
        }
    },
    getMonth(monthData) {
        return getMonthName(monthData.current);
    },
    template: `
        <table class="{{prefixCls}}-table" cellSpacing="0" role="grid">
            <tbody class="{{prefixCls}}-tbody">
                <tr
                    s-for="month, index in months"
                    role="row"
                >
                    <td
                        s-for="monthData in month"
                        role="gridcell"
                        title="{{monthData.title}}"
                        class="{{getContentClass(monthData)}}"
                        on-click="handleChooseMonth(monthData)"
                    >
                        <slot
                            name="monthRender"
                            var-rootPrefixCls="{{rootPrefixCls}}"
                            var-month="{{getMonth(monthData)}}"
                            var-value="{{monthData.current}}"
                            s-if="hasMonthRender"
                        />
                        <a class="{{prefixCls}}-month" s-else>{{getMonth(monthData)}}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
});
