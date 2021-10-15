/**
* @file tree.js 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import without from 'lodash/without';
import isPlainObject from 'lodash/isPlainObject';
import {classCreator} from '../core/util';
import './style/index';
import treeNode from './TreeNode';
import {LINE_UNIT_OFFEST_V} from './commonConst';

const prefixCls = classCreator('tree')();
const prefixClsV = prefixCls + '-virtual-list';
const NODE_HEIGHT_V = 32;
const SCROLL_STATUS_DELAY_V = 300;
const LINE_BASIC_OFFEST_V = 12;

export function traverseNodesKey(root = [], callback) {
    function processNode(node) {
        const key = node.data.get('key');

        if (callback(key, node) !== false) {
            traverseNodesKey(node.treeNodes, callback);
        }
    }

    root.forEach(processNode);
}

function traverseNodesKeyV(root = [], callback) {
    function processNode(node) {
        const key = node.key;

        if (callback(key, node) !== false) {
            traverseNodesKeyV(node.children, callback);
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

function checkNodeExpandedV(node) {
    // 如果一个节点的父节点是收起的，那这个节点也是收起的
    let isExpanded = true;
    let parent = node.parent;
    while (parent) {
        if (!parent.expanded) {
            isExpanded = false;
            break;
        } else {
            parent = parent.parent;
        }
    }
    return isExpanded;
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
        height: DataTypes.oneOfType([DataTypes.number, DataTypes.string]),
        loadData: DataTypes.func,
        loadedKeys: DataTypes.array,
        multiple: DataTypes.bool,
        selectedKeys: DataTypes.array,
        showIcon: DataTypes.bool,
        showLine: DataTypes.bool,
        treeData: DataTypes.array,
        virtual: DataTypes.bool
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
        },
        // 是否启用了虚拟滚动
        isVirtual() {
            return this.data.get('height') && this.data.get('virtual');
        },
        // 虚拟滚动中，展开的节点的列表
        expandedNodesV() {
            const flatNodes = this.data.get('flatNodes');
            return flatNodes && flatNodes.filter(node => checkNodeExpandedV(node));
        },
        // 虚拟滚动中，渲染的节点的数量
        visibleCountV() {
            return Math.ceil(this.data.get('height') / NODE_HEIGHT_V);
        },
        // 虚拟滚动中，渲染的节点的信息
        visibleNodeV() {
            const expandedNodesV = this.data.get('expandedNodesV');
            return expandedNodesV && expandedNodesV.slice(
                this.data.get('startV'),
                Math.min(this.data.get('endV'), expandedNodesV.length)
            );
        },
        // 虚拟滚动中，列表的总高度
        listHeightV() {
            const expandedNodesV = this.data.get('expandedNodesV');
            return expandedNodesV && (expandedNodesV.length * NODE_HEIGHT_V);
        },
        // 虚拟滚动中，渲染的节点的偏移量
        translateV() {
            return `transform: translate3d(0, ${this.data.get('startOffsetV')}px, 0)`;
        },
        // 虚拟滚动中，渲染的最后一个节点的索引
        endV() {
            return this.data.get('startV') + this.data.get('visibleCountV');
        }
    },
    initData() {
        return {
            disabled: false,
            checkable: false,
            selecteable: true,
            autoExpandParent: true,
            allCheckedKeys: [],
            allHalfCheckedKeys: [],
            checkStrictly: false,
            // 虚拟滚动中，渲染的第一个节点的索引
            startV: 0,
            // 虚拟滚动中，渲染的节点的偏移量
            startOffsetV: 0,
            // 虚拟滚动中，连接线的数量（数组的长度即数量，用数组表示是为了方便在模板中遍历）
            virtual: true,
            LINE_BASIC_OFFEST_V,
            LINE_UNIT_OFFEST_V
        };
    },
    inited() {
        this.treeNodes = [];
        this.multipleItem = [];
        this.selectedNodes = [];

        this.data.set('expandedKeys', this.data.get('expandedKeys') || this.data.get('defaultExpandedKeys') || []);

        if (this.data.get('isVirtual')) {
            const treeData = this.data.get('treeData');
            if (treeData) {
                this.data.set('flatNodes', this.flattenTreeData(treeData));
                this.watch('treeData', val => {
                    this.data.set('flatNodes', this.flattenTreeData(val));
                });
            } else {
                console.error('`treeData` not found.');
            }
        }

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
                this.updateTreeNodes();
            }
        });

        this.watch('selectedKeys', val => {
            this.updateTreeNodes();
        });

        this.watch('activeKey', () => this.updateTreeNodes());

        // 受控状态下监听checkedKeys，如果变化fire到上一层处理
        this.watch('checkedKeys', val => {
            const checkStrictly = this.data.get('checkStrictly');
            let checkedKeys = isPlainObject(val) ? val.checked : val || [];
            let halfCheckedKeys;
            // 如果有父子关联，拿到整个链上的数据
            if (!checkStrictly) {
                let allKeys = this.getAllCheckedKeys(this.treeNodes, checkedKeys.concat());
                checkedKeys = allKeys.checkedKeys;
                halfCheckedKeys = allKeys.halfCheckedKeys.filter(key => !checkedKeys.includes(key));
                this.data.set('allCheckedKeys', checkedKeys);
                this.data.set('allHalfCheckedKeys', halfCheckedKeys);
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
                const treeNodeDataV = this.data.get('isVirtual')
                    && this.data.get('flatNodes').find(node => node.key === checkedKey);
                allKeys = this.getChangedCheckedKeys(checkedKey, true, allKeys.checkedKeys, allKeys.halfCheckedKeys, checkStrictly, treeNodeDataV);
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

    getChangedCheckedKeys(key, isCheck, checkedKeys = [], halfCheckedKeys = [], checkStrictly, treeNodeDataV) {
        let checkedNodes = this.getCheckedNodes(this.treeNodes, [key]);
        checkedNodes.forEach(node => {
            checkedKeys = toggleArrayData(isCheck, checkedKeys, node.data.get('key'));
            if (!checkStrictly) {
                if (!this.data.get('isVirtual')) {
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
                            });
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
                } else {
                    let parent = treeNodeDataV.parent;
                    while (parent && !parent.disabled) {
                        let treeNodes = parent.children.filter(node => !this.data.get('disabled') && !node.disabled);
                        const parentKey = parent.key;
                        const allChecked = treeNodes.every(node => checkedKeys.includes(node.key));
                        checkedKeys = toggleArrayData(allChecked && isCheck, checkedKeys, parentKey);

                        const halfChecked = !treeNodes.every(node => checkedKeys.includes(node.key))
                            && treeNodes.some(node => {
                                const key = node.key;
                                return checkedKeys.includes(key) || halfCheckedKeys.includes(key);
                            }
                            );
                        halfCheckedKeys = toggleArrayData(halfChecked, halfCheckedKeys, parentKey);
                        parent = parent.parent;
                    }
                    if (treeNodeDataV.children && treeNodeDataV.children.length) {
                        const disabled = this.data.get('disabled') || node.disabled;
                        !disabled && traverseNodesKeyV(treeNodeDataV.children, (key, node) => {
                            const disabled = node.disabled;
                            if (!disabled) {
                                checkedKeys = toggleArrayData(isCheck, checkedKeys, key);
                            }
                            return !disabled;
                        });
                    }
                }
                halfCheckedKeys = halfCheckedKeys.filter(key => !checkedKeys.includes(key));
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
        let expandedKeys = this.data.get('expandedKeys') || [];

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

        const hiddenKeys = this.data.get('hiddenKeys') || [];
        this.data.set('hiddenKeys', hiddenKeys.filter(key => !expandedKeys.includes(key)));
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
        const expandedKeys = this.data.get('expandedKeys') || [];

        traverseNodesKey(this.treeNodes, (key, node) => {
            if (expandedKeys.includes(key)) {
                expandComponents.push(node);
            }
            return true;
        });
        return expandComponents;
    },

    scrollEventV() {
        this.data.set('isScrollingV', true);

        // 虚拟滚动中，当前的滚动位置
        const scrollTop = this.ref(`${prefixClsV}-container`).scrollTop;

        this.data.set('startV', Math.floor(scrollTop / NODE_HEIGHT_V));

        // 虚拟滚动中，渲染的节点的偏移量
        this.data.set('startOffsetV', scrollTop - (scrollTop % NODE_HEIGHT_V));

        if (this.scrollTimeoutIDV) {
            clearTimeout(this.scrollTimeoutIDV);
        }
        this.scrollTimeoutIDV = setTimeout(() => {
            this.data.set('isScrollingV', false);
        }, SCROLL_STATUS_DELAY_V);
    },

    flattenTreeData(treeData) {
        const flatNodes = [];
        let treeDepth = 0;
        let currentDepth = 0;
        let nodeCount = 0;
        const expandedKeys = this.data.get('expandedKeys');

        const dig = (treeData, parent) =>
            treeData.map((treeNode, index) => {
                currentDepth++;
                if (!treeNode.children || !treeNode.children.length) {
                    treeDepth = Math.max(treeDepth, currentDepth);
                    currentDepth = 0;
                }

                const flatNode = Object.assign({}, treeNode, {
                    parent,
                    children: null,
                    index: nodeCount++,
                    isEnd: [...(parent ? parent.isEnd : []), index === treeData.length - 1]
                });

                if (this.data.get('defaultExpandAll') && treeNode.children) {
                    flatNode.expanded = true;
                } else if (expandedKeys.length && this.data.get('autoExpandParent')) {
                    const expanded = expandedKeys.includes(treeNode.key);
                    flatNode.expanded = expanded;
                    if (expanded) {
                        let loopedParent = parent;
                        while (loopedParent) {
                            loopedParent.expanded = true;
                            const loopedParentKey = loopedParent.key;
                            if (!expandedKeys.includes(loopedParentKey)) {
                                this.data.push('expandedKeys', loopedParentKey);
                            }
                            loopedParent = loopedParent.parent;
                        }
                    }
                }

                flatNodes.push(flatNode);

                flatNode.children = dig(treeNode.children || [], flatNode);

                return flatNode;
            });

        dig(treeData);

        this.data.set('lineCountV', new Array(treeDepth - 1));

        return flatNodes;
    },

    handleSelect(key, info) {
        const {multiple, selectedKeys} = this.data.get();
        const index = selectedKeys.indexOf(key);

        multiple && index > -1 && this.data.removeAt('selectedKeys', index);
        multiple && index === -1 && this.data.push('selectedKeys', key);

        !multiple && this.data.set('selectedKeys', [key]);
        this.updateTreeNodes();

        this.fire('select', {selectedKeys: this.data.get('selectedKeys'), info});
    },

    messages: {
        // 拿到子节点，便于后面传递数据
        santd_tree_addTreeNode(payload) {
            this.treeNodes.push(payload.value);
        },
        // 点击节点的处理
        santd_tree_clickTreeNode(payload) {
            this.handleSelect(payload.value.key, payload.value);
        },
        // check节点的处理
        santd_tree_checkTreeNode(payload) {
            let info = payload.value;
            const key = info.node.data.get('key');
            const checked = info.checked;
            const checkStrictly = this.data.get('checkStrictly');

            let checkedKeys = this.data.get('allCheckedKeys');
            let halfCheckedKeys = checkStrictly ? [] : this.data.get('allHalfCheckedKeys');
            let allKeys = this.getChangedCheckedKeys(
                key, checked, checkedKeys, halfCheckedKeys, checkStrictly, info.treeNodeDataV
            );

            checkedKeys = allKeys.checkedKeys;
            halfCheckedKeys = allKeys.halfCheckedKeys;
            this.data.set('allCheckedKeys', checkedKeys);
            this.data.set('allHalfCheckedKeys', halfCheckedKeys);

            this.updateTreeNodes();
            if (payload.value.event === 'check') {
                this.fire('check', {checkedKeys: checkedKeys, info: payload.value});
            }
        },
        // 展开节点的处理
        santd_tree_expandTreeNode(payload) {
            if (this.data.get('isVirtual')) {
                const flatNodesCopy = Array.from(this.data.get('flatNodes'));
                flatNodesCopy[payload.value.treeIndexV].expanded = !payload.value.expanded;
                this.data.set('flatNodes', flatNodesCopy);
            }
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

    handleMouseOver(e) {
        this.fire('mouseOver', e);
    },

    template: `
        <ul
            class="{{classes}}"
            unselectable="on"
            role="tree"
            on-mouseover="handleMouseOver"
            s-if="!isVirtual"
        >
            <s-tree-node
                s-if="treeData"
                s-for="tree in treeData"
                filteredKeys="{{filteredKeys}}"
                hiddenKeys="{{hiddenKeys}}"
                selectedKeys="{{selectedKeys}}"
                expandedKeys="{{expandedKeys}}"
                allCheckedKeys="{{allCheckedKeys}}"
                allHalfCheckedKeys="{{allHalfCheckedKeys}}"
                defaultExpandAll="{{defaultExpandAll}}"
                autoExpandParent="{{autoExpandParent}}"
                showLine="{{showLine}}"
                title="{{tree.title}}"
                key="{{tree.key}}"
                activeKey="{{activeKey}}"
                value="{{tree.value}}"
                isLeaf="{{tree.isLeaf}}"
                disableCheckbox="{{tree.disableCheckbox}}"
                icon="{{tree.icon}}"
                checkable="{{rootCheckable && tree.checkable === undefined || tree.checkable)}}"
                disabled="{{tree.disabled || rootDisabled}}"
                selectable="{{rootSelectable && tree.selectable === undefined || tree.selectable)}}"
                loadData="{{loadData}}"
                treeData="{{tree.children}}"
                hasTitle="{{hasTitle}}"
            >
                <slot name="title" slot="title" var-title="{{title}}" />
            </s-tree-node>
            <slot s-else />
        </ul>
        <div s-else
            class="${prefixClsV}-container"
            on-mouseover="handleMouseOver"
            style="height: {{height}}px;"
            on-scroll="scrollEventV"
            s-ref="${prefixClsV}-container">
            <div class="${prefixClsV}-phantom" style="height: {{listHeightV}}px;"></div>
            <fragment s-if="showLine" s-for="item, index in lineCountV">
                <div class="${prefixClsV}-extra-line"
                    style="
                        {{'height: ' + listHeightV + 'px;'}}
                        {{'left: ' + (index * LINE_UNIT_OFFEST_V + LINE_BASIC_OFFEST_V) + 'px;'}}
                    "
                    s-if="!visibleNodeV[0].isEnd[index]"></div>
            </fragment>
            <ul
                class="{{classes}} ${prefixClsV} ${prefixClsV}-{{isScrollingV ? 'scrolling' : ''}}"
                unselectable="on"
                role="tree"
                style="{{translateV}}">
                <s-tree-node
                    s-for="tree, index in visibleNodeV"
                    filteredKeys="{{filteredKeys}}"
                    hiddenKeys="{{hiddenKeys}}"
                    selectedKeys="{{selectedKeys}}"
                    expandedKeys="{{expandedKeys}}"
                    allCheckedKeys="{{allCheckedKeys}}"
                    allHalfCheckedKeys="{{allHalfCheckedKeys}}"
                    defaultExpandAll="{{defaultExpandAll}}"
                    autoExpandParent="{{autoExpandParent}}"
                    showLine="{{showLine}}"
                    title="{{tree.title}}"
                    key="{{tree.key}}"
                    activeKey="{{activeKey}}"
                    value="{{tree.value}}"
                    isLeaf="{{tree.isLeaf}}"
                    disableCheckbox="{{tree.disableCheckbox}}"
                    icon="{{tree.icon}}"
                    checkable="{{rootCheckable && tree.checkable === undefined || tree.checkable)}}"
                    disabled="{{tree.disabled || rootDisabled}}"
                    selectable="{{rootSelectable && tree.selectable === undefined || tree.selectable)}}"
                    loadData="{{loadData}}"
                    hasTitle="{{hasTitle}}"
                    treeIndexV="{{tree.index}}"
                    height="{{height}}"
                    isVirtual="{{isVirtual}}"
                    treeNodeDataV="{{tree}}"
                >
                </s-tree-node>
            </ul>
        </div>
    `
});
