/**
 * @file tree-select 树选中组件
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Tree from '../tree';
import Selector from './selector';
import Dropdown from '../dropdown';
import Empty from '../empty';
import './style/index';
import KeyCode from '../core/util/keyCode';

const prefixCls = classCreator('select')();
const emptyPrefixCls = classCreator('empty')();

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            }
            else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const getExpandedKeys = (expandedKeys = [], nodeArr = [], hiddenKeys = []) => {
    for (const node of nodeArr) {
        if (node.children.length) {
            expandedKeys.push(node.key);
            for (const child of node.children) {
                const index = hiddenKeys.indexOf(child.key);
                if (index !== -1) {
                    hiddenKeys.splice(index, 1);
                }
                getExpandedKeys(expandedKeys, [child], hiddenKeys);
            }
        }
    }
    return expandedKeys.filter((item, i, self) => item && self.indexOf(item) === i);
};

/*const getDefaultFilterOption = optionFilterProp => (searchValue, dataNode) => {
    const value = dataNode[optionFilterProp || 'value'];

    return String(value)
        .toLowerCase()
        .includes(String(searchValue).toLowerCase());
};

const filterData = (searchValue, treeData, {filterOption, optionFilterProp}) => {
    if (filterOption === false) {
        return treeData;
    }

    let filterOptionFunc;

    if (typeof filterOption === 'function') {
        filterOptionFunc = filterOption;
    }
    else {
        filterOptionFunc = getDefaultFilterOption(optionFilterProp);
    }
    function loop(list, keepAll = false) {
        return list.map(data => {
            const children = data.children;
            const match = keepAll || filterOptionFunc(searchValue, data);
            const childList = loop(children || [], match);

            if (match || childList.length) {
                return {
                    ...data,
                    children: childList
                };
            }
            return null;
        }).filter(node => {
            return node;
        });
    }

    return loop(treeData.concat());
};*/

const sizeMap = {
    small: 'sm',
    large: 'lg'
};

export default san.defineComponent({
    dataTypes: {
        allowClear: DataTypes.bool,
        treeData: DataTypes.array,
        autoClearSearchValue: DataTypes.bool,
        defaultValue: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        disabled: DataTypes.bool,
        dropdownClassName: DataTypes.string,
        dropdownMatchSelectWidth: DataTypes.bool,
        dropdownStyle: DataTypes.object,
        filterTreeNode: DataTypes.func,
        labelInValue: DataTypes.bool,
        maxTagCount: DataTypes.number,
        maxTagPlaceholder: DataTypes.any,
        multiple: DataTypes.bool,
        placeholder: DataTypes.string,
        searchPlaceholder: DataTypes.string,
        searchValue: DataTypes.string,
        treeIcon: DataTypes.bool,
        showSearch: DataTypes.bool,
        size: DataTypes.oneOf(['default', 'small', 'large']),
        showCheckedStrategy: DataTypes.string,
        treeCheckable: DataTypes.bool,
        treeCheckStrictly: DataTypes.bool,
        treeDefaultExpandAll: DataTypes.bool,
        treeDefaultExpandedKeys: DataTypes.array,
        treeExpandedKeys: DataTypes.array,
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        replaceFields: DataTypes.object
    },
    components: {
        's-icon': Icon,
        's-tree': Tree,
        's-tree-node': Tree.TreeNode,
        's-selector': Selector,
        's-dropdown': Dropdown,
        's-empty': Empty
    },
    initData() {
        return {
            multiple: false,
            allowClear: false,
            selectedKeys: [],
            filteredKeys: [],
            hiddenKeys: [],
            checkedKeys: {
                checked: [],
                halfChecked: []
            },
            expandedKeys: [],
            selectedValue: [],
            dropdownMatchSelectWidth: true,
            showCheckedStrategy: 'SHOW_CHILD',
            treeCheckStrictly: false,
            treeIcon: false,
            inputValue: '',
            showValue: '',
            searchValue: '',
            activeKey: '',
            replaceFields: {children: 'children', title: 'title', key: 'key', value: 'value', label: 'label'}
        };
    },
    inited() {
        const {defaultValue, treeCheckable} = this.data.get();
        let value = this.data.get('value') || defaultValue || [];
        value = typeof value === 'string' ? [value] : value;
        this.data.set('value', value);
        if (treeCheckable) {
            this.data.set('multiple', true);
        }
    },
    computed: {
        wrapClass() {
            const data = this.data;
            const allowClear = data.get('allowClear');
            const disabled = data.get('disabled');
            const loading = data.get('loading');
            const visible = data.get('visible');
            const focused = data.get('_focused');
            const showArrow = data.get('showArrow');
            const size = sizeMap[this.data.get('size')] || '';

            return [
                prefixCls,
                `${prefixCls}-${disabled ? 'disabled' : 'enabled'}`,
                allowClear && `${prefixCls}-allow-clear`,
                loading && `${prefixCls}-loading`,
                visible && `${prefixCls}-open`,
                size && `${prefixCls}-${size}`,
                showArrow !== undefined && `${prefixCls}-${showArrow ? 'show' : 'no'}-arrow`,
                (visible || focused) && `${prefixCls}-focused`
            ].filter(name => name);
        },
        showInput() {
            const showSearch = this.data.get('showSearch');
            const multiple = this.data.get('multiple');
            return showSearch !== undefined ? showSearch : multiple;
        },
        showEmpty() {
            return this.data.get('inputValue') && !this.data.get('filteredKeys.length');
        },
        showAction() {
            return this.data.get('disabled') ? [''] : ['click'];
        },
        hideAction() {
            const showInput = this.data.get('showInput');
            const mutiple = this.data.get('mutiple');
            return !showInput && !mutiple ? ['click'] : ['blur'];
        }
    },
    messages: {
        santd_treeselect_setInputElement({value: inputElement}) {
            this.$input = inputElement;
        },
        santd_treeselect_inputChange({value}) {
            this.handleInputChange(value);
        },
        santd_treeselect_inputKeyDown({value: event}) {
            this.handleKeyDown(event);
        },
        santd_treeselect_inputBlur({value: event}) {
            this.handleBlur(event);
        },
        santd_treeselect_inputSearch({value}) {
            this.fire('search', value);
        }
    },
    getDefaultExpanedKeys() {
        const {
            treeDefaultExpandAll,
            treeExpandedKeys,
            treeDefaultexpandedKeys
        } = this.data.get();

        if (treeExpandedKeys) {
            return treeExpandedKeys;
        }

        if (treeDefaultExpandAll) {
            return getExpandedKeys([], this.dataList);
        }
        return treeDefaultexpandedKeys;
    },
    handleInputChange(value, visible = true) {
        this.data.set('inputValue', value);
        this.data.set('showValue', value);

        const filteredKeys = [];
        let hiddenKeys = [];
        let expandedKeys = [];

        if (value) {
            hiddenKeys = this.dataList.map(item => {
                if (item.key.indexOf(value) === -1) {
                    return item.key;
                }
                return null;
            }).filter(key => key);

            for (const item of this.dataList) {
                const key = item.key;
                if (key.indexOf(value) > -1) {
                    filteredKeys.push(key);
                    const parentKey = getParentKey(key, this.treeData);
                    parentKey && expandedKeys.push(parentKey);
                    getExpandedKeys(expandedKeys, [item], hiddenKeys);
                }
            }

            if (!this.data.get('visible') && visible) {
                this.data.set('visible', true);
            }

            if (hiddenKeys.includes(this.data.get('activeKey'))) {
                this.resetActiveKey();
            }
        }
        else {
            expandedKeys = this.getDefaultExpanedKeys();
        }
        this.data.set('hiddenKeys', hiddenKeys);
        this.data.set('filteredKeys', filteredKeys);
        this.data.set('expandedKeys', expandedKeys);
    },
    handleKeyDown(e) {
        e.stopPropagation();

        const keyCode = e.keyCode;
        const {
            visible,
            multiple,
            activeKey,
            inputValue,
            searchValue,
            selectedKeys,
            selectedValue
        } = this.data.get();
        const $tree = this.ref('tree');

        // 删除
        if (!inputValue && multiple && keyCode === KeyCode.BACKSPACE) {
            if (selectedValue.length) {
                this.handleRemoveValue(selectedValue.length - 1);
            }
            return;
        }

        if (visible) {
            if (keyCode === KeyCode.DOWN) {
                this.updateActiveKey(activeKey, 1);
                e.preventDefault();
                return;
            }
            if (keyCode === KeyCode.UP) {
                this.updateActiveKey(activeKey, -1);
                e.preventDefault();
                return;
            }
            // 收起
            if (keyCode === KeyCode.ESC) {
                searchValue
                    ? this.handleVisibleChange(false)
                    : inputValue
                        ? this.handleInputChange('')
                        : this.handleVisibleChange(false);
                return;
            }
            if (keyCode === KeyCode.ENTER) {
                let key = '';
                if (activeKey) {
                    key = activeKey;
                }
                else if (!inputValue && !multiple && selectedKeys[0]) {
                    key = selectedKeys[0];
                }

                if (key) {
                    const node = this.dataList.filter(item => item.key === key)[0].node;
                    const info = {
                        event: 'select',
                        nativeEvent: e,
                        node,
                        selected: node.data.get('selected'),
                        key
                    };
                    $tree && $tree.handleSelect(key, info);
                }
            }
        }
        // 展开
        else if (keyCode === KeyCode.ENTER
            || keyCode === KeyCode.UP
            || keyCode === KeyCode.DOWN
        ) {
            this.data.set('visible', true);
            e.preventDefault();
        }
    },
    // direction: -1 UP, 1 DOWN
    updateActiveKey(activeKey = '', direction = 0) {
        const expandedKeys = this.data.get('expandedKeys') || [];
        const hiddenKeys = this.data.get('hiddenKeys').filter(key => !expandedKeys.includes(key));
        const list = this.dataList
            .filter(item => !item.disabled && hiddenKeys.indexOf(item.key) === -1);

        if (list.length) {
            if (!activeKey) {
                const index = direction === 1 ? 0 : list.length - 1;
                activeKey = list[index].key;
            }
            else if (direction) {
                const max = list.length - 1;
                let index = list.findIndex(item => item.key === activeKey);

                if (index >= 0) {
                    index += direction;

                    if (index < 0) {
                        index = max;
                    }
                    else if (index > max) {
                        index = 0;
                    }

                    activeKey = list[index].key;
                }
            }
            this.data.set('activeKey', activeKey);
        }
    },
    handleBlur(e) {
        if (this.data.get('disabled')) {
            e.preventDefault();
            return;
        }
        this.data.set('_focused', false);
    },
    getRootDomNode() {
        return this.el;
    },
    getData(treeNodes = [], dataList = [], treeData = []) {
        treeNodes.forEach((node, index) => {
            const {key, title, value, disabled} = node.data.get();
            let params = {
                key,
                title,
                label: title,
                value,
                node,
                disabled
            };
            dataList.push(params);
            treeData[index] = params;
            treeData[index].children = [];

            if (node.treeNodes) {
                this.getData(node.treeNodes, dataList, treeData[index].children);
            }
        });
        return {
            dataList,
            treeData
        };
    },
    repaint(multiple) {
        this.nextTick(() => this.ref('dropdown').refresh());
        !multiple
            ? this.handleVisibleChange(false)
            : this.data.get('inputValue') && this.handleInputChange('');

    },
    handleTreeCheck({checkedKeys, info = {}}, inited) {
        let checkedData = this.getIncludeData(checkedKeys);
        let selectedValue = [];
        let removedKeys = [];
        const showCheckedStrategy = this.data.get('showCheckedStrategy');
        while (checkedData.length) {
            let data = checkedData.shift();
            let node = data.node;
            const key = data.key;
            if (node.treeNodes.length) {
                const allChecked = node.treeNodes.every(item => checkedKeys.includes(item.data.get('key')));
                if (allChecked) {
                    if (showCheckedStrategy === 'SHOW_CHILD') {
                        removedKeys.push(data.key);
                    }
                    else if (showCheckedStrategy === 'SHOW_PARENT') {
                        removedKeys = removedKeys.concat(node.treeNodes.map(item => item.data.get('key')));
                    }
                }
            }
            if (!removedKeys.includes(key)) {
                selectedValue.push(data);
            }
        }

        this.data.set('selectedValue', selectedValue);
        this.data.set('selectedKeys', []);
        this.data.set('checkedKeys.checked', this.getIncludeData(checkedKeys).map(item => item.key));
        !inited && this.repaint(true);

        if (info.checked) {
            this.fire('select', {info});
        }
        !inited && this.fire('change', {value: selectedValue.map(data => data.key), node: info.node, info});

        this.$input ? this.$input.focus() : this.el.focus();
    },
    handleTreeSelect({selectedKeys, info}) {
        const {treeCheckable, multiple} = this.data.get();
        if (treeCheckable) {
            info.node.ref('checkbox').el.click();
            return;
        }
        const selectedValue = this.getIncludeData(selectedKeys);
        this.data.set('selectedValue', selectedValue);
        this.data.set('selectedKeys', selectedValue.map(item => item.key));
        this.repaint(multiple);

        if (info.selected) {
            this.fire('select', {info});
        }
        this.fire('change', {value: selectedKeys, node: info.node, info});
        this.nextTick(() => {
            this.$input ? this.$input.focus() : this.el.focus();
        });
        this.data.set('_focused', true);
    },
    handleTreeExpand({expandedKeys, info}) {
        this.data.set('treeExpandedKeys', expandedKeys);
        this.fire('expand', expandedKeys);
    },
    handleVisibleChange(visible) {
        const {inputValue, searchValue} = this.data.get();
        this.data.set('visible', visible);

        if (visible) {
            if (this.timer) {
                clearTimeout(this.timer);
                inputValue && this.handleInputChange('');
            }

            const $activeElement = document.activeElement;
            if (this.$input) {
                this.$input.focus();
            }
            else if (this.el && $activeElement !== this.el) {
                this.el.focus();
            }
        }
        else if (!searchValue) {
            this.timer && clearTimeout(this.timer);
            this.data.set('showValue', '');
            this.timer = setTimeout(() => {
                this.handleInputChange('');
            }, 300);
        }
    },
    handleClearSelection(e) {
        e.stopPropagation();
        this.data.set('selectedValue', []);
        this.data.set('checkedKeys.checked', []);
        this.data.set('selectedKeys', []);
        this.handleVisibleChange(false);
        this.$input ? this.$input.focus() : this.el.focus();
        this.data.set('_focused', true);
        this.fire('change', {info: {event: 'removeAll'}, value: []});
    },
    handleTreeDataLoad() {
        const {showInput, searchValue} = this.data.get();
        this.nextTick(() => {
            let data = this.getData(this.ref('tree').treeNodes);
            this.dataList = data.dataList;
            this.treeData = data.treeData;
            if (showInput && searchValue) {
                this.handleInputChange(searchValue, false);
            }
        });
    },
    handleRemoveValue(index) {
        const treeCheckable = this.data.get('treeCheckable');
        this.data.removeAt('selectedValue', index);
        let selectedValue = this.data.get('selectedValue');
        this.data.set(treeCheckable ? 'checkedKeys.checked' : 'selectedKeys', selectedValue.map(item => item.key));
        this.fire('change', {info: {event: 'remove'}, value: this.data.get(treeCheckable ? 'checkedKeys.checked' : 'selectedKeys')});
    },
    getIncludeData(data = []) {
        return this.dataList.filter(item => data.includes(item.key));
    },
    updateTreeData(treeData) {
        const replaceFields = this.data.get('replaceFields');
        treeData.map((item, i) => {
            treeData[i].label = item[replaceFields.label];
            treeData[i].title = item[replaceFields.title];
            treeData[i].value = item[replaceFields.value];
            treeData[i].key = item[replaceFields.key];
            treeData[i].children = item[replaceFields.children];
            if (treeData[i].children) {
                this.updateTreeData(treeData[i].children);
            }
        });
    },
    handleArrowClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const {disabled, visible} = this.data.get();
        if (!disabled) {
            this.handleVisibleChange(!visible);
        }
    },
    handleMouseOver() {
        this.resetActiveKey();
    },
    handleInputFocus() {
        this.$input && this.$input.focus();
    },
    resetActiveKey() {
        this.data.set('activeKey', '');
    },
    attached() {
        this.data.set('popupVisible', null);
        const {showInput, searchValue, treeData} = this.data.get();
        if (treeData && treeData.length) {
            this.updateTreeData(treeData);
        }
        this.nextTick(() => {
            this.data.set('checkedKeys.checked', this.data.get('value'));
            let data = this.getData(this.ref('tree').treeNodes);
            this.dataList = data.dataList;
            this.treeData = data.treeData;
            this.handleTreeCheck({checkedKeys: this.data.get('value')}, true);
            if (showInput && searchValue) {
                this.handleInputChange(searchValue, false);
            }
        });

        this.watch('searchValue', val => this.handleInputChange(val));
    },
    template: `<div
        class="{{wrapClass}}"
        tabindex="0"
        on-keydown="handleKeyDown"
        on-blur="handleBlur"
    >
        <s-dropdown
            prefixCls="${prefixCls}-dropdown"
            overlayClassName="${prefixCls}-tree-dropdown {{dropdownClassName}}"
            action="{{[]}}"
            showAction="{{showAction}}"
            hideAction="{{hideAction}}"
            stretch="minWidth"
            rootDomNode="{{getRootDomNode()}}"
            overlayStyle="{{dropdownStyle}}"
            dropdownClassName="${prefixCls}-selection ${prefixCls}-selection--{{multiple || treeCheckable ? 'multiple' : 'single'}}"
            visible="{{visible}}"
            popupVisible="{{popupVisible}}"
            stretch="{{dropdownMatchSelectWidth ? 'minWidth' : undefined}}"
            getPopupContainer="{{getPopupContainer}}"
            on-visibleChange="handleVisibleChange"
            s-ref="dropdown"
        >
            <s-selector
                showSearch="{{showInput}}"
                placeholder="{{placeholder}}"
                inputValue="{{showValue}}"
                searchValue="{{searchValue}}"
                selectedValue="{{selectedValue}}"
                multiple="{{multiple}}"
                treeCheckable="{{treeCheckable}}"
                popupVisible="{{visible}}"
                maxTagCount="{{maxTagCount}}"
                maxTagPlaceholder="{{maxTagPlaceholder}}"
                on-inputFocus="handleInputFocus"
                on-removeValue="handleRemoveValue"
            />
            <span
                s-if="allowClear && selectedValue.length"
                class="${prefixCls}-selection__clear ${prefixCls}-unselectable"
                unselectable="on"
                on-click="handleClearSelection"
            >
                <slot name="clearIcon">
                    <s-icon type="close-circle" theme="filled" class="${prefixCls}-clear-icon"/>
                </slot>
            </span>
            <span
                s-if="{{!(multiple || treeCheckable)}}"
                class="${prefixCls}-arrow ${prefixCls}-unselectable"
                unselectable="on"
                on-click="handleArrowClick"
            >
                <slot name="suffixIcon">
                    <s-icon s-if="loading" type="loading"/>
                    <s-icon s-else type="down" class="${prefixCls}-arrow-icon"/>
                </slot>
            </span>
            <div slot="overlay">
                <s-empty
                    style="display: {{showEmpty ? 'block' : 'none'}}"
                    image="${Empty.PRESENTED_IMAGE_SIMPLE}"
                    class="${emptyPrefixCls}-small"
                />
                <s-tree
                    style="display: {{showEmpty ? 'none' : 'block'}}"
                    defaultExpandAll="{{treeDefaultExpandAll}}"
                    defaultExpandedKeys="{{treeDefaultexpandedKeys}}"
                    activeKey="{{activeKey}}"
                    expandedKeys="{{expandedKeys}}"
                    disabled="{{disabled}}"
                    hiddenKeys="{{hiddenKeys}}"
                    filteredKeys="{{filteredKeys}}"
                    showIcon="{{treeIcon}}"
                    selectedKeys="{{selectedKeys}}"
                    checkedKeys="{{checkedKeys}}"
                    blockNode="{{true}}"
                    treeData="{{treeData}}"
                    loadData="{{loadData}}"
                    multiple="{{multiple || treeCheckable}}"
                    checkable="{{treeCheckable}}"
                    checkStrictly="{{treeCheckStrictly}}"
                    on-select="handleTreeSelect"
                    on-load="handleTreeDataLoad"
                    on-check="handleTreeCheck"
                    on-expand="handleTreeExpand"
                    on-mouseOver="handleMouseOver"
                    s-ref="tree"
                >
                    <slot />
                </s-tree>
            </div>
        </s-dropdown>
    </div>`
});
