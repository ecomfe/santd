/**
 * @file Santd calendar decade panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import DecadeTable from './decadeTable';

export default san.defineComponent({
    dataTypes: {
        rootPrefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object,
        renderFooter: DataTypes.func
    },
    inited() {
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        this.data.set('value', value || defaultValue);
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
        <div class="{{preifxCls}}">
            <div class="{{prefixCls}}-header">
                <a
                    class="{{prefixCls}}-prev-century-btn"
                    role="button"
                    on-click="handlePreviousCentury"
                    title="{{locale.previousCentury}}"
                    href="javascript:;"
                />
                <div class="{{prefixCls}}-century">
                    {{startYear}}-{{endYear}}
                </div>
                <a
                    class="{{prefixCls}}-next-century-btn"
                    role="button"
                    on-click="handleNextCentury"
                    title="{{locale.nextCentury}}"
                    href="javascript:;"
                />
            </div>
            <div class="{{prefixCls}}-body">
                <s-centurytable
                    locale="{{locale}}"
                    value="{{value}}"
                    cellRender="{{cellRender}}"
                    contentRender="{{contentRender}}"
                    prefixCls="{{prefixCls}}"
                    startYear="{{startYear}}"
                    endYear="{{endYear}}"
                    rootPrefixCls="{{rootPrefixCls}}"
                    on-select="setAndSelectValue"
                />
            </div>
            <div class="{{prefixCls}}-footer" s-if="hasFooter">
                <s-footer></s-footer>
            </div>
        </div>
    `
});
