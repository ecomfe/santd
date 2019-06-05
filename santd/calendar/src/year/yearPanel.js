/**
 * @file Santd calendar year panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import YearTable from './yearTable';

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
            return parseInt(currentYear / 10, 10) * 10;
        },
        endYear() {
            const startYear = this.data.get('startYear');
            return startYear + 9;
        }
    },
    handlePreviousDecade() {
        this.goYear(-10);
    },
    handleDecadePanelShow() {
        this.fire('decaePanelShow');
    },
    handleNextDecade() {
        this.goYear(10);
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
        's-yeartable': YearTable
    },
    template: `
        <div class="{{preifxCls}}">
            <div class="{{prefixCls}}-header">
                <a
                    class="{{prefixCls}}-prev-decade-btn"
                    role="button"
                    on-click="handlePreviousDecade"
                    title="{{locale.previousDecade}}"
                    href="javascript:;"
                />
                <a
                    class="{{prefixCls}}-decade-select"
                    role="button"
                    on-click="handleDecadePanelShow"
                    title="{{locale.decadeSelect}}"
                    href="javascript:;"
                >
                    <span class="{{prefixCls}}-decade-select-content">{{startYear}}-{{endYear}}</span>
                    <span class="{{prefixCls}}-decade-select-arrow">x</span>
                </a>
                <a
                    class="{{prefixCls}}-next-decade-btn"
                    role="button"
                    on-click="handleNextDecade"
                    title="{{locale.nextDecade}}"
                    href="javascript:;"
                />
            </div>
            <div class="{{prefixCls}}-body">
                <s-yeartable
                    locale="{{locale}}"
                    value="{{value}}"
                    cellRender="{{cellRender}}"
                    contentRender="{{contentRender}}"
                    prefixCls="{{prefixCls}}"
                    startYear="{{startYear}}"
                    endYear="{{endYear}}"
                    on-select="setAndSelectValue"
                />
            </div>
            <div class="{{prefixCls}}-footer" s-if="hasFooter">
                <s-footer></s-footer>
            </div>
        </div>
    `
});
