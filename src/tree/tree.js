/**
* @file tree.js 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import without from 'lodash/without';
import isPlainObject from 'lodash/isPlainObject';
import {classCreator} from '../core/util';
import './style/index';
import treeNode from './treeNode';
const prefixCls = classCreator('tree')();

export function traverseNodesKey(root = [], callback) {
    function processNode(node) {
        const key = node.data.get('key');

        if (callback(key, node) !== false) {
            traverseNodesKey(node.treeNodes, callback);
        }
    }

    root.forEach(processNode);
}

function toggleArrayData(check, data = [], key) {
    data = data.concat();
    const index = data.indexOf(key);

    check && index === -1 && data.push(key);
    !check && index !== -1 && data.splice(index, 1);

    return data;
}

export default san.defineComponent({
    components: {
        's-tree-node': treeNode
    },
    dataTypes: {
        autoExpandParent: DataTypes.bool,
        blockNode: DataTypes.bool,
        checkable: DataTypes.bool,
        checkedKeys: DataTypes.oneOfType([DataTypes.array, DataTypes.object]),
        checkStrictly: DataTypes.bool,
        defaultCheckedKeys: DataTypes.array,
        defaultExpandAll: DataTypes.bool,
        defaultExpandedKeys: DataTypes.array,
        defaultSelectedKeys: DataTypes.array,
        disabled: DataTypes.bool,
        draggable: DataTypes.bool,
        expandedKeys: DataTypes.array,
        loadData: DataTypes.func,
        loadedKeys: DataTypes.array,
        multiple: DataTypes.bool,
        selectedKeys: DataTypes.array,
        showIcon: DataTypes.bool,
        showLine: DataTypes.bool
    },
    computed: {
        classes() {
            const showLine = this.data.get('showLine');
            const blockNode = this.data.get('blockNode');
            const directory = this.data.get('isDirectory');
            let classArr = [prefixCls];
            showLine && classArr.push(`${prefixCls}-show-line`);
            blockNode && classArr.push(`${prefixCls}-block-node`);
            directory && classArr.push(`${prefixCls}-directory`);
            return classArr;
        }
    },
    initData() {
        return {
            disabled: false,
            checkable: false,
            selecteable: true,
            autoExpandParent: true,
            halfCheckedKeys: [],
            allCheckedKeys: [],
            allHalfCheckedKeys: [],
            checkStrictly: false
        };
    },
    inited() {
        this.treeNodes = [];
        this.treeNodesArr = [];
        this.multipleItem = [];
        this.selectedNodes = [];

        this.data.set('expandedKeys', this.data.get('expandedKeys') || this.data.get('defaultExpandedKeys') || []);
        // 如果是checkable的时候不设置默认的selectedKeys
        let selectedKeys = this.data.get('selectedKeys') || this.data.get('defaultSelectedKeys') || [];
        this.data.set('selectedKeys', this.data.get('checkable') ? [] : selectedKeys);

        let checkedKeys = this.data.get('checkedKeys') || this.data.get('defaultCheckedKeys') || [];
        this.data.set('allCheckedKeys', isPlainObject(checkedKeys) ? checkedKeys.checked : checkedKeys);
        this.data.set('allHalfCheckedKeys', isPlainObject(checkedKeys) ? checkedKeys.halfChecked : []);

        // checkable selectable disabled分为全局属性和子节点属性，需要分开对待
        this.data.set('rootCheckable', this.data.get('checkable'));
        this.data.set('rootSelectable', this.data.get('selectable'));
        this.data.set('rootDisabled', this.data.get('disabled'));

        this.data.set('switcherIcon', this.sourceSlots.named.switcherIcon);
        this.data.set('hasTitle', !!this.sourceSlots.named.title);

        this.watch('expandedKeys', val => {
            // 当外部传入expandedKeys时，自动展开父节点
            if (this.data.get('autoExpandParent')) {
                this.autoExpand();
            }
        });

        this.watch('selectedKeys', val => {
            this.updateTreeNodes();
        });

        // 受控状态下监听checkedKeys，如果变化fire到上一层处理
        this.watch('checkedKeys', val => {
            const checkStrictly = this.data.get('checkStrictly');
            let checkedKeys = isPlainObject(val) ? val.checked : val || [];
            let halfCheckedKeys;
            // 如果有父子关联，拿到整个链上的数据
            if (!checkStrictly) {
                let allKeys = this.getAllCheckedKeys(this.treeNodes, checkedKeys.concat());
                this.data.set('allCheckedKeys', allKeys.checkedKeys);
                this.data.set('allHalfCheckedKeys', allKeys.halfCheckedKeys);
            }
            // 没有关联的话直接返回当前数据
            else {
                halfCheckedKeys = isPlainObject(val) ? val.halfChecked : [] || [];
                this.data.set('allCheckedKeys', checkedKeys);
                this.data.set('allHalfCheckedKeys', halfCheckedKeys);
            }
            this.updateTreeNodes();
        });

        // 拿到需要传递给子组件的属性名
        this.paramsArr = without(Object.keys(this.data.get()), 'disabled', 'checkable', 'selectable', 'classes', 'treeData');
    },

    // 根据传入的checkedKeys值把上下游节点所有符合的值都取到
    getAllCheckedKeys(treeNodes, checkedKeys = []) {
        const checkStrictly = this.data.get('checkStrictly');
        let checkedKey;
        let allKeys = {
            checkedKeys: [],
            halfCheckedKeys: []
        };
        while (checkedKeys.length) {
            checkedKey = checkedKeys.shift();

            if (!allKeys.checkedKeys.includes(checkedKey)) {
                let keys = this.getChangedCheckedKeys(treeNodes, checkedKey, true, [], [], checkStrictly);
                // 这里需要对数据进行去重
                allKeys.checkedKeys = Array.from(new Set(allKeys.checkedKeys.concat(keys.checkedKeys)));
                allKeys.halfCheckedKeys = keys.halfCheckedKeys;
            }
        }
        return allKeys;
    },

    getCheckedNodes(treeNodes, keys) {
        let nodes = [];
        traverseNodesKey(treeNodes, (key, node) => {
            if (keys.includes(key)) {
                nodes.push(node);
            }
            return true;
        });
        return nodes;
    },

    getChangedCheckedKeys(treeNodes, key, isCheck, checkedKeys = [], halfCheckedKeys = [], checkStrictly) {
        let checkedNodes = this.getCheckedNodes(this.treeNodes, [key]);
        checkedNodes.forEach(node => {
            checkedKeys = toggleArrayData(isCheck, checkedKeys, node.data.get('key'));
            if (!checkStrictly) {
                let parent = node.parentComponent;
                // 找到后不断遍历父节点，把需要改变状态的父节点的key都拿到
                while (parent && parent !== this && !parent.data.get('disabled')) {
                    // 先过滤掉是disabled状态的节点
                    let treeNodes = parent.treeNodes.filter(node => !this.data.get('disabled') && !node.data.get('disabled'));
                    const parentKey = parent.data.get('key');
                    const allChecked = treeNodes.every(node => checkedKeys.includes(node.data.get('key')));
                    // 如果是子是全选状态，把父的key也放到selected中
                    checkedKeys = toggleArrayData(allChecked && isCheck, checkedKeys, parentKey);

                    const halfChecked = !treeNodes.every(node => checkedKeys.includes(node.data.get('key')))
                        && treeNodes.some(node => {
                            const key = node.data.get('key');
                            return checkedKeys.includes(key) || halfCheckedKeys.includes(key);
                        }
                        );
                    // 如果子不是全选是半选，把父放到halfSelectedKeys里面
                    halfCheckedKeys = toggleArrayData(halfChecked, halfCheckedKeys, parentKey);
                    parent = parent.parentComponent;
                }
                // 处理完父节点，处理子节点，找到所有的子节点，添加或者删除在checkedKeys里面
                const disabled = this.data.get('disabled') || node.data.get('disabled');
                !disabled && traverseNodesKey(node.treeNodes, (key, node) => {
                    const disabled = this.data.get('disabled') || node.data.get('disabled');
                    if (!disabled) {
                        checkedKeys = toggleArrayData(isCheck, checkedKeys, key);
                    }
                    return !disabled;
                });
            }
        });
        return {
            checkedKeys,
            halfCheckedKeys
        };
    },

    attached() {
        if (this.data.get('autoExpandParent')) {
            this.autoExpand();
            this.updateTreeNodes();
        }
        const checkStrictly = this.data.get('checkStrictly');
        !checkStrictly && this.nextTick(() => {
            let allKeys = this.getAllCheckedKeys(this.treeNodes, this.data.get('allCheckedKeys').concat());
            this.data.set('allCheckedKeys', allKeys.checkedKeys);
            this.data.set('allHalfCheckedKeys', allKeys.halfCheckedKeys);
            this.updateTreeNodes();
        });
    },

    // 自动展开父节点
    autoExpand() {
        let expandComponents = this.findExpandComponents();
        let expandedKeys = this.data.get('expandedKeys');

        while (expandComponents.length) {
            let expand = expandComponents.pop();
            while (expand !== this) {
                expand = expand.parentComponent;
                const key = expand.data.get('key');
                if (!expandedKeys.includes(key) && key) {
                    expandedKeys.push(key);
                }
            }
        }
        this.data.set('expandedKeys', expandedKeys.concat(), {silent: true});
    },

    // 把父的所有数据更新给子节点
    updateTreeNodes() {
        this.treeNodes.forEach(node => {
            this.paramsArr.forEach(param => {
                node.data.set(param, this.data.get(param));
            });
        });
    },

    // 找所有展开的节点
    findExpandComponents() {
        let expandComponents = [];
        const expandedKeys = this.data.get('expandedKeys');

        traverseNodesKey(this.treeNodes, (key, node) => {
            if (expandedKeys.includes(key)) {
                expandComponents.push(node);
            }
            return true;
        });
        return expandComponents;
    },

    messages: {
        // 拿到子节点，便于后面传递数据
        santd_tree_addTreeNode(payload) {
            this.treeNodes.push(payload.value);
        },
        // 点击节点的处理
        santd_tree_clickTreeNode(payload) {
            const multiple = this.data.get('multiple');
            const key = payload.value.key;
            const selectedKeys = this.data.get('selectedKeys');
            const index = selectedKeys.indexOf(key);

            multiple && index > -1 && this.data.removeAt('selectedKeys', index);
            multiple && index === -1 && this.data.push('selectedKeys', key);

            !multiple && this.data.set('selectedKeys', [key]);
            this.updateTreeNodes();
            this.fire('select', {selectedKeys: this.data.get('selectedKeys'), info: payload.value});
        },
        // check节点的处理
        santd_tree_checkTreeNode(payload) {
            let info = payload.value;
            const key = info.node.data.get('key');
            const checked = info.checked;
            const checkStrictly = this.data.get('checkStrictly');

            let checkedKeys = this.data.get('allCheckedKeys');
            let halfCheckedKeys = checkStrictly ? [] : this.data.get('allHalfCheckedKeys');
            let allKeys = this.getChangedCheckedKeys(this.treeNodes, key, checked, checkedKeys, halfCheckedKeys, checkStrictly);

            // 非受控状态下，所有数据都走内部的allCheckedKeys和allHalfCheckedKeys
            if (!('checkedKeys' in this.data.get())) {
                checkedKeys = allKeys.checkedKeys;
                halfCheckedKeys = allKeys.halfCheckedKeys;
                this.data.set('allCheckedKeys', checkedKeys);
                this.data.set('allHalfCheckedKeys', halfCheckedKeys);
            }
            // 受控状态不保存数据，由外部传入的checkedKeys经过处理后拿到
            else {
                checkedKeys = allKeys.checkedKeys;
            }
            this.updateTreeNodes();
            if (payload.value.event === 'check') {
                this.fire('check', {checkedKeys: checkedKeys, info: payload.value});
            }
            this.data.set('checkedKeys', checkedKeys);
        },
        // 展开节点的处理
        santd_tree_expandTreeNode(payload) {
            let expandedKeys = payload.value.expandedKeys;
            this.data.set('expandedKeys', expandedKeys, {silent: true});
            this.updateTreeNodes();
            this.fire('expand', {expandedKeys, info: payload.value});
        },
        // 展开所有节点
        santd_tree_expandAll(payload) {
            const key = payload.value;
            this.data.push('expandedKeys', key);
            this.updateTreeNodes();
            this.fire('expandAll', this.data.get('expandedKeys'));
        },
        // 加载数据完成时候的处理
        santd_tree_dataLoaded(payload) {
            let loadedKeys = payload.value.loadedKeys;
            let node = payload.value.node;
            this.fire('load', {
                loadedKeys: loadedKeys.map(keys => keys.key),
                info: {event: 'load', node}
            });
        }
    },

    template: `
        <ul class="{{classes}}" unselectable="on" role="tree">
            <s-tree-node
                s-if="treeData"
                s-for="tree in treeData"
                selectedKeys="{{selectedKeys}}"
                expandedKeys="{{expandedKeys}}"
                allCheckedKeys="{{allCheckedKeys}}"
                allHalfCheckedKeys="{{allHalfCheckedKeys}}"
                defaultExpandAll="{{defaultExpandAll}}"
                autoExpandParent="{{autoExpandParent}}"
                showLine="{{showLine}}"
                title="{{tree.title}}"
                key="{{tree.key}}"
                value="{{tree.value}}"
                isLeaf="{{tree.isLeaf}}"
                checkable="{{tree.checkable || rootCheckable}}"
                disabled="{{tree.disabled || rootDisabled}}"
                selectable="{{tree.selectable || rootSelectable}}"
                loadData="{{loadData}}"
                treeData="{{tree.children}}"
                hasTitle="{{hasTitle}}"
            >
                <slot name="title" slot="title" var-title="{{title}}" />
            </s-tree-node>
            <slot s-else />
        </ul>
    `
});
