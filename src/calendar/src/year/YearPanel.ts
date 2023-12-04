/**
 * @file Santd calendar year panel file
 * @author mayihui@baidu.com
 **/

import YearTable from './YearTable';
import Base from 'santd/base';
import * as I from './interface';
import {dayjsType} from '../../interface';


export default class YearPanel extends Base<I.YearPanelState, I.YearPanelProps, I.YearPanelComputed>{
    inited():void {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
    };
    static computed: I.YearPanelComputed = {
        startYear(this: YearPanel) {
            const value = this.data.get('value');
            const currentYear = value.year();
            return parseInt(currentYear / 10 + '', 10) * 10;
        },
        endYear(this: YearPanel) {
            const startYear = this.data.get('startYear');
            return startYear + 9;
        }
    };
    handlePreviousDecade(): void {
        this.goYear(-10);
    };
    handleDecadePanelShow(): void {
        this.fire('decadePanelShow');
    };
    handleNextDecade(): void {
        this.goYear(10);
    };
    setAndSelectValue(value: dayjsType): void {
        this.data.set('value', value);
        this.fire('select', value);
    };
    goYear(year: number) {
        const value = this.data.get('value').add(year, 'year');
        this.data.set('value', value);
    };
    static components = {
        's-yeartable': YearTable
    };
    static template = /* html */ `
    <div class="{{prefixCls}}-year-panel">
        <div>
            <div class="{{prefixCls}}-year-panel-header">
                <a
                    class="{{prefixCls}}-year-panel-prev-decade-btn"
                    role="button"
                    on-click="handlePreviousDecade"
                    title="{{locale.previousDecade}}"
                    href="javascript:;"
                />
                <a
                    class="{{prefixCls}}-year-panel-decade-select"
                    role="button"
                    on-click="handleDecadePanelShow"
                    title="{{locale.decadeSelect}}"
                    href="javascript:;"
                >
                    <span class="{{prefixCls}}-year-panel-decade-select-content">{{startYear}}-{{endYear}}</span>
                </a>
                <a
                    class="{{prefixCls}}-year-panel-next-decade-btn"
                    role="button"
                    on-click="handleNextDecade"
                    title="{{locale.nextDecade}}"
                    href="javascript:;"
                />
            </div>
            <div class="{{prefixCls}}-year-panel-body">
                <s-yeartable
                    locale="{{locale}}"
                    value="{{value}}"
                    cellRender="{{cellRender}}"
                    contentRender="{{contentRender}}"
                    prefixCls="{{prefixCls}}-year-panel"
                    startYear="{{startYear}}"
                    endYear="{{endYear}}"
                    on-select="setAndSelectValue"
                />
            </div>
            <div class="{{prefixCls}}-year-panel-footer" s-if="hasExtraFooter">
                <slot name="renderExtraFooter" />
            </div>
        </div>
    </div>
    `
};
