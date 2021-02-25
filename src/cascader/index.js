/**
* @file cascader级联选择
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import {classCreator} from '../core/util';
import Cascader from './src/cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from './src/arraytreefilter';
import './style/index';

const prefixCls = classCreator('cascader')();
const inputPrefixCls = classCreator('input')();

function getFilledFieldNames(fieldNames = {}) {
    const names = {
        children: fieldNames.children || 'children',
        label: fieldNames.label || 'label',
        value: fieldNames.value || 'value'
    };
    return names;
}

function flattenTree(options = [], props, ancestor = []) {
    const names = getFilledFieldNames(props.fieldNames);
    let flattenOptions = [];
    const childrenName = names.children;
    options.forEach(option => {
        const path = ancestor.concat(option);
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

function highlightKeyword(str, keyword, prefixCls) {
    return str.split(keyword).map((node, index) =>
        index === 0
        ? node
        : `<span class="${prefixCls}-menu-item-keyword" key="seperator">${keyword}</span>${node}`
    );
}

function defaultFilterOption(inputValue, path, names) {
    return path.some(option => option[names.label].indexOf(inputValue) > -1);
}

function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
    return path.map((option, index) => {
        const label = option[names.label];
        const node = label.indexOf(inputValue) > -1
            ? highlightKeyword(label, inputValue, prefixCls).join('')
            : label;
        return index === 0 ? node : ' / ' + node;
    });
}

function defaultSortFilteredOption(a, b, inputValue, names) {
    function callback(elem) {
        return elem[names.label].indexOf(inputValue) > -1;
    }

    return a.findIndex(callback) - b.findIndex(callback);
}

function renderEmpty() {
    return '<div style="text-align: center;">没有内容</div>';
}

export default san.defineComponent({
    components: {
        's-cascader': Cascader,
        's-input': Input,
        's-icon': Icon
    },
    initData() {
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
    },
    computed: {
        pickerClass() {
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
        filteredOptions() {
            const showSearch = this.data.get('showSearch') || {};
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
            const inputValue = this.data.get('inputValue');

            // Limit the filter if needed
            let filtered;
            if (limit > 0) {
                filtered = [];
                let matchCount = 0;

                // Perf optimization to filter items only below the limit
                flattenOptions.some(path => {
                    const match = filter(inputValue, path, names);
                    if (match) {
                        filtered.push(path);
                        matchCount += 1;
                    }
                    return matchCount >= limit;
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
        selectedOptions() {
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
        label() {
            const selectedOptions = this.data.get('selectedOptions');
            const names = getFilledFieldNames(this.data.get('fieldNames') || {});
            return selectedOptions.map(o => o[names.label]);
        }
    },
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
            this.data.set('dropdownMenuColumnStyle.width', val && showSearch && showSearch.mathInputWidth === true
                ? this.ref('input').el.offsetWidth
                : 'auto'
            );
        });
    },
    defaultDisplayRender(label) {
        return label.join(' / ');
    },
    handleChange({value, selectedOptions}) {
        this.data.set('inputValue', '');
        if (selectedOptions[0].__IS_FILTERED_OPTION) {
            const unwrappedValue = value[0];
            const unwrappedSelectedOptions = selectedOptions[0].path;

            this.setValue(unwrappedValue, unwrappedSelectedOptions);
            return;
        }
        this.setValue(value, selectedOptions);
    },
    handlePopupVisibleChange(visible) {
        this.data.set('popupVisible', visible);
        this.data.set('inputFocused', visible);
        this.data.set('inputValue', visible ? this.data.get('inputValue') : '');

        this.fire('popupVisibleChange', visible);
    },
    setValue(value, selectedOptions = []) {
        this.data.set('value', value);
        this.fire('change', {value, selectedOptions});
    },
    handleClearSelection(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.data.get('inputValue')) {
            this.setValue([]);
            this.handlePopupVisibleChange(false);
        }
        else {
            this.data.set('inputValue', '');
        }
    },
    handleInputChange(value) {
        this.fire('search', value);
        this.data.set('inputValue', value);
    },
    handleInputClick(e) {
        const {inputFocused, popupVisible} = this.data.get();
        // Prevent `Trigger` behaviour.
        if (inputFocused || popupVisible) {
            e.stopPropagation();
            if (e.nativeEvent.stopImmediatePropagation) {
                e.nativeEvent.stopImmediatePropagation();
            }
        }
    },
    handleInputBlur() {
        this.data.set('inputFocused', false);
    },
    blur() {
        this.ref('input').blur();
    },
    focus() {
        this.ref('input').focus();
    },
    template: `<div>
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
});
