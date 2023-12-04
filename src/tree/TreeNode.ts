/**
* @file treeNode 树组件
* @author fuqiangqiang@baidu.com
*/

import * as I from './interface';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Checkbox from '../checkbox';
import {CheckboxChangeEvent} from '../checkbox/interface';
import {LINE_UNIT_OFFEST_V} from './commonConst';

const prefixCls = classCreator('tree')();
const prefixClsV = prefixCls + '-virtual-list';
const getComputedKeys = (targetKeys = [], key: string) => {
    let keysFlag = false;
    targetKeys.forEach(defKey => {
        if (defKey === key) {
            keysFlag = true;
        }
    });
    return keysFlag;
};
const SWITCH_STATUS_DELAY_V = 100;

let paramArr = [
    'filteredKeys',
    'hiddenKeys',
    'activeKey',
    'selectedKeys',
    'expandedKeys',
    'allCheckedKeys',
    'allHalfCheckedKeys',
    'rootCheckable',
    'rootSelecable',
    'rootDisabled',
    'switcherIcon',
    'defaultExpandAll',
    'autoExpandParent',
    'showLine',
    'showIcon'
];

export default class TreeNode extends Base<I.TreeNodeState, I.TreeNodeProps, I.TreeNodeComputed> {
    static components = {
        's-icon': Icon,
        's-checkbox': Checkbox,
        's-tree-node': 'self'
    };

    initData(): I.TreeNodeState {
        return {
            selectable: true,
            disabled: false,
            loading: false,
            hasTitle: true,
            LINE_UNIT_OFFEST_V,
            // 展开收起按钮是否被用户点击了
            isSwitcherActive: false
        };
    };

    static computed: I.TreeNodeComputed = {
        selected(this: TreeNode) {
            return getComputedKeys(this.data.get('selectedKeys'), this.data.get('key'));
        },

        checked(this: TreeNode) {
            return getComputedKeys(this.data.get('allCheckedKeys'), this.data.get('key'));
        },

        filtered(this: TreeNode) {
            return getComputedKeys(this.data.get('filteredKeys'), this.data.get('key'));
        },

        hidden(this: TreeNode) {
            return getComputedKeys(this.data.get('hiddenKeys'), this.data.get('key'));
        },

        actived(this: TreeNode) {
            return this.data.get('activeKey') === this.data.get('key');
        },

        indeterminate(this: TreeNode) {
            return getComputedKeys(this.data.get('allHalfCheckedKeys'), this.data.get('key'));
        },

        classes(this: TreeNode) {
            const expanded = this.data.get('expanded');
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');
            const checked = this.data.get('checked');
            const selected = this.data.get('selected');
            const hidden = this.data.get('hidden');
            const isVirtual = this.data.get('isVirtual');

            let classArr = [
                `${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`,
                hidden ? `${prefixCls}-treenode-hidden` : ''
            ];
            disabled && classArr.push(`${prefixCls}-treenode-disabled`);
            checked && classArr.push(`${prefixCls}-treenode-checkbox-checked`);
            selected && !disabled && classArr.push(`${prefixCls}-treenode-selected`);
            !isVirtual && classArr.push(`${prefixCls}-not-virtual`);

            return classArr;
        },

        checkboxClass(this: TreeNode) {
            const checked = this.data.get('checked');
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');

            let classArr = [`${prefixCls}-checkbox`];
            checked && classArr.push(`${prefixCls}-checkbox-checked`);
            disabled && classArr.push(`${prefixCls}-checkbox-disabled`);
            return classArr;
        },

        titleClass(this: TreeNode) {
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');
            const hasChild = this.data.get('hasChild');
            const selected = this.data.get('selected');
            const expanded = this.data.get('expanded');
            const filtered = this.data.get('filtered');
            const actived = this.data.get('actived');

            let classArr = [
                `${prefixCls}-node-content-wrapper`,
                `${prefixCls}-node-content-wrapper-${hasChild ? expanded ? 'open' : 'close' : 'normal'}`,
                filtered ? 'filter-node' : '',
                actived ? `${prefixCls}-node-content-wrapper-active` : ''
            ];
            selected && !disabled && classArr.push(`${prefixCls}-node-selected`);
            return classArr;
        },

        showExpandIcon(this: TreeNode) {
            return this.data.get('hasChild')
                || !this.data.get('isLeaf')
                && this.data.get('loadData')
                && !this.data.get('loading');
        }
    };

    treeNodes: Array<Base> = [];

    inited(): void {
        this.treeNodes = [];

        this.data.set('hasTitle', !!this.sourceSlots.named.title && this.data.get('hasTitle'));
        this.data.set('hasIcon', !!this.sourceSlots.named.icon || this.data.get('icon'));
        const treeData = this.data.get('treeData') || [];
        this.data.set('hasChild', !!treeData.length || !!this.data.get('treeNodeDataV.children.length'));

        paramArr.forEach(param => this.data.set(param, this.parentComponent!.data.get(param)));

        const switcherIcon = this.parentComponent!.data.get('switcherIcon');
        if (switcherIcon) {
            this.sourceSlots.named.switcherIcon = switcherIcon;
            this.data.set('hasSwitcherIcon', true);
            this.data.set('switcherIcon', switcherIcon);
        }

        this.dispatch('santd_tree_addTreeNode', this);

        this.watch('treeData', val => {
            this.data.set('loading', false);
            this.dispatch('santd_tree_dataLoaded', {loadedKeys: val, node: this});
        });
    };

    updated(): void {
        // 更新 hasChild
        this.data.get('treeNodeDataV')
            && this.data.set('hasChild', !!this.data.get('treeNodeDataV.children.length'));
        // 更新 expanded
        this.data.set(
            'expanded',
            this.data.get('isVirtual')
                ? this.data.get('treeNodeDataV').expanded
                : getComputedKeys(this.data.get('expandedKeys'), this.data.get('key'))
        );
        // 每次父组件有数据更新就扔给子节点一份去更新
        this.treeNodes.forEach(node => {
            paramArr.forEach(param => {
                node.data.set(param, this.data.get(param));
            });
        });
    };

    static messages = {
        santd_tree_addTreeNode(this: TreeNode, payload: I.addTreeNodePayloadType) {
            // 每个节点单独管理自己的子节点并dispatch自己到父节点上
            this.treeNodes.push(payload.value);
            if (this.treeNodes.length) {
                this.data.set('hasChild', true);
            }
        }
    };

    // 点击节点时候的事件
    handleNodeClick(e: MouseEvent): void {
        const disabled = this.data.get('rootDisabled') || this.data.get('disabled');
        const selectable = this.data.get('rootSelectable') || this.data.get('selectable');

        if (disabled || !selectable) {
            return;
        }

        this.dispatch('santd_tree_clickTreeNode', {
            event: 'select',
            nativeEvent: e,
            node: this,
            selected: this.data.get('selected'),
            key: this.data.get('key')
        });
    };

    // 点击复选框时候的事件
    handleNodeCheck(e: CheckboxChangeEvent): void {
        this.dispatch('santd_tree_checkTreeNode', {
            event: 'check',
            checked: e.target.checked,
            nativeEvent: e,
            node: this,
            treeNodeDataV: this.data.get('treeNodeDataV')
        });
    };

    // 点击收起按钮时候的事件
    handleNodeExpand(e: MouseEvent): void {
        const isLeaf = this.data.get('isLeaf');
        const key = this.data.get('key');
        const loadData = this.data.get('loadData');
        if (loadData && !this.data.get('treeData') && !isLeaf) {
            this.data.set('loading', true);
            loadData(this);
        }
        let expandedKeys = Array.from(new Set(this.data.get('expandedKeys')));
        const index = expandedKeys.indexOf(key);

        index > -1 && expandedKeys.splice(index, 1);
        index === -1 && expandedKeys.push(key);

        this.dispatch('santd_tree_expandTreeNode', {
            event: 'expand',
            expanded: this.data.get('expanded'),
            node: this,
            nativeEvent: e,
            expandedKeys,
            treeIndexV: this.data.get('treeIndexV')
        });

        this.data.set('isSwitcherActive', true);
        setTimeout(() => {
            this.data.set('isSwitcherActive', false);
        }, SWITCH_STATUS_DELAY_V);
    };

    attached(): void {
        if (this.data.get('defaultExpandAll') && this.data.get('hasChild')) {
            this.dispatch('santd_tree_expandAll', this.data.get('key'));
        }
    };

    static template = /* html */ `
        <li
            class="{{classes}}"
            style="{{'margin-left: ' + (treeNodeDataV.isEnd.length - 1) * LINE_UNIT_OFFEST_V + 'px'}}">
            <div
                s-if="showLine && isVirtual"
                class="${prefixClsV}-line
                ${prefixClsV}-{{treeNodeDataV.isEnd[treeNodeDataV.isEnd.length - 1] ? 'end' : ''}}-line"
                style="{{'height: ' + height + 'px'}}">
            </div>
            <span
                class="
                    ${prefixCls}-switcher
                    ${prefixCls}-switcher_{{showExpandIcon ? (expanded ? 'open' : 'close') : 'noop'}}
                    {{!(isVirtual && isSwitcherActive) ? '${prefixCls}-switcher-unactive' : ''}}
                "
                on-click="handleNodeExpand"
            >
                <span
                    class="${prefixCls}-switcher-{{showLine ? 'line-icon' : 'icon'}}"
                    s-if="hasSwitcherIcon && showExpandIcon">
                    <slot name="switcherIcon" var-expanded="{{expanded}}"/>
                </span>
                <s-icon type="caret-down" theme="filled" class="${prefixCls}-switcher-icon" s-else-if="showExpandIcon" />
                <s-icon type="file" class="${prefixCls}-switcher-line-icon" s-else-if="showLine" />
                <s-icon type="loading" class="${prefixCls}-switcher-loading-icon" s-if="loading" />
            </span>
            <s-checkbox
                checked="{{checked}}"
                indeterminate="{{indeterminate}}"
                s-if="{{rootCheckable ? checkable !== undefined ? checkable : true : false}}"
                disabled="{{rootDisabled || disabled || disableCheckbox}}"
                on-change="handleNodeCheck"
                s-ref="checkbox"
            />
            <span class="{{titleClass}}" on-click="handleNodeClick($event)">
                <span class="${prefixCls}-iconEle ${prefixCls}-tree-icon__customize" s-if="hasIcon && showIcon">
                    <s-icon s-if="icon" type="{{icon}}"/>
                    <slot
                        s-else
                        name="icon"
                        var-selected="{{selected}}"
                        var-expanded="{{expanded}}"
                        var-isLeaf="{{!hasChild}}">
                    </slot>
                </span>
                <span class="${prefixCls}-title">
                    <slot name="title" var-title="{{title}}" s-if="hasTitle" />
                    <fragment s-else>{{title}}</fragment>
                </span>
            </span>
            <ul class="${prefixCls}-child-tree ${prefixCls}-child-tree-{{expanded ? 'open' : 'close'}}">
                <s-tree-node
                    s-if="treeData"
                    s-for="tree in treeData"
                    filteredKeys="{{filteredKeys}}"
                    hiddenKeys="{{hiddenKeys}}"
                    selectedKeys="{{selectedKeys}}"
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
                    checkable="{{rootCheckable ? tree.checkable !== undefined ? tree.checkable : true : false}}"
                    disabled="{{rootDisabled || tree.disabled}}"
                    selectable="{{rootSelectable || tree.selectable}}"
                    loadData="{{loadData}}"
                    treeData="{{tree.children}}"
                    hasTitle="{{hasTitle}}"
                >
                    <slot name="title" slot="title" var-title="{{title}}" />
                </s-tree-node>
                <slot s-else />
            </ul>
        </li>
    `
};
