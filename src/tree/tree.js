/**
* @file tree.js 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import without from 'lodash/without';
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

        // 拿到需要传递给子组件的属性名
        this.paramsArr = without(Object.keys(this.data.get()), 'disabled', 'checkable', 'selectable', 'classes', 'treeData');
    },

    attached() {
        this.updateTreeNodes();
        if (this.data.get('autoExpandParent')) {
            this.autoExpand();
        }
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
        this.updateTreeNodes();
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
            let checkedKeys = payload.value.checkedKeys;
            let halfCheckedKeys = payload.value.halfCheckedKeys;
            this.data.set('checkedKeys', checkedKeys);
            this.data.set('halfCheckedKeys', halfCheckedKeys);
            this.updateTreeNodes();
            if (payload.value.event === 'check') {
                this.fire('check', {checkedKeys, info: payload.value});
            }
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
                checkedKeys="{{checkedKeys}}"
                halfCheckedKeys="{{halfCheckedKeys}}"
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
