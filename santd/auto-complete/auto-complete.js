/**
 * @file auto-complete 自动完成组件
 * @author fuqiangqiang@baidu.com
 */

import san, {DataTypes} from 'san';
import Select from '../select';
import './style/index.less';

export default san.defineComponent({
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    dataTypes: {
        allowClear: DataTypes.bool,
        autoFocus: DataTypes.bool,
        backfill: DataTypes.bool,
        dataSource: DataTypes.array,
        defaultValue: DataTypes.array,
        disabled: DataTypes.bool,
        filterOption: DataTypes.oneOfType([DataTypes.bool, DataTypes.func]),
        placeholder: DataTypes.string,
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.object, DataTypes.array]),
        defaultOpen: DataTypes.bool,
        open: DataTypes.bool
    },
    compiled() {
        const slots = this.sourceSlots.named;
        if (Object.keys(slots).length) {
            this.sourceSlots.named = [];
            const source = this.source;
            const owner = this.owner;
            const that = this;
            this.components.injectslot = san.defineComponent({
                components: that.parentComponent.components,
                compiled() {
                    this.source = source;
                    this.owner = owner;
                    this.sourceSlots.named = slots;
                    this._initSourceSlots();
                },
                template: `
                    <span>
                        <slot name="custom" s-bind="{{{value}}}"></slot>
                    </span>`
            });
        }
        else {
            this.components.injectslot = null;
        }
    },
    initData() {
        return {
            injectslot: this.components.injectslot || null
        };
    },
    onSearch(value) {
        this.fire('search', value);
    },
    onSelect(value) {
        this.fire('select', value);
    },
    onChange(value) {
        this.fire('change', value);
    },
    onBlur(value) {
        this.fire('blur', value);
    },
    onFocus(e) {
        this.fire('focus', e);
    },
    dropdownVisibleChange(val) {
        this.fire('dropdownVisibleChange', val);
    },
    template: `
        <div>
            <s-select
                showSearch
                allowClear="{{allowClear}}"
                autoFocus="{{autoFocus}}"
                classNames="auto-complete"
                style="width:100%"
                showArrow="{{false}}"
                placeholder="{{placeholder}}"
                on-search="onSearch"
                notFoundContent="null"
                isAutoComplete
                inputElement="{{injectslot}}"
                value="{{value}}"
                filterOption="{{filterOption}}"
                defaultValue="{{defalutValue}}"
                open="{{open}}"
                defaultOpen="{{defaultOpen}}"
                on-select="onSelect"
                on-change="onChange"
                on-blur="onBlur"
                on-focus="onFocus"
                on-dropdownVisibleChange="dropdownVisibleChange"
            >
                <s-select-option
                    s-if="dataSource"
                    s-for="data in dataSource"
                    value="{{data}}"
                >
                    {{data}}
                </s-select-option>
                <slot></slot>
            </s-select>
        </div>
    `
});
