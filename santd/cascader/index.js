/**
* @file cascader级联选择
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Cascader from './src/cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from './src/arraytreefilter';
import './style/index';

const prefixCls = classCreator('cascader')();
const inputPrefixCls = classCreator('input')();
const defaultDisplayRender = function (label) {
    return label.join(' / ');
};

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
            popupPlacement: 'bottomLeft',
            transitionName: 'slide-up',
            dropdownMenuColumnStyle: {}
        };
    },
    computed: {
        pickerClass() {
            const className = this.data.get('className');
            const inputValue = this.data.get('inputValue');
            const disabled = this.data.get('disabled');
            const size = this.data.get('size');
            const showSearch = this.data.get('showSearch');
            const inputFocused = this.data.get('inputFocused');

            let classArr = [className, `${prefixCls}-picker`];
            inputValue && classArr.push(`${prefixCls}-picker-with-value`);
            disabled && classArr.push(`${prefixCls}-picker-disabled`);
            size && classArr.push(`${prefixCls}-picker-${size}`);
            showSearch && classArr.push(`${prefixCls}-picker-show-search`);
            inputFocused && classArr.push(`${prefixCls}-picker-focused`);

            return classArr;
        },
        sizeClass() {
            const size = this.data.get('size');
            let classArr = [];
            size === 'large' && classArr.push(`${inputPrefixCls}-lg`);
            size === 'small' && classArr.push(`${inputPrefixCls}-sm`);
            return classArr;
        },
        arrowClass() {
            const popupVisible = this.data.get('popupVisible');
            let classArr = [`${prefixCls}-picker-arrow`];
            popupVisible && classArr.push(`${prefixCls}-picker-arrow-expand`);
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
            const flattenOptions = this.data.get('flattenOptions') || [];
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
        getLabel() {
            const options = this.data.get('options');
            const displayRender = this.data.get('displayRender') || defaultDisplayRender;

            const names = getFilledFieldNames(this.data.get('fieldNames') || {});
            const value = this.data.get('value') || [];
            const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
            const selectedOptions = arrayTreeFilter(
                options,
                (o, level) => o[names.value] === unwrappedValue[level],
                {childrenKeyName: names.children}
            );
            const label = selectedOptions.map(o => o[names.label]);
            const instance = this.data.get('instance');
            if (instance) {
                const render = displayRender(label, selectedOptions);
                if (typeof render === 'string') {
                    instance && (instance.components.displayrender = san.defineComponent({
                        initData() {
                            return {
                                text: render
                            };
                        },
                        template: '<span>{{text}}</span>'
                    }));
                    const ref = instance.ref('render');
                    ref && ref.data.set('text', render);
                }
                else if (typeof render === 'function') {
                    instance && (instance.components.displayrender = render);
                    const ref = instance.ref('render');
                    ref && ref.data.set('label', label);
                    ref && ref.data.set('selectedOptions', selectedOptions);
                }
            }
        },
        hasSlot() {
            const instance = this.data.get('instance');
            return instance && instance.sourceSlots.noname && instance.sourceSlots.noname.length;
        }
    },
    inited() {
        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});

        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        this.data.set('value', value || defaultValue || []);
        this.data.set('instance', this);

        const loadData = this.data.get('loadData');
        loadData && this.data.set('loadData', loadData.bind(this.parentComponent));

        const showSearch = this.data.get('showSearch');
        const options = this.data.get('options');
        showSearch && this.data.set('flattenOptions', flattenTree(options, this.data.get()));

        this.watch('inputValue', val => {
            const showSearch = this.data.get('showSearch');
            this.data.set('dropdownMenuColumnStyle.width', val && showSearch && showSearch.mathInputWidth === true
                ? this.ref('input').el.offsetWidth
                : 'auto'
            );
        });
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
            options="{{inputValue ? filteredOptions : options}}"
            value="{{value}}"
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
            <span class="{{pickerClass}}" style="{{bodyStyle}}" s-else>
                <span class="{{prefixCls}}-picker-label"><displayrender s-ref="render"></displayrender></span>
                <s-input
                    tabIndex="-1"
                    className="{{prefixCls}}-input {{sizeClass}}"
                    value="{{inputValue}}"
                    disabled="{{disabled}}"
                    readOnly="{{!showSearch}}"
                    autoComplete="off"
                    autoFocus="{{autoFocus}}"
                    on-change="handleInputChange"
                    on-click="handleInputClick"
                    on-blur="handleInputBlur"
                    s-ref="input"
                />
                <s-icon
                    s-if="allowClear && !disabled && value.length > 0 || inputValue"
                    type="close-circle"
                    theme="filled"
                    className="{{prefixCls}}-picker-clear"
                    on-click="handleClearSelection"
                />
                <s-icon type="{{suffixIcon ? suffixIcon : 'down'}}" class="{{arrowClass}}"></s-icon>
            </span>
        </s-cascader>
    </div>`
});
