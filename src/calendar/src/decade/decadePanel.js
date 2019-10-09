/**
 * @file Santd calendar decade panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import DecadeTable from './decadeTable';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    inited() {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
    },
    computed: {
        startYear() {
            const value = this.data.get('value');
            const currentYear = value.year();
            return parseInt(currentYear / 100, 10) * 100;
        },
        endYear() {
            const startYear = this.data.get('startYear');
            return startYear + 99;
        }
    },
    handlePreviousCentury() {
        this.goYear(-100);
    },
    handleDecadePanelShow() {
        this.fire('decaePanelShow');
    },
    handleNextCentury() {
        this.goYear(100);
    },
    setAndSelectValue(value) {
        this.data.set('value', value);
        this.fire('select', value);
    },
    goYear(year) {
        const value = this.data.get('value').clone();
        value.add(year, 'year');
        this.data.set('value', value);
    },
    components: {
        's-centurytable': DecadeTable
    },
    template: `
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
});
