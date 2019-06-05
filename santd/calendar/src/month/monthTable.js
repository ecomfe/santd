/**
 * @file Santd calendar month table file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {getTodayTime, getMonthName} from '../util/index';

const ROW = 4;
const COL = 3;

export default san.defineComponent({
    dataTypes: {
        disabledDate: DataTypes.func,
        renderFooter: DataTypes.func,
        rootPrefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        months() {
            const refresh = this.data.get('refresh');
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
        },
        injectCell() {
            const instance = this.data.get('instance');
            const cellRender = this.data.get('cellRender');
            const contentRender = this.data.get('contentRender');

            let content;
            if (cellRender) {
                instance && (instance.components.cell = cellRender);
            }
            else {
                if (contentRender) {
                    content = contentRender;
                }
                else {
                    content = san.defineComponent({
                        template: '<span>{{value}}</span>'
                    });
                }
                instance && (instance.components.cell = san.defineComponent({
                    components: {
                        's-content': content
                    },
                    template: `<a class="{{prefixCls}}-month">
                        <s-content value="{{value}}"/>
                    </a>`
                }));
            }
        }
    },
    inited() {
        this.data.set('instance', this);
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

        return classNames(`${prefixCls}-cell`, {
            [`${prefixCls}-cell-disabled`]: disabled,
            [`${prefixCls}-selected-cell`]: monthData.value === currentMonth,
            [`${prefixCls}-current-cell`]: today.year() === value.year() && monthData.value === today.month()
        });
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
            const next = this.data.get('value').clone();
            next.month(monthData.value);
            this.setAndSelectValue(next);
        }
    },
    setAndSelectValue(value) {
        this.data.set('value', value);
        this.fire('select', value);
        this.nextTick(() => {
            this.data.set('refresh', Math.random(), {force: true});
        });
    },
    template: `
        <table className="{{prefixCls}}-table" cellSpacing="0" role="grid">
            <tbody className="{{prefixCls}}-tbody">
                <tr
                    s-for="month, index in months"
                    key="{{index}}"
                    role="row"
                >
                    <td
                        s-for="monthData in month"
                        role="gridcell"
                        key="{{monthData.value}}"
                        title="{{monthData.title}}"
                        class="{{getContentClass(monthData)}}"
                        on-click="handleChooseMonth(monthData)"
                    >
                        <cell value="{{monthData.current}}" prefixCls="{{rootPrefixCls}}" />
                    </td>
                </tr>
            </tbody>
        </table>
    `
});
