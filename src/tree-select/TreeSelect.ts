/**
 * @file tree-select 树选中组件
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */
import {classCreator} from '../core/util';
import Icon from '../icon';
import Tree from '../tree';
import Selector from './Selector';
import Dropdown from '../dropdown';
import Empty from '../empty';
import './style/index';
import KeyCode from '../core/util/keyCode';
import Base from 'santd/base';
import { State, Props, Messages, TreeNode} from './interface';
import {clickTreeNodePayloadValueType, checkTreeNodePayloadValueType} from '../tree/interface';
import TreeN from '../tree/TreeNode';
import {SHOW_ALL, SHOW_PARENT, SHOW_CHILD} from './treeStrategies';

const prefixCls = classCreator('select')();
const emptyPrefixCls = classCreator('empty')();

const getParentKey = (key: string, tree: TreeNode[]): string | undefined => {
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

const getExpandedKeys = (expandedKeys: string[] = [], nodeArr: TreeNode[] = [], hiddenKeys: (string | null)[] = []) => {
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

interface SizeMap {
    [key: string]: string;
}
const sizeMap: SizeMap = {
    small: 'sm',
    large: 'lg'
};

export default class TreeSelect extends Base<State, Props> {
    $input!: HTMLInputElement
    dataList!: TreeNode[]
    treeData!: TreeNode[]
    timer?:  NodeJS.Timeout
    static TreeNode = TreeN;
    static SHOW_ALL = SHOW_ALL;
    static SHOW_PARENT = SHOW_PARENT;
    static SHOW_CHILD = SHOW_CHILD;
    static components = {
        's-icon': Icon,
        's-tree': Tree,
        's-tree-node': Tree.TreeNode,
        's-selector': Selector,
        's-dropdown': Dropdown,
        's-empty': Empty
    }
    initData(): State {
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
            treeNodeLabelProp: 'title',
            replaceFields: {children: 'children', title: 'title', key: 'key', value: 'value', label: 'label'}
        };
    }
    inited() {
        const {defaultValue, treeCheckable} = this.data.get();
        let value = this.data.get('value') || defaultValue || [];
        value = typeof value === 'string' ? [value] : value;
        this.data.set('value', value);
        if (treeCheckable) {
            this.data.set('multiple', true);
        }
    }
    static computed = {
        wrapClass(this: TreeSelect) {
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
        showInput(this: TreeSelect) {
            const showSearch = this.data.get('showSearch');
            const multiple = this.data.get('multiple');
            return showSearch !== undefined ? showSearch : multiple;
        },
        showEmpty(this: TreeSelect) {
            return this.data.get('inputValue') && !this.data.get('filteredKeys.length');
        },
        showAction(this: TreeSelect) {
            return this.data.get('disabled') ? [''] : ['click'];
        },
        hideAction(this: TreeSelect) {
            const showInput = this.data.get('showInput');
            const mutiple = this.data.get('mutiple');
            return !showInput && !mutiple ? ['click'] : ['blur'];
        }
    }
    static messages: Messages = {
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
    }
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
    }
    handleInputChange(value: string, visible: boolean = true) {
        this.data.set('inputValue', value);
        this.data.set('showValue', value);

        const filteredKeys = [];
        let hiddenKeys: (string | null)[] = [];
        let expandedKeys: string[] | undefined = [];

        if (value) {
            hiddenKeys = this.dataList.map(item => {
                const title = (item.title || '').toLowerCase();
                if (title.indexOf(value.toLowerCase()) === -1) {
                    return item.key;
                }
                return null;
            }).filter(key => key);

            // todo：兼容 treeNode.title 为 slot
            for (const item of this.dataList) {
                const key = item.key;
                const title = (item.title || '').toLowerCase();
                if (title.indexOf(value.toLowerCase()) > -1) {
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
    }
    handleKeyDown(e: KeyboardEvent) {
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
        const $tree = (this.ref('tree') as unknown as Tree);

        // 删除
        if (!inputValue && multiple && keyCode === KeyCode.BACKSPACE) {
            if (selectedValue!.length) {
                this.handleRemoveValue(selectedValue!.length - 1);
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
                else if (!inputValue && !multiple && selectedKeys![0]) {
                    key = selectedKeys![0];
                }

                if (key) {
                    const node = this.dataList.filter(item => item.key === key)[0].node;
                    const info = {
                        event: 'select',
                        nativeEvent: e,
                        node,
                        selected: node!.data.get('selected'),
                        key
                    } as unknown as clickTreeNodePayloadValueType;
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
    }
    // direction: -1 UP, 1 DOWN
    updateActiveKey(activeKey = '', direction = 0) {
        const expandedKeys = this.data.get('expandedKeys') || [];
        const hiddenKeys = this.data.get('hiddenKeys').filter(key => !expandedKeys.includes(key!));
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
    }
    handleBlur(e: MouseEvent) {
        if (this.data.get('disabled')) {
            e.preventDefault();
            return;
        }
        this.data.set('_focused', false);
    }
    getRootDomNode() {
        return this.el;
    }
    getData(treeNodes: TreeNode[], dataList: TreeNode[] = [], treeData: TreeNode[] = []) {
        treeNodes.forEach((node: TreeNode, index: number) => {
            const {key, title, value, disabled} = (node as any).data.get();
            let params = {
                key,
                title,
                label: title,
                value,
                node,
                disabled
            } as unknown as TreeNode;
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
    }
    repaint(multiple: boolean) {
        this.nextTick(() => (this.ref('dropdown') as Dropdown).refresh());
        !multiple
            ? this.handleVisibleChange(false)
            : this.data.get('inputValue') && this.handleInputChange('');

    }
    handleTreeCheck({checkedKeys, info}: {checkedKeys: string[], info?: checkTreeNodePayloadValueType}, inited: boolean) {
        if (!info) {
            info = {} as checkTreeNodePayloadValueType;
        }
        let checkedData = this.getIncludeData(checkedKeys) as unknown as TreeNode[];
        let selectedValue = [] as TreeNode[];
        let removedKeys: string[] = [];
        const showCheckedStrategy = this.data.get('showCheckedStrategy');
        while (checkedData.length) {
            let data = checkedData.shift();
            let node = data!.node;
            const key = data!.key;
            if (node.treeNodes.length) {
                const allChecked = node.treeNodes.every(item => checkedKeys.includes(item.data.get('key')));
                if (allChecked) {
                    if (showCheckedStrategy === 'SHOW_CHILD') {
                        removedKeys.push(data!.key);
                    }
                    else if (showCheckedStrategy === 'SHOW_PARENT') {
                        removedKeys = removedKeys.concat(node.treeNodes.map(item => item.data.get('key')));
                    }
                }
            }
            if (!removedKeys.includes(key)) {
                selectedValue.push(data!);
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

        this.$input ? this.$input.focus() : (this.el as HTMLInputElement).focus();
    }
    handleTreeSelect({selectedKeys, info}: {selectedKeys: string[], info: any}) {
        const {treeCheckable, multiple} = this.data.get();
        if (treeCheckable) {
            info.node.ref('checkbox').el.click();
            return;
        }
        const selectedValue = this.getIncludeData(selectedKeys);
        this.data.set('selectedValue', selectedValue);
        this.data.set('selectedKeys', selectedValue.map(item => item.key));
        this.repaint(multiple!);

        if (info.selected) {
            this.fire('select', {info});
        }
        this.fire('change', {value: selectedKeys, node: info.node, info});
        this.nextTick(() => {
            this.$input ? this.$input.focus() : (this.el as HTMLInputElement).focus();
        });
        this.data.set('_focused', true);
    }
    handleTreeExpand({expandedKeys}: {expandedKeys: string[]}) {
        this.data.set('treeExpandedKeys', expandedKeys);
        this.fire('expand', expandedKeys);
    }
    handleVisibleChange(visible: boolean) {
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
                (this.el as HTMLInputElement).focus();
            }
        }
        else if (!searchValue) {
            this.timer && clearTimeout(this.timer);
            this.data.set('showValue', '');
            this.timer = setTimeout(() => {
                this.handleInputChange('');
            }, 300);
        }
    }
    handleClearSelection(e: MouseEvent) {
        e.stopPropagation();
        this.data.set('selectedValue', []);
        this.data.set('checkedKeys.checked', []);
        this.data.set('selectedKeys', []);
        this.handleVisibleChange(false);
        this.$input ? this.$input.focus() : (this.el as HTMLInputElement).focus();
        this.data.set('_focused', true);
        this.fire('change', {info: {event: 'removeAll'}, value: []});
    }
    handleTreeDataLoad() {
        const {showInput, searchValue} = this.data.get();
        this.nextTick(() => {
            let data = this.getData((this.ref('tree') as any).treeNodes);
            this.dataList = data.dataList;
            this.treeData = data.treeData;
            if (showInput && searchValue) {
                this.handleInputChange(searchValue, false);
            }
        });
    }
    handleRemoveValue(index: number) {
        const treeCheckable = this.data.get('treeCheckable');
        this.data.removeAt('selectedValue', index);
        let selectedValue = this.data.get('selectedValue');
        this.data.set(treeCheckable ? 'checkedKeys.checked' : 'selectedKeys', selectedValue.map(item => item.key));
        this.fire('change', {info: {event: 'remove'}, value: this.data.get(treeCheckable ? 'checkedKeys.checked' : 'selectedKeys')});
    }
    getIncludeData(data: string[] = []) {
        return this.dataList.filter(item => data.includes(item.key));
    }
    updateTreeData(treeData: TreeNode[]) {
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
    }
    handleArrowClick(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        const {disabled, visible} = this.data.get();
        if (!disabled) {
            this.handleVisibleChange(!visible);
        }
    }
    handleMouseOver() {
        this.resetActiveKey();
    }
    handleInputFocus() {
        this.$input && this.$input.focus();
    }
    resetActiveKey() {
        this.data.set('activeKey', '');
    }
    attached() {
        this.data.set('popupVisible', null);
        const {showInput, searchValue, treeData} = this.data.get();
        if (treeData && treeData.length) {
            this.updateTreeData(treeData);
        }
        this.nextTick(() => {
            this.data.set('checkedKeys.checked', this.data.get('value'));
            let data = this.getData((this.ref('tree') as any).treeNodes);
            this.dataList = data.dataList;
            this.treeData = data.treeData;
            const payload = {checkedKeys: this.data.get('value')}
            this.handleTreeCheck(payload, true);
            if (showInput && searchValue) {
                this.handleInputChange(searchValue, false);
            }
        });

        this.watch('searchValue', val => this.handleInputChange(val));
    }
    static template = `<div
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
                treeNodeLabelProp="{{treeNodeLabelProp}}"
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
};
