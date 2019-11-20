/**
* @file autocomplete 自动完成组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import Select from '../select';

let AutoComplete = san.defineComponent({
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

    onSearch(value) {
        this.fire('search', value);
    },

    onSelect(value) {
        this.fire('select', value);
    },

    onChange(value) {
        this.fire('change', value);
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
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
                showSearch="{{true}}"
                allowClear="{{allowClear}}"
                autoFocus="{{autoFocus}}"
                class="auto-complete"
                style="width:100%"
                showArrow="{{false}}"
                placeholder="{{placeholder}}"
                on-search="onSearch"
                notFoundContent="{{null}}"
                autoClearSearchValue="{{false}}"
                value="{{value}}"
                filterOption="{{filterOption}}"
                defaultValue="{{defalutValue}}"
                open="{{open}}"
                defaultOpen="{{defaultOpen}}"
                optionFilterProp="children"
                isAutoComplete="{{true}}"
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

AutoComplete.Option = Select.Option;
AutoComplete.Group = Select.Group;

export default AutoComplete;
