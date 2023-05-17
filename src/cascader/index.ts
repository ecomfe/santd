/**
* @file cascader级联选择
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import InnerCascader from './src/Cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from './src/arraytreefilter';
import './style/index';

import {
    SingleCascaderState as State,
    SingleCascaderProps as Props,
    Computed,
    ShowSearchType,
    InputClickEvent,
    FieldNames,
    DefaultOptionType,
    ValueType,
    SingleValueType
} from './interface';

const prefixCls = classCreator('cascader')();
const inputPrefixCls = classCreator('input')();

function isShowSearchObject(value: Props['showSearch']): value is ShowSearchType {
    return value !== undefined && typeof value === 'object';
}

function getFilledFieldNames(fieldNames: FieldNames = {}) {
    const names = {
        children: fieldNames.children || 'children',
        label: fieldNames.label || 'label',
        value: fieldNames.value || 'value'
    };
    return names;
}

function flattenTree(
    options: DefaultOptionType[] = [],
    props: {changeOnSelect: boolean, fieldNames: FieldNames},
    ancestor: DefaultOptionType[]  = []
) {
    const names = getFilledFieldNames(props.fieldNames);
    let flattenOptions: DefaultOptionType[][] = [];
    const childrenName = names.children;
    options.forEach(option => {
        const path = ancestor.concat(Array.isArray(option) ? option : [option]);
        if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
            flattenOptions.push(path);
        }
        if (option[childrenName]) {
            flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
        }
    });
    return flattenOptions;
}

const defaultLimit = 50;

function highlightKeyword(str: string, keyword: string, prefixCls: string) {
    return str.split(keyword).map((node, index) =>
        index === 0
        ? node
        : `<span class="${prefixCls}-menu-item-keyword" key="seperator">${keyword}</span>${node}`
    );
}

function defaultFilterOption(inputValue: string, path: DefaultOptionType[], names: FieldNames) {
    return path.some(option => option[names.label!].indexOf(inputValue) > -1);
}

function defaultRenderFilteredOption(inputValue: string, path: DefaultOptionType[], prefixCls: string, names: FieldNames) {
    return path.map((option, index) => {
        const label = option[names.label as string];
        const node = label.indexOf(inputValue) > -1
            ? highlightKeyword(label, inputValue, prefixCls).join('')
            : label;
        return index === 0 ? node : ' / ' + node;
    });
}

function defaultSortFilteredOption(a: DefaultOptionType[], b: DefaultOptionType[], inputValue: string, names: FieldNames) {
    function callback(elem: DefaultOptionType) {
        return elem[names.label as string].indexOf(inputValue) > -1;
    }

    return a.findIndex(callback) - b.findIndex(callback);
}

function renderEmpty(content?: string) {
    content = '没有内容' || content;
    return `<div style="text-align: center;">{{${content}}}</div>`;
}

export default class Cascader extends Base<State, Props, Computed> {
    static components = {
        's-cascader': InnerCascader,
        's-input': Input,
        's-icon': Icon
    }
    initData(): State {
        return {
            prefixCls,
            allowClear: true,
            disabled: false,
            options: [],
            size: 'default',
            popupPlacement: 'bottomLeft',
            transitionName: 'slide-up',
            dropdownMenuColumnStyle: {}
        };
    }
    static computed: Computed = {
        pickerClass(this: Cascader) {
            const inputValue = this.data.get('inputValue');
            const disabled = this.data.get('disabled');
            const size = this.data.get('size');
            const showSearch = this.data.get('showSearch');
            const inputFocused = this.data.get('inputFocused');

            let classArr = [`${prefixCls}-picker`];
            inputValue && classArr.push(`${prefixCls}-picker-with-value`);
            disabled && classArr.push(`${prefixCls}-picker-disabled`);
            size && classArr.push(`${prefixCls}-picker-${size}`);
            showSearch && classArr.push(`${prefixCls}-picker-show-search`);
            inputFocused && classArr.push(`${prefixCls}-picker-focused`);

            return classArr;
        },
        filteredOptions(this: Cascader) {
            const oriShowSearch = this.data.get('showSearch');

            const showSearch = isShowSearchObject(oriShowSearch) ? oriShowSearch : {}


            const notFoundContent = this.data.get('notFoundContent');

            const names = getFilledFieldNames(this.data.get('fieldNames'));
            const {
                filter = defaultFilterOption,
                render = defaultRenderFilteredOption,
                sort = defaultSortFilteredOption,
                limit = defaultLimit
            } = showSearch;
            const options = this.data.get('options');
            const changeOnSelect = this.data.get('changeOnSelect') || false;
            const fieldNames = this.data.get('fieldNames') || {};

            const flattenOptions = showSearch && flattenTree(options, {changeOnSelect, fieldNames}) || [];
            const inputValue = this.data.get('inputValue') || '';

            // Limit the filter if needed
            let filtered: DefaultOptionType[][];
            if (+limit > 0) {
                filtered = [];
                let matchCount = 0;

                // Perf optimization to filter items only below the limit
                flattenOptions.some(path => {
                    const match = filter(inputValue, path, names);
                    if (match) {
                        filtered.push(path);
                        matchCount += 1;
                    }
                    return matchCount >= +limit;
                });
            }
            else {
                filtered = flattenOptions.filter(path => filter(inputValue, path, names));
            }

            filtered.sort((a, b) => sort(a, b, inputValue, names));

            if (filtered.length > 0) {
                return filtered.map(path => {
                    return {
                        __IS_FILTERED_OPTION: true,
                        path,
                        [names.label]: render(inputValue, path, prefixCls, names).join(''),
                        [names.value]: path.map(o => o[names.value]),
                        disabled: path.some(o => !!o.disabled)
                    };
                });
            }
            return [{
                [names.label]: notFoundContent || renderEmpty('Cascader'),
                [names.value]: 'SAN_CASCADER_NOT_FOUND',
                disabled: true
            }];
        },
        selectedOptions(this: Cascader) {
            const options = this.data.get('options');
            const names = getFilledFieldNames(this.data.get('fieldNames') || {});
            const value = this.data.get('value') || [];
            const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;

            return arrayTreeFilter(
                options,
                (o, level) => o[names.value] === unwrappedValue[level],
                {childrenKeyName: names.children}
            );
        },
        label(this: Cascader) {
            const selectedOptions = this.data.get('selectedOptions');
            const names = getFilledFieldNames(this.data.get('fieldNames') || {});
            return selectedOptions.map(o => o[names.label]);
        }
    }
    inited() {
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        this.data.set('value', value || defaultValue || []);

        const loadData = this.data.get('loadData');
        loadData && this.data.set('loadData', loadData.bind(this.parentComponent));

        this.data.set('hasSlot', this.sourceSlots.noname && this.sourceSlots.noname.filter(item => !item.textExpr).length);
        this.data.set('hasDisplayRender', !!this.sourceSlots.named.displayRender);

        this.watch('inputValue', val => {
            const showSearch = this.data.get('showSearch');
            this.data.set('dropdownMenuColumnStyle.width', val &&  isShowSearchObject(showSearch) && showSearch.matchInputWidth === true
                ? (this.ref('input').el as HTMLElement).offsetWidth
                : 'auto'
            );
        });
    }
    defaultDisplayRender(label: string[]) {
        return label.join(' / ');
    }
    handleChange({value, selectedOptions}: {value: SingleValueType[], selectedOptions: DefaultOptionType[]}) {
        this.data.set('inputValue', '');
        if (selectedOptions[0].__IS_FILTERED_OPTION) {
            const unwrappedValue: SingleValueType = value[0];
            const unwrappedSelectedOptions = selectedOptions[0].path;

            this.setValue(unwrappedValue, unwrappedSelectedOptions);
            return;
        }
        this.setValue(value, selectedOptions);
    }
    handlePopupVisibleChange(visible: boolean) {
        this.data.set('popupVisible', visible);
        this.data.set('inputFocused', visible);
        this.data.set('inputValue', visible ? this.data.get('inputValue') : '');

        this.fire('popupVisibleChange', visible);
    }
    setValue(value: ValueType, selectedOptions: DefaultOptionType[] = []) {
        this.data.set('value', value);
        this.fire('change', {value, selectedOptions});
    }
    handleClearSelection(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.data.get('inputValue')) {
            this.setValue([]);
            this.handlePopupVisibleChange(false);
        }
        else {
            this.data.set('inputValue', '');
        }
    }
    handleInputChange(value: string) {
        this.fire('search', value);
        this.data.set('inputValue', value);
    }
    handleInputClick(e: InputClickEvent) {
        const {inputFocused, popupVisible} = this.data.get();
        // Prevent `Trigger` behaviour.
        if (inputFocused || popupVisible) {
            e.stopPropagation();
            if (e.nativeEvent.stopImmediatePropagation) {
                e.nativeEvent.stopImmediatePropagation();
            }
        }
    }
    handleInputBlur() {
        this.data.set('inputFocused', false);
    }
    blur() {
        (this.ref('input') as Input).blur();
    }
    focus() {
        (this.ref('input') as Input).focus();
    }
    static template = /* html */ `<div>
        <s-cascader
            rootPrefixCls="{{prefixCls}}"
            getPopupContainer="{{getPopupContainer}}"
            popupStyle="{{popupStyle}}"
            popupClassName="{{popupClassName}}"
            popupPlacement="{{popupPlacement}}"
            options="{{inputValue ? filteredOptions : options}}"
            value="{{value}}"
            disabled="{{disabled}}"
            visible="{{popupVisible}}"
            on-visibleChange="handlePopupVisibleChange"
            on-change="handleChange"
            dropdownMenuColumnStyle="{{dropdownMenuColumnStyle}}"
            expandTrigger="{{expandTrigger}}"
            expandIcon="{{expandIcon}}"
            loadingIcon="{{loadingIcon}}"
            changeOnSelect="{{changeOnSelect}}"
            loadData="{{loadData}}"
            fieldNames="{{fieldNames}}"
            transitionName="{{transitionName}}"
        >
            <slot s-if="hasSlot" />
            <span class="{{pickerClass}}" style="{{pickerStyle}}" s-else>
                <span class="{{prefixCls}}-picker-label">
                    <slot
                        s-if="hasDisplayRender"
                        name="displayRender"
                        var-label="{{label}}"
                        var-selectedOptions="{{selectedOptions}}"
                    />
                    <template s-else>{{defaultDisplayRender(label)}}</template>
                </span>
                <s-input
                    tabIndex="-1"
                    inputClasses="{{prefixCls}}-input ${inputPrefixCls}-{{size}}"
                    value="{{inputValue}}"
                    disabled="{{disabled}}"
                    readOnly="{{!showSearch}}"
                    autoComplete="off"
                    autoFocus="{{autoFocus}}"
                    placeholder="{{value && value.length ? '' : placeholder}}"
                    on-change="handleInputChange"
                    on-click="handleInputClick"
                    on-blur="handleInputBlur"
                    s-ref="input"
                />
                <s-icon
                    s-if="allowClear && !disabled && value.length > 0 || inputValue"
                    type="close-circle"
                    theme="filled"
                    class="{{prefixCls}}-picker-clear"
                    on-click="handleClearSelection"
                />
                <s-icon
                    type="{{suffixIcon ? suffixIcon : 'down'}}"
                    class="${prefixCls}-picker-arrow {{popupVisible ? '${prefixCls}-picker-arrow-expand' : ''}}"
                />
            </span>
        </s-cascader>
    </div>`
};
