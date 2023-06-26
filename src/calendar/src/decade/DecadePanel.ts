/**
 * @file Santd calendar decade panel file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import DecadeTable from './DecadeTable';
import {dayjsType} from '../../interface';


export default class DecadePanel extends Base<I.DecadePanelState, I.DecadePanelProps, I.DecadePanelComputed> {
    inited(): void {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
    };
    static computed: I.DecadePanelComputed = {
        startYear(this: DecadePanel) {
            const value = this.data.get('value');
            const currentYear = value.year();
            return parseInt(currentYear / 100 + '', 10) * 100;
        },
        endYear(this: DecadePanel) {
            const startYear = this.data.get('startYear');
            return startYear + 99;
        }
    };
    handlePreviousCentury(): void {
        this.goYear(-100);
    };
    handleDecadePanelShow(): void {
        this.fire('decaePanelShow');
    };
    handleNextCentury(): void {
        this.goYear(100);
    };
    setAndSelectValue(value: dayjsType): void {
        this.data.set('value', value);
        this.fire('select', value);
    };
    goYear(year: number): void {
        const value = this.data.get('value').add(year, 'year');
        this.data.set('value', value);
    };
    static components = {
        's-centurytable': DecadeTable
    };
    static template = /* html */ `
        <div class="{{prefixCls}}-decade-panel">
            <div class="{{prefixCls}}-decade-panel-header">
                <a
                    class="{{prefixCls}}-decade-panel-prev-century-btn"
                    role="button"
                    on-click="handlePreviousCentury"
                    title="{{locale.previousCentury}}"
                    href="javascript:;"
                />
                <div class="{{prefixCls}}-decade-panel-century">
                    {{startYear}}-{{endYear}}
                </div>
                <a
                    class="{{prefixCls}}-decade-panel-next-century-btn"
                    role="button"
                    on-click="handleNextCentury"
                    title="{{locale.nextCentury}}"
                    href="javascript:;"
                />
            </div>
            <div class="{{prefixCls}}-decade-panel-body">
                <s-centurytable
                    locale="{{locale}}"
                    value="{{value}}"
                    prefixCls="{{prefixCls}}-decade-panel"
                    startYear="{{startYear}}"
                    endYear="{{endYear}}"
                    on-select="setAndSelectValue"
                />
            </div>
            <div class="{{prefixCls}}-decade-panel-footer" s-if="hasExtraFooter">
                <slot name="renderExtraFooter" />
            </div>
        </div>
    `
};
