/**
* @file tree.js 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import {loopComponentList, recursiveAllComponents} from '../core/util/findCompont';
import classNames from 'classnames';
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
        switcherIcon: DataTypes.func,
        showLine: DataTypes.bool
    },
    computed: {
        classes() {
            const showLine = this.data.get('showLine');
            const blockNode = this.data.get('blockNode');
            const directory = this.data.get('isDirectory');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-show-line`]: showLine,
                [`${prefixCls}-block-node`]: blockNode,
                [`${prefixCls}-directory`]: directory
            });
        }
    },
    initData() {
        return {
            componentPropName: 's-tree',
            autoExpandParent: true,
            defaultExpandParent: true
        };
    },
    inited() {
        this.multipleItem = [];
        this.selectedNodes = [];
    },
    created() {
        this.watch('expandedKeys', keys => {
            const allCompo = recursiveAllComponents(this.children, 's-tree-node');
            const handleExpandKeys = this.findAllExpandedKeys(allCompo, keys);
            this.setTreeNodeNeedData('expandedKeys', handleExpandKeys);
        });
        this.watch('selectedKeys', keys => {
            this.setTreeNodeNeedData('selectedKeys', keys);
        });
        this.watch('checkedKeys', keys => {
            this.setTreeNodeNeedData('checkedKeys', keys);
        });
        this.watch('searchValue', value => {
            this.setTreeNodeNeedData('searchValue', value);
        });
    },

    attached() {
        const treeNodeData = this.data.get('treeNodeData');
        const autoExpandParent = this.data.get('autoExpandParent');
        const defaultExpandParent = this.data.get('defaultExpandParent');
        // 获取所有组件
        const allCompo = recursiveAllComponents(this.children, 's-tree-node');
        // 获取到所有的有chilren的节点
        const getChildrenKeys = this.getHasChildrenKeys(this.children);
        // 处理 expandKeys相关
        const defaultExpandAll = this.data.get('defaultExpandAll');
        const defaultExpandAllKeys = defaultExpandAll ? getChildrenKeys : [];
        // 在attached的时候，如果有 defaultExpandAll, 则取全部的有children的组件的key
        let handleExpandKeys = defaultExpandAll
            ? defaultExpandAllKeys
            : (this.data.get('expandedKeys') || this.data.get('defaultExpandedKeys') || []);
        let resultExpandedKeys;
        // 把组件转化成数据形式
        const resultCompToData = this.exchangeToData(this.children, 's-tree-node');
        if (autoExpandParent || defaultExpandParent) {
            resultExpandedKeys = this.expandedKeys = this.findAllExpandedKeys(allCompo, handleExpandKeys);
        } else {
            resultExpandedKeys = this.expandedKeys = handleExpandKeys;
        }

        const checkedKeys = this.data.get('checkedKeys')
            || this.data.get('defaultCheckedKeys');
        const selectedKeys = this.data.get('selectedKeys')
            || this.data.get('defaultSelectedKeys');

        if (!treeNodeData) {
            this.setTreeData({expandedKeys: resultExpandedKeys, selectedKeys, checkedKeys});
        } else {
            const props = this.data.get();
            this.data.set('CONFPROPSDATA',
                {...props, ...{expandedKeys: resultExpandedKeys, selectedKeys, checkedKeys}}
            );
        }
        this.dispatch('exchangeCompo', {compoData: resultCompToData, treeNodes: allCompo});
    },

    /**
    * 把treeNode组件转化成层层数据
    * @param {Array} component组件
    *
    * @return {Array}
    */
    exchangeToData(children, componentName) {
        let initData = {children: []};
        function childLoop(children, componentName, childData) {
            if (!children) {
                return false;
            }
            children.forEach(item => {
                // debugger;
                let childName = item.data && item.data.get('componentPropName') || '';
                if (childName !== componentName) {
                    let childrenSlot = item.slotChildren && item.slotChildren.length
                        ? item.slotChildren
                        : item.children;
                    childLoop(childrenSlot, componentName, childData);
                } else {
                    let itemData = {
                        key: item.data.get('key'),
                        title: item.data.get('title'),
                        disabled: item.data.get('disabled'),
                        value: item.data.get('value'),
                        children: []
                    };
                    childData.push(itemData);

                    let childrenSlot = item.slotChildren && item.slotChildren.length
                        ? item.slotChildren
                        : item.children;
                    if (childrenSlot) {
                        childLoop(childrenSlot, componentName, itemData.children);
                    }
                }
            });
            return initData;
        }
        return childLoop(children, componentName, initData.children);
    },

    /**
    * 根据 expandKeys找到所有的父子组件,并且组合成新的expandKeys
    * @param allCompo {Object} 所有的tree-node组件
    * @param keys {Array} 要处理的expandedKeys数组
    *
    * @return {Array}
    */
    findAllExpandedKeys(allCompo, keys) {
        let tempExpandComp = [];
        if (keys) {
            keys.forEach(key => {
                const selfComponent = allCompo.filter(item => {
                    return item.data.get('key') === key;
                });
                selfComponent.forEach(item => {
                    const childCompo = this.getAllChilrenCompo(item.children);
                    const parentCompo = this.getParentCompos(item, 'componentPropName');
                    tempExpandComp.push(...[...parentCompo, ...selfComponent, ...childCompo]);
                });
            });
        }
        const finalExpandCompo = [...new Set([...tempExpandComp])];
        return finalExpandCompo.map(item => {
            return item.data.get('key');
        });
    },
    getParentCompos(node, compoName) {
        let parents = [];
        let parent;
        function findParents(node, compoName) {
            parent = node.parentComponent;
            const tar = parent && parent.data.get(compoName) === 's-tree-node';
            if (tar) {
                parents.push(parent);
            }
            if (parent && parent.parentComponent) {
                parent = parent.parentComponent;
                findParents(parent, compoName);
            }
            return parents;
        }
        return findParents(node, compoName);
    },
    getAllChilrenCompo(children) {
        const childrenList = [];
        function loopChildren(children) {
            children.forEach(child => {
                if (child.data && child.data.get('hasChildren')) {
                    childrenList.push(child);
                }
                if (child.children) {
                    loopChildren(child.children);
                }
            });
            return childrenList;
        }
        return loopChildren(children);
    },
    getHasChildrenKeys(children) {
        const keyList = [];
        function getHasChildrenItem(children) {
            children.forEach(child => {
                if (child.data && child.data.get('hasChildren')) {
                    keyList.push(child.data.get('key'));
                }
                if (child.children) {
                    getHasChildrenItem(child.children);
                }
            });
            return keyList;
        }
        return getHasChildrenItem(children);
    },
    setTreeData(state = {}) {
        const props = this.data.get();
        const propstate = {
            ...state,
            ...props
        };
        const parentTreeNode = this.parentTreeNode = loopComponentList(this.children, 's-tree-node');
        parentTreeNode.forEach(node => {
            node.data.set('treeData', propstate);
        });
    },

    /**
    * 更新treeData
    * @param {string} 要更新的属性
    * @param {Array|string} 要更新的值
    */
    setTreeNodeNeedData(key, value) {
        const treeNodeData = this.data.get('treeNodeData');
        if (!treeNodeData) {
            this.parentTreeNode.forEach(node => {
                node.data.merge('treeData', {[key]: value});
            });
        } else {
            this.data.merge('CONFPROPSDATA', {[key]: value});
        }
    },
    messages: {
        singleItemClick(target) {
            const compo = target.value;
            const key = compo.data.get('key');
            this.setTreeNodeNeedData('selectedKeys', [key]);
            this.fire('select', {
                selectedKeys: [key],
                e: {
                    selected: true,
                    selectedNodes: [compo],
                    node: compo
                }
            });
        },
        multipleItemClick(target) {
            const compo = target.value;
            const treeNodeData = this.data.get('treeNodeData');
            const selectedKeys = this.data.get('selectedKeys');
            const defaultSelectedKeys = this.data.get('defaultSelectedKeys');
            let key = [];
            let targetKeys = selectedKeys || defaultSelectedKeys || [];
            let res = false;
            targetKeys.forEach(item => {
                if (item === compo.data.get('key')) {
                    res = true;
                }
            });
            if (res) {
                const spliceKeyIndex = targetKeys.indexOf(compo.data.get('key'));
                targetKeys.splice(spliceKeyIndex, 1);
                this.selectedNodes.splice(this.selectedNodes.indexOf(compo), 1);
            } else {
                key.push(compo.data.get('key'));
                this.selectedNodes.push(compo);
            }
            this.data.set('selectedKeys', [...targetKeys, ...key]);
            this.setTreeNodeNeedData('selectedKeys', [...targetKeys, ...key]);
            this.fire('select', {
                selectedKeys: [...targetKeys, ...key],
                e: {
                    selected: !res,
                    selectedNodes: this.selectedNodes,
                    node: target.target
                }
            });
        },
        onNodeExpand(target) {
            const values = target.value;
            const expanded = values.expanded;
            const compo = values.compo;
            const loadData = this.data.get('loadData');
            const loadedKeys = this.data.get('loadedKeys');
            // 判断是不是应该进异步拉取的逻辑
            if (expanded && loadData) {
                const promise = loadData(values.compo);
                promise.then(() => {
                    compo.data.set('loading', false);
                    this.fire('load', {
                        loadedKeys: [compo.data.get('key')],
                        e: {
                            node: compo
                        }
                    });
                });
                compo.data.set('loading', true);
            }
        },
        checkedChange(val) {
            const evt = val.value;
            const targetCheckedCompo = val.target;
            const targetCheckStatus = targetCheckedCompo.data.get('checked');
            const {allKeys: allCheckedKeys, allCompo: allCheckedCompo} = this.getAllNeedComponent('checked');
            this.fire('check', {
                checkedKeys: allCheckedKeys,
                e: {
                    checked: targetCheckStatus,
                    checkedNodes: allCheckedCompo,
                    node: targetCheckedCompo,
                    event: evt
                }
            });
        },
        expandedChange(val) {
            const targetCompo = val.target;
            const targetExpanded = targetCompo.data.get('expanded');
            setTimeout(() => {
                const {allKeys: allExpandKeys} = this.getAllNeedComponent('expanded');
                const value = val.value;
                this.fire('expand', {
                    expandedKeys: allExpandKeys,
                    e: {
                        expanded: targetExpanded,
                        node: targetCompo
                    }
                });
            }, 10);

        },
        switcherExpand(props) {
            const {compo, key} = props.value;
            const alreadyKeys = this.expandedKeys.filter(itemKey => {
                return itemKey === key;
            });
            if (alreadyKeys.length) {
                this.expandedKeys.splice(this.expandedKeys.indexOf(key), 1);
            } else {
                this.expandedKeys.push(key);
            }
            this.setTreeNodeNeedData('expandedKeys', [...this.expandedKeys]);
        }
    },
    getAllNeedComponent(state) {
        const allKeys = [];
        const allCompo = [];
        const allChildrenCheckedCompo = recursiveAllComponents(this.children, 's-tree-node');
        allChildrenCheckedCompo.forEach(compo => {
            if (compo.data.get(state)) {
                allKeys.push(compo.data.get('key'));
                allCompo.push(compo);
            }
        });
        return {allKeys, allCompo};
    },
    template: `
    <div>
        <ul class="{{classes}}" unselectable="on">
            <s-tree-node
                treeData="{{CONFPROPSDATA}}"
                s-if="treeNodeData"
                treeNodeData="{{treeNodeData}}"
                s-for="nodeData in treeNodeData"
                nodeChildren="{{nodeData.children}}"
                title="{{nodeData.title}}"
                key="{{nodeData.key}}"
                value="{{nodeData.value}}"
                isLeaf="{{nodeData.isLeaf}}"
                disableCheckbox="{{nodeData.disableCheckbox}}"
                disabled="{{nodeData.disabled}}"
                selectable="{{nodeData.selectable}}"
            >
            </s-tree-node>
            <slot s-else></slot>

        </ul>
    </div>
    `
});
