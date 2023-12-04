/**
* @file autocomplete 自动完成组件
* @author fuqiangqiang@baidu.com
*/
import Select from '../select';
import type * as I from './interface';
import Base from 'santd/base';

class AutoComplete extends Base<I.State, I.Props, I.Computed> {
    static template = `
        <div>
            <s-select
                s-ref="select"
                showSearch="{{true}}"
                allowClear="{{allowClear}}"
                autoFocus="{{autoFocus}}"
                backfill="{{backfill}}"
                class="auto-complete"
                style="width:100%"
                showArrow="{{false}}"
                placeholder="{{placeholder}}"
                defaultActiveFirstOption="{{defaultActiveFirstOption}}"
                dropdownMenuStyle="{{dropdownMenuStyle}}"
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

    static components = {
        's-select': Select,
        's-select-option': Select.Option
    }

    static Option = Select.Option;

    static Group = (Select as any).Group;

    onSearch(value: string|number) {
        this.fire('search', value);
    }

    onSelect(value: string|number) {
        this.fire('select', value);
    }

    onChange(value: string|number) {
        this.fire('change', value);
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
    }

    onBlur(value: string|number) {
        this.fire('blur', value);
    }

    onFocus(e: FocusEvent) {
        this.fire('focus', e);
    }
    dropdownVisibleChange(val: boolean) {
        this.fire('dropdownVisibleChange', val);
    }
    focus() {
        (this.ref('select') as Select).focus();
    }
    blur() {
        (this.ref('select') as Select).blur();
    }
    
};

export default AutoComplete;
