/**
 * @file Santd calendar month panel file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import {dayjsType} from '../../interface';
import MonthTable from './MonthTable';

export default class MonthPanel extends Base<I.MonthPanelState, I.MonthPanelProps, I.MonthPanelComputed> {
    static computed: I.MonthPanelComputed = {
        year(this: MonthPanel) {
            const value = this.data.get('value');
            return value && value.year();
        }
    };
    inited(): void {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
    };
    handlePreviousYear() {
        this.fire('changeYear', -1);
    };
    handleYearPanelShow() {
        this.fire('yearPanelShow');
    };
    handleNextYear() {
        this.fire('changeYear', 1);
    };
    setAndSelectValue(value: dayjsType) {
        this.data.set('value', value);
        this.fire('select', value);
    };
    static components = {
        's-monthtable': MonthTable
    };
    static template = /* html */ `
    <div class="{{prefixCls}}-month-panel">
        <div>
            <div class="{{prefixCls}}-month-panel-header">
                <a
                    class="{{prefixCls}}-month-panel-prev-year-btn"
                    role="button"
                    on-click="handlePreviousYear"
                    title="{{locale.previousYear}}"
                    href="javascript:;"
                />
                <a
                    class="{{prefixCls}}-month-panel-year-select"
                    role="button"
                    on-click="handleYearPanelShow"
                    title="{{locale.yearSelect}}"
                    href="javascript:;"
                >
                    <span class="{{prefixCls}}-month-panel-year-select-content">{{year}}</span>
                    <span class="{{prefixCls}}-month-panel-year-select-arrow">x</span>
                </a>
                <a
                    class="{{prefixCls}}-month-panel-next-year-btn"
                    role="button"
                    on-click="handleNextYear"
                    title="{{locale.nextYear}}"
                    href="javascript:;"
                />
            </div>
            <div class="{{prefixCls}}-month-panel-body">
                <s-monthtable
                    disabledDate="{{disabledDate}}"
                    locale="{{locale}}"
                    value="{{value}}"
                    cellRender="{{cellRender}}"
                    contentRender="{{contentRender}}"
                    prefixCls="{{prefixCls}}-month-panel"
                    hasMonthRender="{{hasMonthRender}}"
                    on-select="setAndSelectValue"
                >
                <slot name="monthRender" slot="monthRender"/>
                </s-monthtable>
            </div>
            <div class="{{prefixCls}}-month-panel-footer" s-if="hasExtraFooter">
                <slot name="renderExtraFooter" />
            </div>
        </div>
    </div>
    `;
};
