/**
 * @file Santd calendar month panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import moment from 'moment';
import MonthTable from './monthTable';

export default san.defineComponent({
    dataTypes: {
        disabledDate: DataTypes.func,
        renderFooter: DataTypes.func,
        rootPrefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        prefixCls() {
            const rootPrefixCls = this.data.get('rootPrefixCls');

            return rootPrefixCls + '-month-panel';
        },
        year() {
            const value = this.data.get('value');
            return value && value.year();
        },
        injectFooter() {
            const renderFooter = this.data.get('renderFooter');
            const instance = this.data.get('instance');

            if (instance && renderFooter) {
                instance.components.footer = renderFooter;
            }
        }
    },
    inited() {
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        this.data.set('value', value || defaultValue);
        this.data.set('instance', this);
    },
    handlePreviousYear() {
        this.fire('changeYear', -1);
    },
    handleYearPanelShow() {
        this.fire('yearPanelShow');
    },
    handleNextYear() {
        this.fire('changeYear', 1);
    },
    setAndSelectValue(value) {
        this.data.set('value', value);
        this.fire('select', value);
    },
    components: {
        's-monthtable': MonthTable
    },
    template: `
        <div class="{{prefixCls}}">
            <div>
            <div class="{{prefixCls}}-header">
                <a
                    class="{{prefixCls}}-prev-year-btn"
                    role="button"
                    on-click="handlePreviousYear"
                    title="{{locale.previousYear}}"
                    href="javascript:;"
                />
                <a
                    class="{{prefixCls}}-year-select"
                    role="button"
                    on-click="handleYearPanelShow"
                    title="{{locale.yearSelect}}"
                    href="javascript:;"
                >
                    <span class="{{prefixCls}}-year-select-content">{{year}}</span>
                    <span class="{{prefixCls}}-year-select-arrow">x</span>
                </a>
                <a
                    class="{{prefixCls}}-next-year-btn"
                    role="button"
                    on-click="handleNextYear"
                    title="{{locale.nextYear}}"
                    href="javascript:;"
                />
            </div>
            <div class="{{prefixCls}}-body">
                <s-monthtable
                    disabledDate="{{disabledDate}}"
                    locale="{{locale}}"
                    value="{{value}}"
                    cellRender="{{cellRender}}"
                    contentRender="{{contentRender}}"
                    prefixCls="{{prefixCls}}"
                    rootPrefixCls="{{rootPrefixCls}}"
                    on-select="setAndSelectValue"
                />
            </div>
            <div class="{{prefixCls}}-footer" s-if="renderFooter">
                <footer />
            </div>
            </div>
        </div>
    `
});
