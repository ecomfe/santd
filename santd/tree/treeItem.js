/**
* @file treeItem.js
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import {
    findComponentUpward,
    recursiveAllComponents,
    findAllCompUpward
} from 'santd/core/util/findCompont';
import Icon from 'santd/icon';
const pagin = classCreator('tree');
const prefixCls = pagin();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        icon: DataTypes.string,
        key: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        title: DataTypes.string
    },
    components: {
        's-icon': Icon,
        's-tree-item': 'self'
    },
    computed: {
        itemClass() {
            const disabled = this.data.get('disabled'); // 不可点击
            const expanded = this.data.get('expanded');
            const checked = this.data.get('checked'); // 是否已选中
            const halfChecked = this.data.get('halfChecked');
            const selected = this.data.get('selected'); // 是否被选中
            const loading = this.data.get('loading'); // 是否在loading
            return classNames({
                [`${prefixCls}-treenode-disabled`]: disabled,
                [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]: true,
                [`${prefixCls}-treenode-checkbox-checked`]: checked,
                [`${prefixCls}-treenode-checkbox-indeterminate`]: halfChecked,
                [`${prefixCls}-treenode-selected`]: selected,
                [`${prefixCls}-treenode-loading`]: loading,
            });
        },
        leafone() {
            const expanded = this.data.get('expanded');
            return classNames({
                [`${prefixCls}-switcher`]: true,
                [`${prefixCls}-switcher_${expanded ? 'open' : 'close'}`]: true
            });
        },
        leaftwo() {
            return classNames({
                [`${prefixCls}-switcher`]: true,
                [`${prefixCls}-switcher-noop`]: true

            });
        },
        // checkbox class
        checkboxClass() {
            const checked = this.data.get('checked'); // 是否被选中
            const halfChecked = this.data.get('halfChecked'); // 有的被选中
            const disabled = this.data.get('disabled');
            const disableCheckbox = this.data.get('disableCheckbox');
            return classNames({
                [`${prefixCls}-checkbox`]: true,
                [`${prefixCls}-checkbox-checked`]: checked,
                [`${prefixCls}-checkbox-indeterminate`]: (!checked && halfChecked),
                [`${prefixCls}-checkbox-disabled`]: (disabled || disableCheckbox)
            });
        },
        // icon + title
        iconTitleClass() {
            const expanded = this.data.get('expanded');
            const selected = this.data.get('selected');
            return classNames({
                [`${prefixCls}-node-content-wrapper`]: true,
                [`${prefixCls}-node-content-wrapper-${expanded ? 'open' : 'close'}`]: true,
                [`${prefixCls}-node-selected`]: selected
            });
        },
        // 子ul
        ulChildClass() {
            const expanded = this.data.get('expanded');
            return classNames({
                [`${prefixCls}-child-tree`]: true,
                [`${prefixCls}-child-tree-${expanded ? 'open' : 'close'}`]: true
            });
        }
    },
    initData() {
        return {
            componentPropName: 's-tree-item',
            // 默认子菜单不显示
            expanded: false,
            selected: false
        };
    },
    inited() {
        this.watch('defaultCheckedKeys', value => {
            if (value && value.length && this.data.get('checkable')) {
                value.forEach(item => {
                    if (this.data.get('data').key === item) {
                        // 如果对应上了，则执行click逻辑,
                        this.nextTick(() => {
                            this.checkboxClick();
                        });
                    }
                });
            }
        });

    },
    attached() {
        // 在同步的时候，会执行这里
        const defaultExpandAll = this.data.get('defaultExpandAll');
        if (defaultExpandAll) {
            // 打开所有的树节点
            this.data.set('expanded', true);
        }
        if (this.data.get('defaultExpandedKeys') || this.data.get('expandedKeys')) {
            this.data.set('expanded', this.data.get('data').expanded);
        }
        // 处理进来的defaultCheckedKeys。
        let defaultCheckedKeys = this.data.get('defaultCheckedKeys');
        if (defaultCheckedKeys && defaultCheckedKeys.length) {
            defaultCheckedKeys.forEach(item => {
                if (this.data.get('data').key === item) {
                    // 如果对应上了，则执行click逻辑,
                    this.nextTick(() => {
                        this.checkboxClick('show');
                    });
                }
            });
        }
        // 还需要在动态添加数据时处理checked逻辑
        this.nextTick(() => {
            this.searchParentUpward();
        });
    },
    updated() {

    },
    changeCollapse(e) {
        e.stopPropagation();
        // 如果是点击时异步获取数据
        const loadData = this.data.get('loadData');
        const expanded = this.data.get('expanded');
        const isAlreadyLoading = this.data.get('isAlreadyLoading');
        // 如果已加载了后，再次展开的话，就不应该再次请求
        if (this.data.get('data').children && loadData && !isAlreadyLoading) {
            this.dispatch('loadingData', this.data.get('data'));
            this.data.set('loading', true);
            this.data.set('isAlreadyLoading', true);
        }
        this.data.set('expanded', !this.data.get('expanded'));
        // 需要知道哪些没有折叠
        this.dispatch('changeCollapse');
    },
    checkboxClick(state) {
        let fireSelectData = [];
        if (state !== 'show' && this.data.get('disabled')) {
            return false;
        }
        // 要首先找到下面的所有组件，如果有子孙组件，把所有的子孙组件选中，
        // 然后还要往上找对应的父组件，再向下找所有的子组件（只找子组件即可），如果所有的子组件都为选中状态，则选中
        // 当前的组件肯定是选中状态
        this.data.set('checked', !this.data.get('checked'));
        // 如果有 checkStrictly 属性，那么父子间不会产生关联
        if (this.data.get('checkStrictly')) {
            const rootItem = findComponentUpward(this, 's-tree');
            if (rootItem) {
                const itemList = recursiveAllComponents(rootItem.children, 's-tree-item');
                if (itemList && itemList.length) {
                    itemList.forEach(item => {
                        if (item.data.get('checked')) {
                            fireSelectData.push(item.data.get('data').key);
                        }
                    });
                }
            }
            this.dispatch('checkedSelected', fireSelectData);
            return false;
        }
        /*第一步，找这个组件的所有子孙组件*/
        const childList = recursiveAllComponents(this.children, 's-tree-item');
        childList.forEach(item => {
            if (state !== 'show' && item.data.get('data').disabled) {
                return false;
            }
            item.data.set('checked', this.data.get('checked'));
            this.data.set('halfChecked', false);
            item.data.set('halfChecked', false);
        });

        if (state !== 'show') {
            /*第二步，找到这个组件的所有父父父...组件,并更改check状态*/

            const resStatus = this.searchParentUpward(fireSelectData);
            if (resStatus) {
                const resSelectArray = Array.from(new Set(fireSelectData));
                this.dispatch('checkedSelected', resSelectArray);
            }
        }
    },
    searchParentUpward(selectData) {
        const upupParent = findAllCompUpward(this, 's-tree-item');
        // 如果是点击的最上层组件，那么需要知道是否checked
        if (selectData && !upupParent.length) {
            if (this.data.get('checked')) {
                this.dispatch('getAllKeys');
            } else {
                this.dispatch('clearAllKeys');
            }
            return false;
        } else if (upupParent && upupParent.length) {
            selectData = selectData || [];
            upupParent.forEach(parent => {
                let checkNum = 0;
                let disableNum = 0;
                let parentAllChild = recursiveAllComponents(parent.children, 's-tree-item');
                if (parentAllChild && parentAllChild.length) {
                    parentAllChild.forEach(item => {
                        if (item.data.get('checked')) {
                            selectData.push(item.data.get('data').key);
                        }
                        if (item.data.get('checked') && !item.data.get('data').disabled) {
                            checkNum++;
                        }
                        if (item.data.get('data').disabled ) {
                            disableNum++;
                        }
                    });
                    if (checkNum === parentAllChild.length - disableNum) {
                        parent.data.set('checked', true);
                        parent.data.set('halfChecked', false);
                    } else if (checkNum === 0) {
                        parent.data.set('checked', false);
                        parent.data.set('halfChecked', false);
                    } else {
                        parent.data.set('checked', false);
                        parent.data.set('halfChecked', true);
                    }
                    // 把顶层的数据push
                    if (parent.data.get('checked')) {
                        selectData.push(parent.data.get('data').key)
                    }
                }
            });
            return true;
        }
    },

    onSelectorClick() {
        // 点击tree中的文字部分(非chekbox部分)
        if (this.data.get('checkable')) {
            // 需要点击node部分，checkbox进行联动
            this.checkboxClick();
            return;
        }
        let selectors = [];
        // 要先把所有的item-selected效果删除
        const tree = findComponentUpward(this, 's-tree');
        const allItem = recursiveAllComponents(tree.children, 's-tree-item');
        if (!this.data.get('disabled')) {
            // this.data.set('selected', !this.data.get('selected'));
            // 如果不可多选
            if (!this.data.get('multiple')) {
                allItem.forEach(item => {
                    item.data.set('selected', false);
                });
                this.data.set('selected', !this.data.get('selected'));
                // 把选择的数据key dispatch出去
                const key = this.data.get('data').key;
                this.dispatch('selectedKey', [key]);
            } else {
                // 如果可以多个select可选
                allItem.forEach(item => {
                    if (item.data.get('selected')) {
                        selectors.push(item.data.get('data').key);
                    }
                });
                this.dispatch('selectedKey', selectors);
            }
        }
    },
    template: `
        <li class="{{itemClass}}">

            <span
                s-if="{{data.children}}"
                class="{{leafone}}"
                on-click="changeCollapse($event)"
            >
                <s-icon
                    s-if="{{showLine && expanded}}"
                    type="minus-square"
                    class="${prefixCls}-switcher-icon"
                ></s-icon>
                <s-icon
                    s-else-if="{{showLine && !expanded}}"
                    type="plus-square"
                    class="${prefixCls}-switcher-icon"
                ></s-icon>
                <s-icon s-else-if="{{loading}}" type="loading"></s-icon>
                <s-icon s-else type="caret-down" class="${prefixCls}-switcher-icon"></s-icon>
            </span>
            <span s-else class="{{leaftwo}}">
                <s-icon s-if="{{showLine}}" type="file"></s-icon>
            </span>
            <!--checkbox部分-->
            <span s-if="{{checkable}}" class="{{checkboxClass}}" on-click="checkboxClick">
                <span class="${prefixCls}-checkbox-inner"></span>
            </span>
            <span class="{{iconTitleClass}}" on-click="onSelectorClick">
                <s-icon s-if="{{icon}}" type="{{icon}}"></s-icon>
                <span class="${prefixCls}-title">{{data.title}}</span>
            </span>
            <ul class="{{ulChildClass)}}">
                <s-tree-item
                    s-for="item in data.children"
                    data="{{item}}"
                    checkable="{{checkable}}"
                    defaultExpandAll="{{defaultExpandAll}}"
                    defaultCheckedKeys="{{defaultCheckedKeys}}"
                    disabled="{{disabled || item.disabled}}"
                    checkStrictly="{{checkStrictly}}"
                    multiple="{{multiple}}"
                    expandedKeys="{{expandedKeys}}"
                    defaultSelectedKeys="{{defaultSelectedKeys}}"
                    selectedKeys="{{selectedKeys}}"
                    icon="{{item.icon}}"
                    showLine="{{showLine}}"
                    loadData="{{loadData}}"
                    selected="{{item.selected}}"
                ></s-tree-item>
            </ul>

        </li>
    `
});
