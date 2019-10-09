/**
 * @file Santd calendar month panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import MonthTable from './monthTable';

export default san.defineComponent({
    dataTypes: {
        disabledDate: DataTypes.func,
        prefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        year() {
            const value = this.data.get('value');
            return value && value.year();
        }
    },
    inited() {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
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
    template: `<div class="{{prefixCls}}-month-panel">
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
                    on-select="setAndSelectValue"
                />
            </div>
            <div class="{{prefixCls}}-month-panel-footer" s-if="hasExtraFooter">
                <slot name="renderExtraFooter" />
            </div>
        </div>
    </div>`
});
