/**
* @file select 选择框
* @author fuqiangqiang@baidu.com
*/
/* eslint-disable fecs-camelcase */

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import {loopComponentList} from 'santd/core/util/findCompont';
import classNames from 'classnames';
import {deepEq, deepCopy} from 'santd/core/util';
import Icon from 'santd/icon';
import Trigger from 'santd/core/trigger/index';
import CreateMenu from './createMenu';
import Options from './options';
import Header from './select-header';
import {
    getMapKey,
    toArray,
    findIndexInValueBySingleValue,
    defaultFilterFn
} from './_utils';
import './style/index';
const pagin = classCreator('select');
const prefixCls = pagin();

const BUILT_IN_PLACEMENTS = {
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    },
    bottomCenter: {
        points: ['tc', 'bc'],
        offset: [0, 4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    }
};

export default san.defineComponent({
    dataTypes: {
        showArrow: DataTypes.bool,
        loading: DataTypes.bool,
        defaultActiveFirstOption: DataTypes.bool,
        disabled: DataTypes.bool,
        maxTagCount: DataTypes.number,
        autoClearSearchValue: DataTypes.bool,
        dropdownClassName: DataTypes.string,
        maxTagPlaceholder: DataTypes.any,
        mode: DataTypes.string,
        notFoundContent: DataTypes.oneOfType([DataTypes.string, DataTypes.func]),
        labelInValue: DataTypes.bool,
        dropdownStyle: DataTypes.object,
        disabled: DataTypes.bool,
        defaultValue: DataTypes.any,
        autoFocus: DataTypes.bool,
        dropdownMatchSelectWidth: DataTypes.bool,
        optionFilterProp: DataTypes.string,
        placeholder: DataTypes.string,
        showSearch: DataTypes.bool,
        size: DataTypes.oneOf(['default', 'small', 'large']),
        clearIcon: DataTypes.func,
        suffixIcon: DataTypes.func,
        tokenSeparators: DataTypes.array,
        defaultOpen: DataTypes.bool,
        open: DataTypes.bool
    },
    components: {
        's-head': Header,
        's-icon': Icon,
        's-create-menu': CreateMenu,
        's-trigger': Trigger
    },
    computed: {
        classes() {
            const open = this.data.get('createdData._open');
            const disabled = this.data.get('disabled');
            const size = this.data.get('sizeMap')[this.data.get('size')];
            const dyClass = this.data.get('classNames');
            return classNames({
                [`${prefixCls}-${dyClass}`]: true,
                [`${prefixCls}`]: true,
                [`${prefixCls}-open`]: open,
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-enabled`]: !disabled,
                [`${prefixCls}-focused`]: open,
                [`${prefixCls}-${size}`]: !!size
            });
        },
        containerClass() {
            const multiple = !!this.data.get('mode');
            return classNames({
                [`${prefixCls}-selection`]: true,
                [`${prefixCls}-selection--multiple`]: multiple,
                [`${prefixCls}-selection--single`]: !multiple
            });
        },
        loadingIcon() {
            const loading = this.data.get('loading');
            return loading ? 'loading' : null;
        },
        popupClass() {
            const dropdownClassName = this.data.get('dropdownClassName');
            return classNames({
                'san-select-dropdown': true,
                'san-select-dropdown--single': true,
                [`${dropdownClassName}`]: true
            });
        },
        popupStyle() {
            const width = this.data.get('width');
            const dropdownStyle = this.data.get('dropdownStyle');
            const dropdownMatchSelectWidth = this.data.get('dropdownMatchSelectWidth');
            if (dropdownMatchSelectWidth) {
                return {width: width, ...dropdownStyle};
            }
            return '';
        }
    },
    initData() {
        return {
            popupMenu: CreateMenu,
            loading: false,
            showArrow: true,
            defaultActiveFirstOption: true,
            autoClearSearchValue: true,
            dropdownMatchSelectWidth: true,
            disabled: false,
            maxTagCount: 50,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            placements: BUILT_IN_PLACEMENTS
        };
    },
    inited() {
        this.selectOptions = {};
        this.groupInfo = '';
    },
    created() {
        const mode = this.data.get('mode');
        if (mode === 'multiple' || mode === 'tags') {
            this.data.set('showArrow', false);
        }
        this.watch('notFoundContent', content => {

            this.setSelectData('notFoundContent', content);
        });
        // watch open, 如果在组件中直接通过操作open来进行popup的显示与隐藏
        // this.watch('open', state => {
        //     this.setSelectData('_open', state);
        // });
        // watch select value property
        this.watch('value', value => {
            setTimeout(() => {
                const options = this.data.get('createdData._addTagsOptions');
                const labelValue = this.getLabelBySingleValue(options, value);
                this.setSelectData('_value', labelValue);
            }, 20);
        });
    },
    attached() {
        this.setDropdownWidth();
        const mode = this.data.get('mode');
        const props = this.data.get();
        const optionsInfo = this.selectOptions;
        const maxTagPlaceholder = this.data.get('maxTagPlaceholder');
        const maxTagCount = this.data.get('maxTagCount');
        const initValues = this.getValueFromData(this, optionsInfo);
        // _optionsInfo 作为标准，不会改变
        // _innerOptions 在input输入进行过滤popup时使用
        // _addTagsOptions 增加没有的数据集合
        const state = {
            _value: initValues, // head展现数据
            _inputValue: '',
            _open: props.open ? props.open : props.defaultOpen,
            _optionsInfo: optionsInfo,
            _innerOptions: optionsInfo,
            _addTagsOptions: optionsInfo,
            _skipBuildOptionsInfo: true,
            _mode: mode,
            _maxTagContent: this.setMaxTagPlaceholder(maxTagPlaceholder, initValues, maxTagCount) || '',
            _groupInfo: this.groupInfo
        };
        const result = {
            ...state,
            ...props
        };
        this.data.set('createdData', result);

        // suffixIcon
        const suffixIcon = this.data.get('suffixIcon');
        if (suffixIcon && typeof suffixIcon === 'function') {
            const Render = suffixIcon();
            const renderer = new Render();
            const suffixRef = this.ref('suffixIconRef');
            if (suffixRef) {
                suffixRef.innerHTML = '';
                renderer.attach(suffixRef);
                renderer.parentComponent = this;
            }
        }
        // clearIcon
        const clearIcon = this.data.get('clearIcon');
        if (clearIcon && typeof clearIcon === 'function') {
            const Render = clearIcon();
            const renderer = new Render();
            this.nextTick(() => {
                const clearIconRef = this.ref('clearIconRef');
                if (clearIconRef) {
                    clearIconRef.innerHTML = '';
                    renderer.attach(clearIconRef);
                    renderer.parentComponent = this;
                }
            });
        }
    },
    setDropdownWidth() {
        setTimeout(() => {
            const width = this.el.offsetWidth;
            this.data.set('width', width);
        }, 0);
    },
    removeJsComments(code) {
        return code.replace(/<!--[\w\W\r\n]*?-->/gmi, '');
    },

    /**
    * 将select-option组件中数据处理，放入对象。
    * @param {Object} components 组件
    * @param {Object} preState 老的state
    *
    * @return {Object}
    */

    getOptionsInfoFromComp(components, preState) {
        const optionsInfo = {};
        components.forEach(compo => {
            const {value, title, key, className, disabled} = compo.data.get();
            const singleValue = value;
            optionsInfo[getMapKey(singleValue)] = {
                option: compo,
                value: singleValue,
                label: compo.el && this.removeJsComments(compo.el.innerHTML) || null,
                title: title,
                disabled: disabled,
                className: className || '',
                visible: true
            };
        });
        if (preState) {
            // 进行替换
            const oldOptionsInfo = preState._optionsInfo;
            const value = preState._value;
            if (value) {
                value.forEach(v => {
                    const key = getMapKey(v);
                    if (!optionsInfo[key] && oldOptionsInfo[key] !== undefined) {
                        optionsInfo[key] = oldOptionsInfo[key];
                    }
                });
            }
        }
        return optionsInfo;
    },

    /**
    * 传入的value或defalutValue，处理成数组
    * @param {Object} component 组件
    * @param {Boolean} useDefaultValue 是否允许使用defaultValue
    *
    * @return {Array} 以数组形式返回
    */

    getValueFromData(component, optionsInfo, useDefaultValue = true) {
        const props = component.data.get();
        let labelValue = {};
        // 获取到value或者defalutValue后需要跟数据进行对比，把label也存储下来
        let value = [];
        if ('value' in props && useDefaultValue) {
            labelValue = this.getLabelBySingleValue(optionsInfo, props.value);
            value = toArray(labelValue);
        }
        if ('defaultValue' in props && useDefaultValue) {
            labelValue = this.getLabelBySingleValue(optionsInfo, props.defaultValue);
            value = toArray(labelValue);
        }
        return value;
    },

    /**
    * 从传入的values中返回简单数组
    * @param {Array} vals 数组
    *
    * @return {Array}
    */
    getVLFromChange(vals) {
        const labelInValue = this.data.get('allData.labelInValue');
        if (vals !== undefined) {
            if (!labelInValue) {
                vals = vals.map(v => v.value);
            }
            return vals;
        }
        return vals;
    },

    /**
    * 设置超过maxTag的文案
    * @param {Function} maxTagPlaceholder 处理函数
    * @param {Array} values value数组
    * @param {number} maxTagCount 可放置tag的最大数
    *
    * @return {string}
    */
    setMaxTagPlaceholder(maxTagPlaceholder, values, maxTagCount) {
        let omittedValues = this.getVLFromChange(values.slice(maxTagCount, values.length));
        let content = `+ ${values.length - maxTagCount} ...`;
        if (maxTagPlaceholder) {
            content = typeof maxTagPlaceholder === 'function'
                ? maxTagPlaceholder(omittedValues)
                : maxTagPlaceholder;
        }
        return content;
    },

    /**
    * 取到每个option所在的组件
    * @param {Object} component 组件
    * @param {string} propsName 要寻找的组件props名
    *
    * @return {Array}
    */
    getComponentItem(component, propsName) {
        if (!component.children) {
            return [];
        }
        let loopFlag = true;
        let arr = [];
        function loopOptionItem(children) {
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    if (
                        children[i].data
                        && children[i].data.get('componentPropName') === propsName
                    ) {
                        arr.push(children[i]);
                    } else if (children[i].children) {
                        loopOptionItem(children[i].children);
                    }
                }
            }
            return arr;

        }
        return loopOptionItem(component.children);
    },

    /**
    * 从组件中获取到所有的option数据
    * @param {string} propsName 组件prop名
    *
    * @return {Object}
    */
    getAllOptions(propsName) {
        const allComponents = this.getComponentItem(this, propsName);
        // 把组件中的data拿出来处理
        let optionsData = this.getOptionsInfoFromComp(allComponents);
        return optionsData;
    },

    /**
    * 获取group组件,并且把group和option的数据进行组合
    *
    * @return {Array}
    */
    getGroupsAll() {
        const allComponents = this.getComponentItem(this, 's-select-option-group');
        // 处理成想要的格式，传到popup的计算属性中处理
        let compoData = [];
        allComponents.forEach(item => {
            let itemObj = {group: {label: item.data.get('label'), key: item.data.get('key')}};
            let childrenData = {};
            const childrenOption = this.getComponentItem(item, 's-select-option');
            const data = this.getOptionsInfoFromComp(childrenOption);
            const dataToArr = Object.keys(data).map(d => {
                return data[d];
            });
            itemObj = {...itemObj.group, ...{options: dataToArr}};
            compoData.push(itemObj);
        });
        return compoData;
    },
    blur() {
        this.selectMethod('blur');
    },
    focus() {
        this.selectMethod('focus');
    },
    selectMethod(method) {
        const mode = this.data.get('mode');
        const sigleInput = this.ref('selectHead').ref('singleRef').ref('sigleInput');
        const importInput = this.ref('selectHead').ref('multagsRef').ref('importInput');
        if (mode !== 'multiple' && mode !== 'tags') {
            if (method === 'focus') {
                sigleInput && sigleInput.focus();
            } else if (method === 'blur') {
                sigleInput && sigleInput.blur();
            }
        } else if (method === 'focus') {
            importInput && importInput.focus();
        } else if (method === 'blur') {
            importInput && importInput.blur();
        }
    },
    updateMenuData() {
        if (this.menuInstance) {
            // 把数据回传给menu组件进行数据渲染
            this.menuInstance.data.set('allData', this.data.get('createdData'));
        }
    },
    messages: {
        watchOptionValueChange() {
            let allOptionsData = this.getAllOptions('s-select-option');
            if (!this.data.get('createdData')) {
                this.selectOptions = allOptionsData;
            } else {
                // 联动效果逻辑
                // 需要查到哪个数据没有了,否则会在别的操作中找不到数据
                Object.keys(this.selectOptions).forEach(item => {
                    if (!(item in allOptionsData)) {
                        allOptionsData[item] = this.selectOptions[item];
                        allOptionsData[item].visible = false;
                    } else {
                        allOptionsData[item].visible = true;
                    }
                });
                this.setSelectData('_optionsInfo', allOptionsData);
                this.setSelectData('_addTagsOptions', allOptionsData);
                this.setSelectData('_innerOptions', allOptionsData);
                this.updateMenuData();

                const initValues = this.getValueFromData(this, {...allOptionsData});
                this.setSelectData('_value', initValues);
            }

        },
        watchOptionGroup() {
            const optionGroups = this.getGroupsAll();
            if (!this.data.get('createdData')) {
                this.groupInfo = optionGroups;
            } else {
                this.data.set('createdData._groupInfo', optionGroups);
            }
        },
        onMenuSelect(item) {
            let {key: selectedValue} = item.value;
            let {
                _value: values,
                _optionsInfo: optsInfo,
                _addTagsOptions: addTagsOptions,
                labelInValue,
                maxTagCount,
                maxTagPlaceholder
            } = this.data.get('createdData');
            const mode = this.data.get('mode');
            const disabled = this.data.get('disabled');
            const isAutoComplete = this.data.get('isAutoComplete');
            let fireChangeValue;
            let maxTagContent;
            if (disabled) {
                return false;
            }
            let options = this.renderFilterOptionsFromChildren(addTagsOptions, selectedValue);
            const tart = this.getLabelBySingleValue(options, selectedValue);
            if (!tart) {
                // 如果没有，则说明是新加的，不需要再走这里逻辑
                return;
            }
            const tarLabel = tart[0].label;
            if (mode === 'multiple' || mode === 'tags') {
                if (values && findIndexInValueBySingleValue(values, selectedValue) !== -1) {
                    // 对已有数据进行处理，如果有，则删除
                    this.handleOptionChange(optsInfo, selectedValue, addTagsOptions);
                    this.nextTick(() => {
                        this.onHeadDeselect(values, selectedValue);
                    });
                    // 对value进行处理，删去当前选中的值
                    values = values.filter(item => {
                        return item.value !== selectedValue;
                    });
                } else {
                    values = [...values, ...[{value: selectedValue, label: tarLabel}]];
                    maxTagContent = this.setMaxTagPlaceholder(maxTagPlaceholder, values, maxTagCount);
                    this.setSelectData('_maxTagContent', maxTagContent);
                    switch (mode) {
                        case 'multiple':
                            this.setSelectData('_innerOptions', {...addTagsOptions});
                            this.setSelectData('_value', values);
                            break;
                        case 'tags': {
                            // 查一下是否在options存在，如果不存在，再加进去
                            let hasValue = true;
                            let newChild = {};
                            Object.keys(addTagsOptions).forEach(opt => {
                                if (
                                    selectedValue === addTagsOptions[opt].value
                                    || selectedValue === addTagsOptions[opt].label
                                ) {
                                    hasValue = false;
                                }
                            });
                            if (hasValue) {
                                newChild = {
                                    [`string-${selectedValue}`]: {value: selectedValue, label: tarLabel, visible: true}
                                };
                            }
                            this.updateDataChange({...addTagsOptions, ...newChild}, values);
                            break;
                        }
                        default:
                            break;
                    }
                }
                fireChangeValue = values;
                if (!labelInValue) {
                    fireChangeValue = values.map(v => {
                        return v.value;
                    });
                }
                this.fire('change', fireChangeValue);
                this.fire('select', {value: fireChangeValue, option: options});
                this.dispatch('UI:form-item-interact', {fieldValue: fireChangeValue, type: 'change'});
            } else {
                // 如果是单选，则进行替换
                this.setSelectData('_value', [{value: selectedValue, label: tarLabel}]);
                if (isAutoComplete) {
                    this.setSelectData('_inputValue', selectedValue);
                } else {
                    this.setSelectData('_inputValue', '');
                }
                if (labelInValue) {
                    selectedValue = this.getLabelBySingleValue(addTagsOptions, selectedValue)[0];
                }
                this.fire('change', selectedValue);
                this.fire('select', selectedValue);
                this.dispatch('UI:form-item-interact', {fieldValue: selectedValue, type: 'change'});
            }
            // 下拉框隐藏,并且告知open状态，让header的内容状态发生变化
            this.setSelectData('_open', false);
            this.data.set('popupVisible', false, {force: true});

        },
        inputOnFocus(ev) {
            this.setSelectData('_innerOptions', this.data.get('createdData._addTagsOptions'));
            // 还需要通知menu发生变化
            this.updateMenuData();
            this.fire('focus', ev.value);
        },
        inputOnBlur(targetLabel) {
            // 多选模式
            const {
                _addTagsOptions: addTagsOptions,
                _value: values,
                maxTagCount,
                maxTagPlaceholder
            } = this.data.get('createdData');
            const mode = this.data.get('mode');
            const labelInValue = this.data.get('labelInValue');
            const label = targetLabel.value;
            let newValues = [...values];
            let newChild;
            let maxTagContent;
            // 在tags模式下，直接将数据添加，在 multiple 下，需要还原成默认
            switch (mode) {
                case 'multiple':
                    break;
                case 'tags':
                    if (label) {
                        const inputValue = this.getValueFromLabel(addTagsOptions, label);
                        if (inputValue && findIndexInValueBySingleValue(values, inputValue) !== -1) {
                            return null;
                        }
                        if (inputValue) {
                            // 如果能匹配上
                            newValues = [...newValues, {value: inputValue, label: label}];
                            newChild = [];
                        } else {
                            newValues = [...newValues, {value: label, label: label}];
                            newChild = {[`string-${label}`]: {value: label, label: label, visible: true}};
                            this.setSelectData('_addTagsOptions', {...addTagsOptions, ...newChild});
                        }
                        maxTagContent = this.setMaxTagPlaceholder(maxTagPlaceholder, newValues, maxTagCount);
                        this.setSelectData('_maxTagContent', maxTagContent);
                        this.setSelectData('_innerOptions', {...addTagsOptions, ...newChild});
                        this.fireChange(newValues);
                        this.setSelectData('_open', false);
                        this.changeEventFire(newValues);
                    }
                    break;
                default:
                    break;
            }
            this.fire('blur', newValues);
        },
        queryInput(inputVal) {
            // 处理input的query
            const query = inputVal.value.value;
            const event = inputVal.value.event;
            const baseOptionInfo = this.data.get('createdData._optionsInfo');
            const addOptions = this.data.get('createdData._addTagsOptions');
            const notFoundContent = this.data.get('notFoundContent');
            const mode = this.data.get('mode');
            let options = {};
            let res;
            this.fire('search', query);
            // 如果内容是空，直接把把已有内容显示
            if (query === '') {
                this.data.set('createdData._innerOptions', addOptions);
                return null;
            }
            options = this.renderFilterOptionsFromChildren(baseOptionInfo, query);
            if (mode === 'tags') {
                // 如果是tags模式,并且没有找到对应的option
                if (!Object.keys(options).length) {
                    options = {
                        'string-tags': {
                            value: query,
                            label: query,
                            visible: true
                        }
                    };
                }
                res = this.handleTagsAutoMatic(query, false, event);
            }
            if (mode === 'multiple' && notFoundContent !== 'null') {
                if (!Object.keys(options).length) {
                    options = {
                        'string-notFound': {
                            value: 'Not Found',
                            label: 'Not Found',
                            disabled: true,
                            visible: true
                        }
                    };
                }
            }
            if (!res) {
                this.setSelectData('_inputValue', query);
                this.setSelectData('_innerOptions', options);
            }
            // 把新数据回传给menu
            this.updateMenuData();
            this.fire('search', query);
        },
        // 处理选择框区域叉号点击
        closeBtnClick(key) {
            // multiple or tags close btn
            const {
                _value: values,
                _optionsInfo: children,
                _innerOptions: innerOptions,
                _addTagsOptions: addTagsOptions,
                _watchingOptions: watchOptions
            } = this.data.get('createdData');
            const labelInValue = this.data.get('labelInValue');
            const selectedLabel = key.value;
            let tagOptions;
            const res = this.getValueFromOptions(addTagsOptions, selectedLabel);
            // 如果没有options,那么在删除时，就直接跟values进行对比，删去values中的数据
            const newVal = values.filter(value => {
                return value.label !== selectedLabel;
            });
            if (!res) {
                this.fireChange(newVal);

            } else {
                this.removeSelected(values, res);
                this.handleOptionChange(children, res, addTagsOptions);

            }
            this.changeEventFire(newVal);
            this.fire('deselect', values.filter(value => {
                return value.label === selectedLabel;
            }));
        },
        keyEnter(inputVal) {
            // 处理多选、tags时keyEnter
            let targetValue = inputVal.value.value;
            const events = inputVal.value.event;
            const autoClearSearchValue = this.data.get('autoClearSearchValue');
            let {
                _value: values,
                _optionsInfo: children,
                _addTagsOptions: addTagsOptions,
                tokenSeparators,
                maxTagPlaceholder,
                maxTagCount
            } = this.data.get('createdData');
            let valueCollect = values;
            let maxTagContent;
            const mode = this.data.get('mode');
            let options = this.renderFilterOptionsFromChildren(addTagsOptions, targetValue);
            if (mode === 'tags') {
                // 当tags在options中找不到数据
                if (!Object.keys(options).length) {
                    if (autoClearSearchValue) {
                        event.target.value = '';
                    }
                    // 把当前当做新数据与values集合
                    valueCollect = [...values, ...[{value: targetValue, label: targetValue}]];
                    const newChild = {
                        [`string-${targetValue}`]: {value: targetValue, label: targetValue, visible: true}
                    };
                    this.updateDataChange({...addTagsOptions, ...newChild}, valueCollect);
                    this.changeEventFire(valueCollect);
                }
            }
            if (Object.keys(options).length === 1) {
                let realValue;
                for (let i in options) {
                    realValue = options[i].value;
                }
                // 判断到之前有没有，如果有，就要删掉
                if (findIndexInValueBySingleValue(values, realValue) !== -1) {
                    this.nextTick(() => {
                        this.onHeadDeselect(values, realValue);
                    });
                } else {
                    if (autoClearSearchValue) {
                        event.target.value = '';
                    }
                    const labelValue = this.getLabelBySingleValue(options, realValue);

                    valueCollect = [...values, ...labelValue];
                    if (mode === 'tags') {
                        this.setSelectData('_innerOptions', addTagsOptions);
                    } else {
                        this.setSelectData('_innerOptions', children);
                    }
                    this.setSelectData('_value', valueCollect);
                    this.nextTick(() => {
                        this.fireChange(valueCollect);
                    });
                }
            }
            maxTagContent = this.setMaxTagPlaceholder(maxTagPlaceholder, valueCollect, maxTagCount);
            this.setSelectData('_maxTagContent', maxTagContent);
            this.updateMenuData();
        },
        handleBackspace(ev) {
            const {
                _value: values,
                _innerOptions: innerOptions,
                _optionsInfo: optionsInfo,
                labelInValue,
                maxTagPlaceholder,
                maxTagCount
            } = this.data.get('createdData');
            const mode = this.data.get('mode');
            let maxTagContent;
            let newValues = values.slice(0, -1);
            let delVal = values.pop();
            if (!delVal) {
                return null;
            }
            // 将对应的数据删除
            if (mode === 'tags') {
                this.handleOptionChange(optionsInfo, delVal.value, innerOptions);
            }
            maxTagContent = this.setMaxTagPlaceholder(maxTagPlaceholder, newValues, maxTagCount);
            this.setSelectData('_maxTagContent', maxTagContent);
            this.fireChange(newValues);
            this.changeEventFire(newValues);
            this.fire('deselect', delVal.value);
        },
        headMouseenter() {
            this.fire('mouseenter');
        },
        headMouseleave() {
            this.fire('mouseleave');
        },
        popupScroll() {
            this.fire('popupScroll');
        },
        // munu 渲染后把实例传出来
        menuUp(data) {
            this.menuInstance = data.value;
        },
        dropRender(instance) {
            // 点击dropdownRender所在区域时，隐藏trigger
            this.setSelectData('_open', false);
            this.data.set('popupVisible', false, {force: true});
        },
        popupScroll(data) {
            this.fire('popupScroll', data.value);
        }
    },
    changeEventFire(newVal) {
        const labelInValue = this.data.get('labelInValue');
        if (labelInValue) {
            this.fire('change', newVal);
        } else {
            this.fire('change', newVal.map(val => val.value));
        }
    },
    updateDataChange(options, values) {
        this.setSelectData('_addTagsOptions', options);
        this.setSelectData('_innerOptions', options);
        if (values) {
            this.setSelectData('_value', values);
        }
        // 更新menu数据
        this.updateMenuData();
    },

    /**
    * 处理tags模式下，input blur时直接选中
    * @param {String} inputValue 输入项
    * @param {Boolean} isBlur 是否为blur
    * @param {Object} events  event对象
    * @return {Boolean}
    */

    handleTagsAutoMatic(inputValue, isBlur = false, events) {
        const tokenSeparators = this.data.get('tokenSeparators') || [','];
        const autoClearSearchValue = this.data.get('autoClearSearchValue');
        let splitValue = [];
        if (!inputValue || (inputValue.indexOf(',') === -1 && !isBlur)) {
            return false;
        }
        if (tokenSeparators && !Array.isArray(tokenSeparators)) {
            console.error('tokenSeparators 必须是数组');
            return false;
        }
        tokenSeparators.forEach(it => {
            splitValue = inputValue.split(it);
        });
        if (events) {
            if (autoClearSearchValue) {
                event.target.value = '';
            }
            events.target.blur();
        }
        splitValue.forEach(val => {
            if (!val) {
                return false;
            }
            let {_addTagsOptions: addTagsOptions, _value: values} = this.data.get('createdData');
            // 如果某个值已经被选中了，就不什么也不做
            if (findIndexInValueBySingleValue(values, val) !== -1) {
                return false;
            } else {
                let valueLabel = {value: val, label: val, visible: true};
                let valueCollect = [...values, valueLabel];
                const newChild = {[`string-${val}`]: valueLabel};
                this.updateDataChange({...addTagsOptions, ...newChild});
                this.fireChange(valueCollect);
            }
        });
        return true;
    },

    /**
    * 对比option，更新变化的数据
    * @param {Object} 基准option数据
    * @param {String} 当前选择的value值
    * @param {Object} 要更新的option数据
    */

    handleOptionChange(baseOptionInfo, selectedValue, options) {
        if (!this.checkOptionsExist(baseOptionInfo, selectedValue)) {
            for (let opt in options) {
                if (options[opt].value === selectedValue) {
                    delete options[opt];
                }
            }
            this.updateDataChange({...options});
        }
    },
    // 从label获取对应的value
    getValueFromLabel(options, label) {
        let value;
        Object.keys(options).forEach(opt => {
            if (options[opt].label === label) {
                value = options[opt].value;
            }
        });
        return value;
    },

    getLabelBySingleValue(options, value) {
        let label = '';
        let newLabelArray = [];
        if (Object.prototype.toString.call(value) === '[object Object]') {
            value = Object.keys(value).map(v => {
                return value[v];
            });
        } else if (typeof value === 'string' || typeof value === 'number') {
            value = [value];
        }
        Object.keys(options).forEach(opt => {
            value.forEach(v => {
                if (options[opt].value === v) {
                    newLabelArray.push({
                        value: v,
                        label: options[opt].label
                    });
                }
            });
        });
        return newLabelArray;

    },
    checkOptionsExist(resouceData, label) {
        let tempFlag = false;
        Object.keys(resouceData).forEach(item => {
            if (resouceData[item].value === label) {
                tempFlag = true;
            }
        });
        return tempFlag;
    },

    /**
    * 从options中找出label对应的value
    * @param {Object} options 要查找的options数据
    * @param {String} label 展示的label值
    *
    * @return {String}
    */

    getValueFromOptions(options, label) {
        let result = '';
        Object.keys(options).forEach(opt => {
            if (options[opt].label === label) {
                result = options[opt].value;
                return false;
            }
        });
        return result;
    },
    onHeadDeselect(values, selectedValue) {
        this.fire('deselect', selectedValue);
        this.removeSelected(values, selectedValue);
    },
    removeSelected(values, selectedValue) {
        const value = values.filter(val => {
            return val.value !== selectedValue;
        });
        this.fireChange(value);
    },
    fireChange(value) {
        this.data.set('createdData._value', [].concat(value));
        this.updateMenuData();
    },

    /**
    * 通过输入的值找对应options中的匹配数据
    * @param {Object} children select options
    * @param {string} childrenKeys input中输入的值
    *
    * @return {Object}
    */

    renderFilterOptionsFromChildren(children = [], childrenKeys) {
        const sel = {};
        Object.keys(children).forEach(child => {
            if (childrenKeys && this.handleFilterOption(childrenKeys, children[child])) {
                // 输入的字符在这个child 能够找到，那么应该把这个数据记录下来，
                sel[child] = children[child];
            }
        });
        return sel;
    },

    /**
    * 通过filterOption函数来判断输入的值是否能在options中匹配的到
    * @param {String} input 输入的值
    * @param {Object} child 进行匹配的option
    * @param {Function} defaultFilter 默认的匹配规则
    *
    * @return {Boolean}
    */

    handleFilterOption(input, child, defaultFilter = defaultFilterFn) {
        let filterOption = this.data.get('filterOption');
        if (!filterOption) {
            filterOption = defaultFilter.bind(this);
        }
        if (!filterOption) {
            return true;
        } else if (typeof filterOption === 'function') {
            return filterOption.call(this, input, child);
        } else if (this.getValueDisabled(child, 'disabled')) {
            return false;
        }
        return true;
    },
    getValueDisabled(child, state) {
        if (child[state]) {
            return true;
        }
        return false;
    },
    onHeadClick(e) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            e.stopPropagation();
            return false;
        }
    },

    /**
    * 清空全部选中事件
    * @param {Object} e event对象
    */
    onClearSelection(e) {
        e.stopPropagation();
        // 允许全部删除
        this.setSelectData('_value', []);
        this.updateMenuData();
    },
    handleOpenState(e) {
        const openState = this.data.get('createdData._open');
        const mode = this.data.get('mode');
        if (mode === 'multiple' || mode === 'tags') {
            this.ref('selectHead').ref('multagsRef').ref('importInput').focus();
        }
        if (openState) {
            e && e.stopPropagation();
        }
    },
    setSelectData(property, value) {
        this.data.set(`createdData.${property}`, value);
    },
    popupVisibleChange(visible) {
        // 监听下拉的显示与隐藏
        this.setSelectData('_open', visible);
        this.fire('dropdownVisibleChange', visible);
    },
    template: `
        <div class="{{classes}}">
            <s-trigger
                builtinPlacements="{{placements}}"
                popupPlacement="bottomLeft"
                allData="{{createdData}}"
                action="click"
                popup="{{popupMenu}}"
                popupClassName="{{popupClass}}"
                style="display:block"
                popupStyle="{{popupStyle}}"
                popupVisible="{{popupVisible || createdData._open}}"
                on-visibleChange="popupVisibleChange"
            >
            <slot/>
                <div class="{{containerClass}}" on-click="onHeadClick($event)">
                    <div class="${prefixCls}-selection__rendered" on-click="handleOpenState($event)">
                        <s-head
                            s-ref="selectHead"
                            allData="{{createdData}}"
                            removeIcon="{{removeIcon}}"
                            mode="{{mode}}"
                            isAutoComplete="{{isAutoComplete}}"
                            inputElement="{{inputElement}}"
                            autoFocus="{{autoFocus}}"
                        ></s-head>
                    </div>
                    <span
                        s-if="allowClear && createdData._value"
                        s-ref="clearIconRef"
                        class="${prefixCls}-selection__clear"
                        style="user-select:none;"
                        on-click="onClearSelection($event)"
                    >
                        <s-icon type="close-circle" theme="filled"></s-icon>
                    </span>
                    <span s-if="showArrow" class="${prefixCls}-arrow">
                        <span s-ref="suffixIconRef" class="${prefixCls}-arrow-icon">
                            <s-icon type="{{loadingIcon || 'down'}}"></s-icon>
                        </span>
                    </span>
                </div>
            </s-trigger>
        </div>
    `
});
