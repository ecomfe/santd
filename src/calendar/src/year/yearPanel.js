/**
 * @file Santd calendar year panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import YearTable from './yearTable';

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
        this.fire('decadePanelShow');
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
    template: `<div class="{{prefixCls}}-year-panel">
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
    </div>`
});
