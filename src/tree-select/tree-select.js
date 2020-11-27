/**
 * @file tree-select 树选中组件
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Tree from '../tree';
import Input from '../input';
import SingleSelector from './single-selector';
import MultipleSelector from './multiple-selector';
import Dropdown from '../dropdown';
import './style/index';

const prefixCls = classCreator('select')();

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
        's-single-selector': SingleSelector,
        's-multiple-selector': MultipleSelector,
        's-dropdown': Dropdown,
        's-input-search': Input.Search
    },
    initData() {
        return {
            multiple: false,
            showSearch: false,
            modeConfig: {
                single: true
            },
            allowClear: false,
            selectedKeys: [],
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
            replaceFields: {children: 'children', title: 'title', key: 'key', value: 'value', label: 'label'}
        };
    },
    inited() {
        let value = this.data.get('value') || this.data.get('defaultValue') || [];
        value = typeof value === 'string' ? [value] : value;
        this.data.set('value', value);
    },
    computed: {
        wrapClass() {
            const data = this.data;
            const allowClear = data.get('allowClear');
            const disabled = data.get('disabled');
            const loading = data.get('loading');
            const modeConfig = data.get('modeConfig');
            const visible = data.get('visible');
            const focused = data.get('_focused');
            const showArrow = data.get('showArrow');
            const size = sizeMap[this.data.get('size')] || '';

            return [
                prefixCls,
                `${prefixCls}-${disabled ? 'disabled' : 'enabled'}`,
                allowClear && `${prefixCls}-allow-clear`,
                modeConfig.combobox && `${prefixCls}-combobox`,
                loading && `${prefixCls}-loading`,
                visible && `${prefixCls}-open`,
                size && `${prefixCls}-${size}`,
                showArrow !== undefined && `${prefixCls}-${showArrow ? 'show' : 'no'}-arrow`,
                (visible || focused) && `${prefixCls}-focused`
            ].filter(name => name);
        }
    },
    getRootDomNode() {
        return this.el;
    },
    getData(treeNodes = [], dataList = [], treeData = []) {
        treeNodes.forEach((node, index) => {
            const {key, title, value} = node.data.get();
            let params = {key, title, label: title, value, node};
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
    getRenderData(data, multiple) {
        let value = [];
        if (data && data.length) {
            data.forEach((item, index) => {
                value.push({...item});
                if (!item.title && item.node.sourceSlots.named.title) {
                    this.sourceSlots.named[`title_${index}`] = item.node.sourceSlots.named.title;
                }
            });
        }
        return value;
    },
    repaint(multiple) {
        this.nextTick(() => {
            !multiple
                ? this.ref('singleSelector')._repaintChildren()
                : '';
            this.ref('dropdown').refresh();
        });
        !multiple
            ? this.handleVisibleChange(false)
            : null;

    },
    handleInputChange(value) {
        // todo
        return;
    },
    handleTreeCheck({checkedKeys, info = {}}, inited) {
        let checkedData = this.getIncludeData(checkedKeys);
        let filteredData = [];
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
                filteredData.push(data);
            }
        }

        let selectedValue = this.getRenderData(filteredData);
        this.data.set('selectedValue', selectedValue);
        this.data.set('selectedKeys', []);
        this.data.set('checkedKeys.checked', this.getIncludeData(checkedKeys).map(item => item.key));
        !inited && this.repaint(true);

        if (info.checked) {
            this.fire('select', {info});
        }
        !inited && this.fire('change', {value: selectedValue.map(data => data.key), node: info.node, info});
    },
    handleTreeSelect({selectedKeys, info}) {
        const treeCheckable = this.data.get('treeCheckable');
        const multiple = this.data.get('multiple') || treeCheckable;
        if (treeCheckable) {
            info.node.ref('checkbox').el.click();
            return;
        }
        let selectedData = this.getIncludeData(selectedKeys);
        let selectedValue = this.getRenderData(selectedData);
        this.data.set('selectedValue', selectedValue);
        this.data.set('selectedKeys', selectedValue.map(item => item.key));
        this.repaint(multiple);

        if (info.selected) {
            this.fire('select', {info});
        }
        this.fire('change', {value: selectedKeys, node: info.node, info});
    },
    handleTreeExpand({expandedKeys, info}) {
        this.fire('expand', expandedKeys);
    },
    handleVisibleChange(visible) {
        this.data.set('visible', visible);
    },
    handleClearSelection(e) {
        e.stopPropagation();
        this.data.set('selectedValue', []);
        this.data.set('checkedKeys.checked', []);
        this.data.set('selectedKeys', []);
        this.handleVisibleChange(false);
        this.fire('change', {info: {event: 'removeAll'}, value: []});
    },
    handleTreeDataLoad() {
        this.nextTick(() => {
            let data = this.getData(this.ref('tree').treeNodes);
            this.dataList = data.dataList;
            this.treeData = data.treeData;
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
    attached() {
        this.data.set('popupVisible', null);
        let treeData = this.data.get('treeData');
        if (treeData && treeData.length) {
            this.updateTreeData(treeData);
        }
        this.nextTick(() => {
            this.data.set('checkedKeys.checked', this.data.get('value'));
            let data = this.getData(this.ref('tree').treeNodes);
            this.dataList = data.dataList;
            this.treeData = data.treeData;
            this.handleTreeCheck({checkedKeys: this.data.get('value')}, true);
        });
    },
    template: `<div class="{{wrapClass}}">
        <s-dropdown
            prefixCls="${prefixCls}-dropdown"
            overlayClassName="${prefixCls}-tree-dropdown {{dropdownClassName}}"
            trigger="click"
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
            <div class="${prefixCls}-selection__rendered">
                <div
                    s-if="placeholder"
                    class="${prefixCls}-selection__placeholder ${prefixCls}-unselectable"
                    style="display: {{selectedValue.length ? 'none' : 'block'}};"
                    unselectable="on"
                >
                    {{placeholder}}
                </div>
                <s-single-selector
                    s-if="!(multiple || treeCheckable) && selectedValue.length"
                    value="{{selectedValue}}"
                    s-ref="singleSelector"
                >
                    <slot name="title_{{index}}" s-for="title, index in selectedValue"/>
                </s-single-selector>
                <s-multiple-selector
                    s-if="(multiple || treeCheckable) && selectedValue.length"
                    value="{{selectedValue}}"
                    maxTagCount="{{maxTagCount}}"
                    maxTagPlaceholder="{{maxTagPlaceholder}}"
                    s-ref="multipleSelector"
                    on-removeValue="handleRemoveValue"
                >
                    <slot name="title_{{index}}" s-for="title, index in selectedValue" />
                </s-multiple-selector>
            </div>
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
            >
                <slot name="suffixIcon">
                    <s-icon s-if="loading" type="loading"/>
                    <s-icon s-else type="down" class="${prefixCls}-arrow-icon"/>
                </slot>
            </span>
            <template slot="overlay">
                <s-input-search
                    s-if="showSearch"
                    on-change="handleInputChange"
                    placeholder="input search"
                    class="${prefixCls}-dropdown-search"
                />
                <s-tree
                    slot="overlay"
                    defaultExpandAll="{{treeDefaultExpandAll}}"
                    defaultExpandedKeys="{{treeDefaultexpandedKeys}}"
                    expandedKeys="{{treeExpandedKeys}}"
                    disabled="{{disabled}}"
                    showSearch="{{showSearch}}"
                    showIcon="{{treeIcon}}"
                    expandedKeys="{{expandedKeys}}"
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
                    s-ref="tree"
                >
                    <slot />
                </s-tree>
            </template>
        </s-dropdown>
    </div>`
});
