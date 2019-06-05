/**
* @file treeNode 树组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import {loopMenuItem, loopComponentList} from 'santd/core/util/findCompont';
import classNames from 'classnames';
import Icon from 'santd/icon';
const pagin = classCreator('tree');
const prefixCls = pagin();

const getComputedKeys = (targetKeys = [], key) => {
    let keysFlag = false;
    targetKeys.forEach(defKey => {
        if (defKey === key) {
            keysFlag = true;
        }
    });
    return keysFlag;
};

const defaultTitle = san.defineComponent({
    initData() {
        return {
            title: ''
        };
    },
    template: `
        <span>{{title}}</span>
    `
});

export default san.defineComponent({
    components: {
        's-icon': Icon,
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
    computed: {
        isLeaf2() {
            const isLeaf = this.data.get('isLeaf');
            const loadData = this.data.get('treeData.loadData');
            const hasChildren = this.data.get('hasChildren');
            if (isLeaf === false) {
                return false;
            }
            const res = isLeaf || (!loadData && !hasChildren);
            return res;
        },
        itemClass() {
            const expandedKeys = this.data.get('treeData.expandedKeys');
            const selectedKeys = this.data.get('treeData.selectedKeys');
            const checkedKeys = this.data.get('treeData.checkedKeys');
            const selfChecked = this.data.get('checked');
            const key = this.data.get('key');
            const disabled = this.data.get('disabled');
            const expanded = getComputedKeys(expandedKeys, key);
            const halfChecked = this.data.get('halfChecked');
            const selected = getComputedKeys(selectedKeys, key);
            const checked = this.data.get('checked') || getComputedKeys(checkedKeys, key);
            const filterTreeNode = this.data.get('isFilter');
            return classNames({
                [`${prefixCls}-treenode-disabled`]: disabled,
                [`${prefixCls}-treenode-switcher-${expanded ? 'open' : 'close'}`]: true,
                [`${prefixCls}-treenode-checkbox-checked`]: checked,
                [`${prefixCls}-treenode-checkbox-indeterminate`]: halfChecked,
                [`${prefixCls}-treenode-selected`]: selected && !disabled,
                'filter-node': filterTreeNode
            });
        },
        checkboxClass() {
            const checkedKeys = this.data.get('treeData.checkedKeys');
            const key = this.data.get('key');
            const selfChecked = this.data.get('checked');
            const checked = selfChecked !== '' ? selfChecked : getComputedKeys(checkedKeys, key);
            const halfChecked = this.data.get('halfChecked');
            const disabled = this.data.get('disabled') || this.data.get('treeData.disabled');
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
            const expandedKeys = this.data.get('treeData.expandedKeys');
            const selectedKeys = this.data.get('treeData.selectedKeys');
            const disabled = this.data.get('disabled') || this.data.get('treeData.disabled');
            const key = this.data.get('key');
            const expanded = getComputedKeys(expandedKeys, key);
            const selected = getComputedKeys(selectedKeys, key);
            return classNames({
                [`${prefixCls}-node-content-wrapper`]: true,
                [`${prefixCls}-node-content-wrapper-${expanded ? 'open' : 'close'}`]: true,
                [`${prefixCls}-node-selected`]: selected && !disabled
            });
        },
        ulChildClass() {
            const expandedKeys = this.data.get('treeData.expandedKeys');
            const key = this.data.get('key');
            const expanded = getComputedKeys(expandedKeys, key);
            return classNames({
                [`${prefixCls}-child-tree`]: true,
                [`${prefixCls}-child-tree-${expanded ? 'open' : 'close'}`]: true
            });
        },
        switcherCls() {
            const expandedKeys = this.data.get('treeData.expandedKeys');
            const key = this.data.get('key');
            const expanded = getComputedKeys(expandedKeys, key);
            return classNames({
                [`${prefixCls}-switcher`]: true,
                [`${prefixCls}-switcher_${expanded ? 'open' : 'close'}`]: true
            });
        }

    },
    initData() {
        return {
            componentPropName: 's-tree-node',
            hasChildren: false,
            checked: '',
            children: [],
            checkedNodes: [],
            halfCheckedNodes: [],
            nodeChildren: [],
            loading: false,
            selectable: true
        };
    },
    compiled() {
        const titles = this.findTargetCompo('customTitle');
        this.components.autotitle = titles || defaultTitle;
        this.components.switchericon = this.findTargetCompo('switcherIcon');
        this.components.treenodeicon = this.findTargetCompo('treeNodeIcon');
    },
    inited() {
        this.child = [];
        this.checkedNodes = [];
        this.halfCheckedNodes = [];
        this.flag = true;
    },
    created() {
        this.watch('treeData', data => {
            // 先设置为空，防止chekedNodes累加
            this.data.set('checkedNodes', []);
            this.child.forEach(child => {
                child.data.set('treeData', data);
            });
            this.updateTreeNode();
        });
    },
    updateTreeNode() {
        const {expandedKeys, selectedKeys, checkedKeys, filterTreeNode} = this.data.get('treeData');
        const key = this.data.get('key');
        const expanded = getComputedKeys(expandedKeys, key);
        this.data.set('checked', '');
        // 赋值给icon用
        this.data.set('expanded', expanded);
        // 处理 CheckedKeys
        this.setPropsOfCheckedkeys();
        if (typeof filterTreeNode === 'function') {
            this.data.set('isFilter', filterTreeNode(this));
        }
    },

    setPropsOfCheckedkeys() {
        const updateCheckState = this.treeCheckStateManage();
        this.dispatch('checkedNodesUpdate', updateCheckState);
    },
    attached() {
        this.dispatch('treeNodeComplete', this);
        setTimeout(() => {
            const showIcon = this.data.get('treeData.showIcon');
            const Icon = this.data.get('icon');
            const ref = this.ref('titleIconRef');
            if (showIcon && ref && typeof Icon === 'function') {
                ref.innerHTML = '';
                const renderer = new Icon();
                renderer.attach(ref);
                renderer.parentComponent = this;
            }
        }, 0);

    },
    findTargetCompo(compoName) {
        let tar = this.parentComponent.data.get(compoName);
        let parent = this.parentComponent;
        while (parent && !tar) {
            parent = parent.parentComponent;
            tar = parent && parent.data.get(compoName) || '';
        }
        return tar;
    },
    // handleCheck() {
    //     const changeData = this.data.get('checkedChange');
    //     const children = this.data.get('children');
    //     children.forEach(child => {
    //         child.data.set('checked', changeData.checked);
    //     });
    // },
    messages: {
        treeNodeComplete(comp) {
            this.child.push(comp.value);
            if (!comp.value.data.get('disabled')) {
                this.data.push('children', comp.value);
            }
            this.data.set('hasChildren', true);
        },
        checkedNodesUpdate(updataValue) {
            const value = updataValue.value;
            const key = this.data.get('key');
            if (value.checked) {
                this.data.push('checkedNodes', updataValue.target);
            }
            if (value.halfChecked) {
                this.data.push('halfCheckedNodes', updataValue.target);
            }
        },
        allLoopCheckState(resData) {
            let nodes = this.data.get('checkedNodes');
            const disabled = this.data.get('disabled');
            const {data, compo} = resData.value;
            let findItemIndex = null;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i] === compo) {
                    findItemIndex = i;
                }
            }
            findItemIndex === null
                ? data.checked === true ? this.data.push('checkedNodes', compo) : null
                : this.data.splice('checkedNodes', [findItemIndex, 1]);
            if (!disabled) {
                this.itemCheckedFn(data);
            }
        },
        saveComponentData(data) {
            const value = data.value;

        }
    },

    // 点击switcher
    onExpand(e) {
        const children = this.data.get('children');
        const expanded = this.data.get('expanded');
        this.dispatch('switcherExpand', {compo: this, key: this.data.get('key')});
        this.dispatch('onNodeExpand', {compo: this, expanded: !expanded});
        this.dispatch('expandedChange', e);
    },
    onItemClick(e) {
        // 点击具体条目
        const isTreeSelect = this.data.get('treeData.isTreeSelect');
        const multiple = this.data.get('treeData.multiple');
        const disabled = this.data.get('disabled');
        const selectable = this.data.get('selectable');
        if (isTreeSelect) {
            this.handleCheckClick();
            return false;
        }
        if (disabled || !selectable) {
            return false;
        }
        const isDirectory = this.data.get('treeData.isDirectory');
        const onClick = this.data.get('treeData.onClick');
        if (isDirectory && onClick) {
            onClick(e, this);
            return false;
        }
        if (multiple) {
            this.dispatch('multipleItemClick', this);
        } else {
            // 单选
            this.dispatch('singleItemClick', this);
        }
    },

    /**
    * 处理checked点击
    * @param {Object} event对象
    */
    handleCheckClick(evt) {
        const disabled = this.data.get('disabled') || this.data.get('treeData.disabled');
        const disableCheckbox = this.data.get('disableCheckbox');
        const checkStrictly = this.data.get('treeData.checkStrictly');
        let childrenCompo = [];
        if (disabled) {
            return false;
        }
        if (!disableCheckbox) {
            this.data.set('checked', !this.data.get('checked'));
            if (!checkStrictly) {
                this.data.set('checkedNodes', []);
                this.itemCheckedFn();
                this.loopChildChecked(this.data.get('checked'));
            }
            this.dispatch('checkedChange', evt);
        }
    },
    itemCheckedFn(data) {
        const resultData = this.treeCheckStateManage(data);
        if (!resultData.strictly) {
            this.dispatch('allLoopCheckState', {data: resultData, compo: this});
        }
    },

    /**
    * 向下递归子组件状态
    * @param {boolean} 当前组件的选中状态
    *
    */
    loopChildChecked(checked) {
        const children = this.data.get('children');
        function loop(children) {
            children.forEach(child => {
                if (child.data.get('children').length) {
                    loop(child.data.get('children'), checked);
                }
                child.data.set('checked', checked);
            });
        }
        return loop(children, checked);
    },

    /**
    * 处理checkedKeys
    * @param {Object} 传入处理好的checked状态
    *
    * @return {Object}
    */
    treeCheckStateManage(data = {}) {
        const checkedKeys = this.data.get('treeData.checkedKeys');
        const key = this.data.get('key');
        const title = this.data.get('title');
        const checked = data.checked !== undefined ?  data.checked : this.data.get('checked');
        let isChecked = checked !== ''
            ? checked
            : getComputedKeys(checkedKeys, key);
        const checkedNodes = this.data.get('checkedNodes') || [];
        const children = this.data.get('children');
        const disabled = this.data.get('disabled');
        const checkStrictly = this.data.get('treeData.checkStrictly');
        let halfChecked = data.halfChecked || false;
        let strictly = false;
        const exchangeData = [];
        if (!checkStrictly) {
            if (checkedNodes.length && checkedNodes.length === children.length) {
                isChecked = true;
            } else if ((checkedNodes.length) && !disabled) {
                halfChecked = true;
                isChecked = false;
            } else if (disabled) {
                strictly = true; // 如果用严格模式，父子组件间不进行关联
            }
            if (isChecked && !disabled) {
                // 如果选中，需要让子组件也选中
                this.data.set('checkedNodes', children);
                children.forEach(child => {
                    child.data.set('checked', isChecked);
                });
            }
        }
        this.data.set('checked', isChecked);
        this.data.set('halfChecked', halfChecked);
        return {checked: isChecked, halfChecked, strictly};
    },
    syncLoadData() {

    },
    template: `
        <li class="{{itemClass}}">
            <!--switcher-->
            <span
                s-if="!isLeaf2"
                class="{{switcherCls}}"
                on-click="onExpand($event)"
            >
                <s-icon s-if="treeData.showLine" type="{{expanded ? 'minus-square' : 'plus-square'}}"></s-icon>
                <span s-else class="${prefixCls}-switcher-icon">
                    <s-icon s-if="loading" type="loading"></s-icon>
                    <switchericon s-else-if="treeData.switcherIcon"/>

                    <s-icon s-else type="caret-down" theme="filled"></s-icon>
                </span>
            </span>
            <span s-else-if="isLeaf2" class="${prefixCls}-switcher ${prefixCls}-switcher-noop">
                <s-icon s-if="treeData.showLine" type="file" class="${prefixCls}-switcher-line-icon"></s-icon>
            </span>
            <!--checkbox-->
            <span s-if="treeData.checkable" class="{{checkboxClass}}" on-click="handleCheckClick($event)">
                <span class="${prefixCls}-checkbox-inner"></span>
            </span>
            <!--icon+title-->
            <span class="{{iconTitleClass}}" on-click="onItemClick($event)">
                <span s-ref="titleIconRef">
                    <treenodeicon isLeaf="{{isLeaf2}}" expanded="{{expanded}}"></treenodeicon>
                </span>
                <span class="${prefixCls}-title" s-ref="autoTitleRef">
                    <autotitle title="{{title}}" searchValue="{{treeData.searchValue}}"></autotitle>
                </span>
            </span>
            <ul class="{{ulChildClass)}}">
                <s-tree-node
                    s-if="nodeChildren && treeNodeData"
                    s-for="child in nodeChildren"
                    treeData="{{treeData}}"
                    treeNodeData="{{treeNodeData}}"
                    nodeChildren="{{child.children}}"
                    title="{{child.title}}"
                    value="{{child.value}}"
                    key="{{child.key}}"
                    isLeaf="{{child.isLeaf}}"
                    disableCheckbox="{{child.disableCheckbox}}"
                    disabled="{{child.disabled}}"
                    selectable="{{child.selectable}}"
                >
                </s-tree-node>
                <slot s-else></slot>
            </ul>
        </li>
    `
});
