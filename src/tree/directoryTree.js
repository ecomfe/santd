/**
* @file directoryTree.js 目录树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import Tree from './tree';
import Icon from '../icon';
import './style/index';

const dirIcon = san.defineComponent({
    components: {
        's-icon': Icon
    },
    initData() {
        return {
            isLeaf: false,
            expanded: true
        };
    },
    template: `
        <span>
            <s-icon s-if="isLeaf" type="file"></s-icon>
            <s-icon s-else type="{{expanded ? 'folder-open' : 'folder'}}"></s-icon>
        </span>
    `
});

export default san.defineComponent({
    dataTypes: {
        expandAction: DataTypes.oneOfType([DataTypes.string, DataTypes.bool]),
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
        switcherIcon: DataTypes.func,
        showLine: DataTypes.bool
    },
    components: {
        's-tree': Tree
    },
    initData() {
        return {
            dirIcon: dirIcon,
            expandAction: 'click',
            onClick: this.onClick.bind(this)
        };
    },
    inited() {
        this.timeout = null;
        this.newSelectedKeys = [];
        this.selectedNodes = [];
    },
    created() {
        const props = this.data.get();
        this.data.set('props', props);
    },
    attached() {
    },
    onSelect(nativeEvent, node) {
        const {multiple} = this.data.get();
        const ctrlPick = nativeEvent.ctrlKey || nativeEvent.metaKey;
        const shiftPick = nativeEvent.shiftKey;
        const nodeKey = node.data.get('key');
        let delKey = [];
        const newState = {};
        if (multiple && ctrlPick) {
            // ctrl + click
            delKey = this.newSelectedKeys.filter(key => {
                return key === nodeKey;
            });
            if (delKey.length) {
                this.newSelectedKeys.splice(this.newSelectedKeys.indexOf(nodeKey), 1);
                this.selectedNodes.splice(this.selectedNodes.indexOf(node), 1);
            } else {
                this.newSelectedKeys.push(nodeKey);
                this.selectedNodes.push(node);
            }
        } else if (multiple && shiftPick) {
            // shift + click
        } else {
            // single click
            this.newSelectedKeys = [nodeKey];
            this.selectedNodes = [node];
        }
        this.data.merge('props', {selectedKeys: [...this.newSelectedKeys]});
        this.fire('select', {
            selectedKeys: this.newSelectedKeys,
            e: {
                selected: multiple ? !delKey.length : true,
                selectedNodes: multiple ? this.selectedNodes : node,
                node: node
            }
        });
    },
    // 点击具体item
    onClick(event, node) {
        const expandAction = this.data.get('expandAction');
        this.onSelect(event, node);
        this.onDebounceExpand(event, node);
    },
    // 处理展开
    onDebounceExpand(event, node) {
        const expandAction = this.data.get('expandAction');
        if (expandAction === false) {
            return false;
        }
        this.simpleDebounce(this.expandFolderNode.bind(this), 200, {event, node});
    },
    simpleDebounce(fn, delay, {event = '', node = null}) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.timeout = setTimeout(() => {
            fn(event, node);
        }, delay);
    },
    expandFolderNode(event, node) {
        const isLeaf = node.data.get('isLeaf');
        if (isLeaf || event.shiftKey || event.metaKey || event.ctrlKey) {
            // 说明不是要展开，而是要选中某项
            return false;
        }
        node.onExpand();
    },
    template: `
        <div>
            <s-tree isDirectory treeNodeIcon="{{dirIcon}}" s-bind="{{props}}"><slot></slot></s-tree>
        </div>
    `
});
