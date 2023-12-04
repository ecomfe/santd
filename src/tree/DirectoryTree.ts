/**
* @file directoryTree.js 目录树组件
* @author fuqiangqiang@baidu.com
*/

import * as I from './interface';
import Base from 'santd/base';
import Tree, {traverseNodesKey} from './Tree';
import Icon from '../icon';
import './style/index';

const calcRangeKeys = function (root: I.TBase[], expandedKeys: I.keysArray = [], startKey: string, endKey: string) {
    let keys: string[] = [];
    let record: undefined | boolean;

    if (!startKey || !endKey) {
        return keys;
    }
    if (startKey && startKey === endKey) {
        return [startKey];
    }

    traverseNodesKey(root, (key: string) => {
        if (record === false) {
            return false;
        }
        if (key === startKey || key === endKey) {
            keys.push(key);
            if (record === undefined) {
                record = true;
            }
            else if (record === true) {
                record = false;
                return false;
            }
        }
        else if (record === true) {
            keys.push(key);
        }

        if (expandedKeys.indexOf(key) === -1) {
            return false;
        }

        return true;
    });

    return keys;
};

export default class DirectoryTree extends Base<I.DirectoryTreeState, I.DirectoryTreeProps, I.DirectoryTreeComputed> {
    static components = {
        's-tree': Tree,
        's-icon': Icon
    };

    initData(): I.DirectoryTreeState {
        return {
            expandAction: 'click',
            showIcon: true
        };
    };

    lastSelectedKey: string = '';
    cachedSelectedKeys: null | I.keysArray = null;

    handleNodeSelect(selectedKeys: I.keysArray, info: I.infoType): void {
        const {multiple, expandedKeys} = this.data.get();
        const nativeEvent = info.nativeEvent;
        const ctrlPick = nativeEvent.ctrlKey || nativeEvent.metaKey;
        const shiftPick = nativeEvent.shiftKey;
        const eventKey: string = info.node.data.get('key');

        let newSelectedKeys = [];
        if (multiple && ctrlPick) {
            newSelectedKeys = selectedKeys;
            this.lastSelectedKey = eventKey;
            this.cachedSelectedKeys = newSelectedKeys;
        }
        else if (multiple && shiftPick) {
            newSelectedKeys = Array.from(
                new Set([
                    ...(this.cachedSelectedKeys || []),
                    ...calcRangeKeys((this.ref('tree') as I.TBase).treeNodes, expandedKeys, eventKey, this.lastSelectedKey)
                ])
            );
        }
        else {
            newSelectedKeys = [info.node.data.get('key')];
            this.lastSelectedKey = eventKey;
            this.cachedSelectedKeys = newSelectedKeys;
        }
        this.data.set('selectedKeys', newSelectedKeys);
        this.fire('select', {
            selectedKeys: newSelectedKeys,
            info: {
                selected: true,
                node: info.node,
                nativeEvent: info.nativeEvent
            }
        });
    };

    // 点击具体item
    handleNodeClick({selectedKeys, info}: {selectedKeys: I.keysArray, info: I.infoType}): void {
        this.handleNodeSelect(selectedKeys, info);
        if (info.node.data.get('hasChild')) {
            this.handleDebounceExpand(info);
        }
    }

    handleNodeExpand({expandedKeys}: {expandedKeys: I.keysArray}): void {
        this.data.set('expandedKeys', expandedKeys);
    }

    // 处理展开
    handleDebounceExpand(info: I.infoType): void {
        const expandAction = this.data.get('expandAction');
        if (expandAction === 'click') {
            this.expandFolderNode(info);
        }
        this.fire('expand', {
            expandedKeys: this.data.get('expandedKeys'),
            info
        });
    }

    // 处理多选
    handleNodeCheck(payload: I.nodeCheckPayloadType): void{
        this.fire('check', payload);
    }

    // 处理数据加载完毕
    handleNodeLoaded(payload: I.nodeCheckPayloadType): void {
        this.fire('load', payload);
    }

    handleExpandAll(expandedKeys: I.keysArray): void{
        this.data.set('expandedKeys', expandedKeys);
    }

    expandFolderNode(info: I.infoType) {
        const isLeaf = !info.node.data.get('hasChild');
        const nativeEvent = info.nativeEvent;
        if (isLeaf || nativeEvent.shiftKey || nativeEvent.metaKey || nativeEvent.ctrlKey) {
            // 说明不是要展开，而是要选中某项
            return false;
        }
        info.node.handleNodeExpand();
    }

    static template = /* html */ `
        <div>
            <s-tree
                autoExpandParent="{{autoExpandParent}}"
                blockNode="{{blockNode}}"
                checkable="{{checkable}}"
                checkedKeys="{{checkedKeys}}"
                defaultCheckedKeys="{{defaultCheckedKeys}}"
                defaultExpandAll="{{defaultExpandAll}}"
                defaultExpandedKeys="{{defaultExpandedKeys}}"
                defaultSelectedKeys="{{defaultSelectedKeys}}"
                disabled="{{disabled}}"
                expandedKeys="{{expandedkeys}}"
                loadData="{{loadData}}"
                multiple="{{multiple}}"
                selectable="{{selectable}}"
                selectedKeys="{{selectedKeys}}"
                showIcon="{{showIcon}}"
                showLine="{{showLine}}"
                isDirectory="{{true}}"
                on-select="handleNodeClick"
                on-expand="handleNodeExpand"
                on-expandAll="handleExpandAll"
                on-check="handleNodeCheck"
                on-load="handleNodeLoaded"
                s-ref="tree"
            >
                <slot />
            </s-tree>
        </div>
    `
};
