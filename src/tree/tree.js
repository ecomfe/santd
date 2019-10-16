/**
* @file tree.js 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index';
import treeNode from './treeNode';
const prefixCls = classCreator('tree')();

export default san.defineComponent({
    components: {
        's-tree-node': treeNode
    },
    dataTypes: {
        autoExpandParent: DataTypes.bool,
        blockNode: DataTypes.bool,
        checkable: DataTypes.bool,
        checkedKeys: DataTypes.array,
        checkStrictly: DataTypes.bool,
        defaultCheckedKeys: DataTypes.array,
        defaultExpandAll: DataTypes.bool,
        defaultExpandedKeys: DataTypes.array,
        defaultExpandParent: DataTypes.bool,
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
            checkable: false,
            selecteable: true,
            autoExpandParent: true,
            halfCheckedKeys: []
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
        this.data.set('checkedKeys', this.data.get('checkedKeys') || this.data.get('defaultCheckedKeys') || []);
        this.data.set('rootCheckable', this.data.get('checkable'));
        this.data.set('rootSelectable', this.data.get('selectable'));
        this.data.set('switcherIcon', this.sourceSlots.named.switcherIcon);
    },

    attached() {
        this.updateTreeNodes();
    },

    // 把父的所有数据更新给子节点
    updateTreeNodes() {
        let paramArr = [
            'selectedKeys',
            'expandedKeys',
            'checkedKeys',
            'halfCheckedKeys',
            'rootCheckable',
            'rootSelectable',
            'defaultExpandAll',
            'autoExpandParent',
            'showLine'
        ];
        this.treeNodes.forEach(node => {
            paramArr.forEach(param => {
                node.data.set(param, this.data.get(param));
            });
        });
    },

    messages: {
        santd_tree_addTreeNode(payload) {
            this.treeNodes.push(payload.value);
        },
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
        santd_tree_checkTreeNode(payload) {
            let checkedKeys = payload.value.checkedKeys;
            let halfCheckedKeys = payload.value.halfCheckedKeys;
            this.data.set('checkedKeys', checkedKeys);
            this.data.set('halfCheckedKeys', halfCheckedKeys);
            this.updateTreeNodes();
            if (payload.value.event === 'check') {
                this.fire('check', {checkedKeys, info: payload.value});
            }
        },
        santd_tree_expandTreeNode(payload) {
            let expandedKeys = payload.value.expandedKeys;
            this.data.set('expandedKeys', expandedKeys);
            this.updateTreeNodes();
            this.fire('expand', {expandedKeys, info: payload.value});
        },
        santd_tree_expandAll(payload) {
            const key = payload.value;
            this.data.push('expandedKeys', key);
            this.updateTreeNodes();
        }
    },

    template: `<div>
        <ul class="{{classes}}" unselectable="on">
            <s-tree-node
                s-if="treeData"
                s-for="tree in treeData"
                selectedKeys="{{selectedKeys}}"
                expandedKeys="{{expandedKeys}}"
                checkedKeys="{{checkedKeys}}"
                halfCheckedKeys="{{halfCheckedKeys}}"
                defaultExpandAll="{{defaultExpandAll}}"
                autoExpandParent="{{autoExpandParent}}"
                rootCheckable="{{rootCheckable}}"
                rootSelectable="{{rootSelectable}}"
                showLine="{{showLine}}"
                title="{{tree.title}}"
                key="{{tree.key}}"
                value="{{tree.value}}"
                isLeaf="{{tree.isLeaf}}"
                checkable="{{tree.checkable || rootCheckable}}"
                disabled="{{tree.disabled || disabled}}"
                selectable="{{tree.selectable || rootSelectable}}"
                loadData="{{loadData}}"
            >
            </s-tree-node>
            <slot s-else />
        </ul>
    </div>`
});
