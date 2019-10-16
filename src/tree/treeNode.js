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
    'switcherIcon',
    'defaultExpandAll',
    'autoExpandParent',
    'showLine'
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
            loading: false
        };
    },
    computed: {
        selected() {
            return getComputedKeys(this.data.get('selectedKeys'), this.data.get('key'));
        },

        expanded() {
            return getComputedKeys(this.data.get('expandedKeys'), this.data.get('key'));
        },

        checked() {
            return getComputedKeys(this.data.get('checkedKeys'), this.data.get('key'));
        },

        indeterminate() {
            return getComputedKeys(this.data.get('halfCheckedKeys'), this.data.get('key'));
        },

        classes() {
            const expanded = this.data.get('expanded');
            const disabled = this.data.get('disabled');
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
            const disabled = this.data.get('disabled');

            let classArr = [`${prefixCls}-checkbox`];
            checked && classArr.push(`${prefixCls}-checkbox-checked`);
            disabled && classArr.push(`${prefixCls}-checkbox-disabled`);
            return classArr;
        },

        titleClass() {
            const disabled = this.data.get('disabled');
            const hasChild = this.data.get('hasChild');
            const selected = this.data.get('selected');
            const expanded = this.data.get('expanded');
            const checkable = this.data.get('checkable');

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

        this.data.set('hasTitle', !!this.sourceSlots.named.title);
        this.data.set('hasIcon', !!this.sourceSlots.named.icon);
        const slots = this.sourceSlots;
        this.data.set('hasChild', !!(slots.noname && slots.noname.filter(slot => !slot.textExpr).length));
        paramArr.forEach((param) => {
            this.data.set(param, this.parentComponent.data.get(param));
        });
        const switcherIcon = this.parentComponent.data.get('switcherIcon');
        if (switcherIcon) {
            this.sourceSlots.named.switcherIcon = switcherIcon;
            this.data.set('hasSwitcherIcon', true);
        }

        this.dispatch('santd_tree_addTreeNode', this);

        this.watch('treeData', val => {
            this.data.set('loading', false);
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
        },
        santd_tree_checkTreeNode(payload) {
            const key = this.data.get('key');
            const disabled = this.data.get('disabled');
            let checkedKeys = payload.value.checkedKeys;
            let halfCheckedKeys = payload.value.halfCheckedKeys;
            const checkedIndex = checkedKeys.indexOf(key);
            const halfCheckedIndex = halfCheckedKeys.indexOf(key);
            let treeNodes = this.treeNodes.filter(node => !node.data.get('disabled'));
            let allChildChecked = treeNodes.every(node => checkedKeys.includes(node.data.get('key')));

            // 判断checked的情况
            allChildChecked && !disabled && checkedIndex === -1 && checkedKeys.push(key);
            !allChildChecked && !disabled && checkedIndex > -1 && checkedKeys.splice(checkedIndex, 1);

            // 判断半选的情况
            !allChildChecked && treeNodes.length !== 1 && halfCheckedIndex === -1 && halfCheckedKeys.push(key);
            (treeNodes.every(node => {
                const key = node.data.get('key');
                return !checkedKeys.includes(key) && !halfCheckedKeys.includes(key);
            }) || allChildChecked)
                && halfCheckedIndex > -1
                && treeNodes.length !== 1
                && halfCheckedKeys.splice(halfCheckedIndex, 1);

            this.dispatch('santd_tree_checkTreeNode', {...payload.value, checkedKeys, halfCheckedKeys});
        },
        santd_tree_expandTreeNode(payload) {
            const key = this.data.get('key');
            let expandedKeys = payload.value.expandedKeys;
            let childExpanded = this.treeNodes.some(node => expandedKeys.includes(node.data.get('key')));
            const index = expandedKeys.indexOf(key);

            childExpanded && index === -1 && expandedKeys.push(key);
            this.dispatch('santd_tree_expandTreeNode', {...payload.value, expandedKeys});
        }
    },
    handleNodeClick(e) {
        const disabled = this.data.get('disabled');
        const selectable = this.data.get('selectable') || this.data.get('rootSelecable');

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

    handleNodeExpand(e) {
        const key = this.data.get('key');
        const loadData = this.data.get('loadData');
        if (loadData && !this.data.get('treeData')) {
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

    updateChildCheck(treeNodes, checkedKeys, checked) {
        treeNodes.filter(node => !node.data.get('disabled')).forEach(node => {
            const key = node.data.get('key');
            const index = checkedKeys.indexOf(key);

            !checkedKeys.includes(key) && checked && checkedKeys.push(key);
            checkedKeys.includes(key) && !checked && checkedKeys.splice(index, 1);
            node.treeNodes && node.treeNodes.length && this.updateChildCheck(node.treeNodes, checkedKeys, checked);
        });
        return checkedKeys;
    },

    updateChildHalfCheck(treeNodes, halfCheckedKeys) {
        treeNodes.filter(node => {
            return !node.data.get('disabled');
        }).forEach(node => {
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
        let expandedKeys = this.data.get('expandedKeys');

        if (checkedKeys.includes(key)) {
            const hasChild = this.data.get('hasChild');
            if (hasChild && !this.data.get('disabled')) {
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

        if (expandedKeys.includes(key)) {
            this.nextTick(() => {
                this.dispatch('santd_tree_expandTreeNode', {
                    event: 'init',
                    expandedKeys: expandedKeys.concat()
                });
            });
        }

        if (this.data.get('defaultExpandAll') && this.data.get('hasChild')) {
            this.dispatch('santd_tree_expandAll', key);
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
                s-if="{{checkable || rootCheckable}}"
                disabled="{{disabled || disableCheckbox}}"
                on-change="handleNodeCheck"
                s-ref="checkbox"
            />
            <span class="{{titleClass}}" on-click="handleNodeClick($event)">
                <span class="${prefixCls}-iconEle ${prefixCls}-tree-icon__customize" s-if="hasIcon">
                    <slot name="icon" var-selected="{{selected}}" />
                </span>
                <span class="${prefixCls}-title">
                    <slot name="title" s-if="hasTitle" var-searchValue="{{treeData.searchValue}}" />
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
                />
                <slot s-else />
            </ul>
        </li>
    `
});
