/**
* @file treeNode 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Checkbox from '../checkbox';
const prefixCls = classCreator('tree')();

const getComputedKeys = (targetKeys = [], key) => {
    let keysFlag = false;
    targetKeys.forEach(defKey => {
        if (defKey === key) {
            keysFlag = true;
        }
    });
    return keysFlag;
};

let paramArr = [
    'selectedKeys',
    'expandedKeys',
    'checkedKeys',
    'halfCheckedKeys',
    'rootCheckable',
    'rootSelecable',
    'rootDisabled',
    'switcherIcon',
    'defaultExpandAll',
    'autoExpandParent',
    'showLine',
    'showIcon'
];

export default san.defineComponent({
    components: {
        's-icon': Icon,
        's-checkbox': Checkbox,
        's-tree-node': 'self'
    },

    dataTypes: {
        disableCheckbox: DataTypes.bool,
        disabled: DataTypes.bool,
        icon: DataTypes.any,
        isLeaf: DataTypes.bool,
        key: DataTypes.string,
        selectable: DataTypes.bool,
        title: DataTypes.any
    },

    initData() {
        return {
            selectable: true,
            disabled: false,
            loading: false,
            hasTitle: true
        };
    },

    computed: {
        selected() {
            return getComputedKeys(this.data.get('selectedKeys'), this.data.get('key'));
        },

        expanded() {
            return getComputedKeys(this.data.get('expandedKeys'), this.data.get('key')) || this.data.get('showExpand');
        },

        checked() {
            return getComputedKeys(this.data.get('checkedKeys'), this.data.get('key'));
        },

        indeterminate() {
            return getComputedKeys(this.data.get('halfCheckedKeys'), this.data.get('key'));
        },

        classes() {
            const expanded = this.data.get('expanded');
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');
            const checked = this.data.get('checked');
            const selected = this.data.get('selected');

            let classArr = [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`];
            disabled && classArr.push(`${prefixCls}-treenode-disabled`);
            checked && classArr.push(`${prefixCls}-treenode-checkbox-checked`);
            selected && !disabled && classArr.push(`${prefixCls}-treenode-selected`);
            return classArr;
        },

        checkboxClass() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');

            let classArr = [`${prefixCls}-checkbox`];
            checked && classArr.push(`${prefixCls}-checkbox-checked`);
            disabled && classArr.push(`${prefixCls}-checkbox-disabled`);
            return classArr;
        },

        titleClass() {
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');
            const hasChild = this.data.get('hasChild');
            const selected = this.data.get('selected');
            const expanded = this.data.get('expanded');

            let classArr = [
                `${prefixCls}-node-content-wrapper`,
                `${prefixCls}-node-content-wrapper-${hasChild ? expanded ? 'open' : 'close' : 'normal'}`
            ];
            selected && !disabled && classArr.push(`${prefixCls}-node-selected`);
            return classArr;
        },

        showExpandIcon() {
            return this.data.get('hasChild')
                || !this.data.get('isLeaf')
                && this.data.get('loadData')
                && !this.data.get('loading');
        }
    },

    inited() {
        this.treeNodes = [];

        this.data.set('hasTitle', !!this.sourceSlots.named.title && this.data.get('hasTitle'));
        this.data.set('hasIcon', !!this.sourceSlots.named.icon);
        const treeData = this.data.get('treeData') || [];
        this.data.set('hasChild', !!treeData.length);

        paramArr.forEach((param) => {
            this.data.set(param, this.parentComponent.data.get(param));
        });

        const switcherIcon = this.parentComponent.data.get('switcherIcon');
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
    },

    updated() {
        // 每次父组件有数据更新就扔给子节点一份去更新
        this.treeNodes.forEach(node => {
            paramArr.forEach(param => {
                node.data.set(param, this.data.get(param));
            });
        });
    },

    messages: {
        santd_tree_addTreeNode(payload) {
            // 每个节点单独管理自己的子节点并dispatch自己到父节点上
            this.treeNodes.push(payload.value);
            if (this.treeNodes.length) {
                this.data.set('hasChild', true);
            }
        },
        // 处理复选框点击时候的情况，自己完成之后扔给父级继续处理
        santd_tree_checkTreeNode(payload) {
            const key = this.data.get('key');
            const disabled = this.data.get('rootDisabled') || this.data.get('disabled');
            let checkedKeys = payload.value.checkedKeys;
            let halfCheckedKeys = payload.value.halfCheckedKeys;
            const checkedIndex = checkedKeys.indexOf(key);
            const halfCheckedIndex = halfCheckedKeys.indexOf(key);
            let treeNodes = this.treeNodes.filter(node => !this.data.get('rootDisabled') && !node.data.get('disabled'));
            let allChildChecked = treeNodes.every(node => checkedKeys.includes(node.data.get('key')));

            // 判断checked的情况
            allChildChecked && !disabled && checkedIndex === -1 && checkedKeys.push(key);
            !allChildChecked && !disabled && checkedIndex > -1 && checkedKeys.splice(checkedIndex, 1);

            // 判断半选的情况
            !allChildChecked && !disabled && treeNodes.length !== 1 && halfCheckedIndex === -1 && halfCheckedKeys.push(key);
            (treeNodes.every(node => {
                const key = node.data.get('key');
                return !checkedKeys.includes(key) && !halfCheckedKeys.includes(key);
            }) || allChildChecked)
                && halfCheckedIndex > -1
                && treeNodes.length !== 1
                && halfCheckedKeys.splice(halfCheckedIndex, 1);

            this.dispatch('santd_tree_checkTreeNode', {...payload.value, checkedKeys, halfCheckedKeys});
        }
    },

    // 点击节点时候的事件
    handleNodeClick(e) {
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
    },

    // 点击复选框时候的事件
    handleNodeCheck(e) {
        const checked = e.target.checked;
        const key = this.data.get('key');
        let checkedKeys = this.data.get('checkedKeys').concat();
        const index = checkedKeys.indexOf(key);
        const hasChild = this.data.get('hasChild');
        let halfCheckedKeys = this.data.get('halfCheckedKeys').concat();

        !checked && index > -1 && checkedKeys.splice(index, 1);
        checked && index === -1 && checkedKeys.push(key);

        if (hasChild) {
            halfCheckedKeys.splice(halfCheckedKeys.indexOf(key), 1);
            checkedKeys = this.updateChildCheck(this.treeNodes, checkedKeys, checked);
            halfCheckedKeys = this.updateChildHalfCheck(this.treeNodes, halfCheckedKeys);
        }

        this.dispatch('santd_tree_checkTreeNode', {
            event: 'check',
            checked: this.data.get('checked'),
            nativeEvent: e,
            node: this,
            checkedKeys,
            halfCheckedKeys
        });
    },

    // 点击收起按钮时候的事件
    handleNodeExpand(e) {
        const isLeaf = this.data.get('isLeaf');
        const key = this.data.get('key');
        const loadData = this.data.get('loadData');
        if (loadData && !this.data.get('treeData') && !isLeaf) {
            this.data.set('loading', true);
            loadData(this);
        }
        let expandedKeys = this.data.get('expandedKeys').concat();
        const index = expandedKeys.indexOf(key);

        index > -1 && expandedKeys.splice(index, 1);
        index === -1 && expandedKeys.push(key);

        this.dispatch('santd_tree_expandTreeNode', {
            event: 'expand',
            expanded: this.data.get('expanded'),
            node: this,
            nativeEvent: e,
            expandedKeys
        });
    },

    // 当点击父节点时打开或关闭所有子节点的checkbox
    updateChildCheck(treeNodes, checkedKeys, checked) {
        treeNodes.filter(node => !this.data.get('rootDisabled') && !node.data.get('disabled')).forEach(node => {
            const key = node.data.get('key');
            const index = checkedKeys.indexOf(key);

            !checkedKeys.includes(key) && checked && checkedKeys.push(key);
            checkedKeys.includes(key) && !checked && checkedKeys.splice(index, 1);
            node.treeNodes && node.treeNodes.length && this.updateChildCheck(node.treeNodes, checkedKeys, checked);
        });
        return checkedKeys;
    },

    // 当父节点的状态改变，处理所有子节点的半选状态
    updateChildHalfCheck(treeNodes, halfCheckedKeys) {
        treeNodes.filter(node => !this.data.get('rootDisabled') && !node.data.get('disabled')).forEach(node => {
            const key = node.data.get('key');
            const index = halfCheckedKeys.indexOf(key);

            halfCheckedKeys.includes(key) && halfCheckedKeys.splice(index, 1);

            node.treeNodes && node.treeNodes.length && this.updateChildHalfCheck(node.treeNodes, halfCheckedKeys);
        });
        return halfCheckedKeys;
    },

    attached() {
        const key = this.data.get('key');
        let checkedKeys = this.data.get('checkedKeys');

        if (checkedKeys.includes(key)) {
            const hasChild = this.data.get('hasChild');
            if (hasChild && !this.data.get('rootDisabled') && !this.data.get('disabled')) {
                checkedKeys = this.updateChildCheck(this.treeNodes, checkedKeys, true);
            }
            this.nextTick(() => {
                this.dispatch('santd_tree_checkTreeNode', {
                    event: 'init',
                    checkedKeys: checkedKeys.concat(),
                    halfCheckedKeys: this.data.get('halfCheckedKeys').concat()
                });
            });
        }

        if (this.data.get('defaultExpandAll') && this.data.get('hasChild')) {
            this.dispatch('santd_tree_expandAll', this.data.get('key'));
        }
    },

    template: `
        <li class="{{classes}}">
            <span
                class="${prefixCls}-switcher ${prefixCls}-switcher_{{showExpandIcon ? expanded ? 'open' : 'close' : 'noop'}}"
                on-click="handleNodeExpand"
            >
                <span class="${prefixCls}-switcher-{{showLine ? 'line-icon' : 'icon'}}" s-if="hasSwitcherIcon && showExpandIcon">
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
                    <slot name="icon" var-selected="{{selected}}" var-expanded="{{expanded}}" var-isLeaf="{{!hasChild}} "/>
                </span>
                <span class="${prefixCls}-title">
                    <slot name="title" var-title="{{title}}" s-if="hasTitle" />
                    <template s-else>{{title}}</template>
                </span>
            </span>
            <ul class="${prefixCls}-child-tree ${prefixCls}-child-tree-{{expanded ? 'open' : 'close'}}">
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
});
