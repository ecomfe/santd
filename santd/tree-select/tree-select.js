/**
 * @file tree-select 树选中组件
 * @author fuqiangqiang <fuqiangqiang@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import Icon from '../icon';
import Tree from '../tree';
import SingleSelector from './selector/single-selector';
import MultipleSelector from './selector/multiple-selector';
import SelectTrigger from './select-trigger';
import './style/index';
const prefixCls = classCreator('select')();
let tmpCount = 0;

export default san.defineComponent({
    dataTypes: {
        allowClear: DataTypes.bool,
        treeData: DataTypes.array,
        autoClearSearchValue: DataTypes.bool,
        defaultValue: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        disabled: DataTypes.bool,
        dropdownClassName: DataTypes.string,
        dropdownMatchSelectWidth: DataTypes.bool,
        dropdownStyle: DataTypes.object,
        filterTreeNode: DataTypes.func,
        labelInValue: DataTypes.bool,
        maxTagCount: DataTypes.number,
        maxTagPlaceholder: DataTypes.any,
        multiple: DataTypes.bool,
        placeholder: DataTypes.string,
        searchPlaceholder: DataTypes.string,
        searchValue: DataTypes.string,
        treeIcon: DataTypes.bool,
        showSearch: DataTypes.bool,
        size: DataTypes.oneOf(['default', 'small', 'large']),
        treeCheckable: DataTypes.bool,
        treeCheckStrictly: DataTypes.bool,
        treeDefaultExpandAll: DataTypes.bool,
        treeDefaultExpandedKeys: DataTypes.array,
        treeExpandedKeys: DataTypes.array,
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.array])
    },
    components: {
        's-icon': Icon,
        's-tree': Tree,
        's-tree-node': Tree.TreeNode,
        's-select-trigger': SelectTrigger,
        's-single-selector': SingleSelector,
        's-multiple-selector': MultipleSelector
    },
    computed: {
        classes() {
            const open = this.data.get('currentVisible');
            const disabled = this.data.get('disabled');
            const allowClear = this.data.get('allowClear');
            const sizei = this.data.get('sizeMap')[this.data.get('size')];
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-open`]: open,
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-enabled`]: !disabled,
                [`${prefixCls}-focused`]: open,
                [`${prefixCls}-allow-clear`]: allowClear,
                [`${prefixCls}-${sizei}`]: !!sizei
            });
        },
        containerClass() {
            const multiple = this.data.get('multiple') || this.data.get('treeCheckable');
            return classNames({
                [`${prefixCls}-selection`]: true,
                [`${prefixCls}-selection--multiple`]: multiple,
                [`${prefixCls}-selection--single`]: !multiple
            });
        },
        values() {
            const value = this.data.get('value') || this.data.get('defaultValue');
            if (typeof value === 'string') {
                return [value];
            }
            return value;
        },
        titles() {
            const title = this.data.get('title');
            const multiple = this.data.get('multiple') || this.data.get('treeCheckable');
            const defaultTitles = this.data.get('defaultTitles') || '';
            const resultTitle = title ? title : defaultTitles;
            if (!multiple && Array.isArray(resultTitle)) {
                return resultTitle[0];
            }

            return resultTitle;
        }
    },
    initData() {
        return {
            currentVisible: false,
            loading: false,
            showArrow: false,
            defaultActiveFirstOption: true,
            autoClearSearchValue: true,
            disabled: false,
            maxTagCount: 50,
            treeDefaultExpandAll: false,
            sizeMap: {
                large: 'lg',
                small: 'sm'
            },
            treeSelectData: {
                dropdownClassName: ''
            }
        };
    },
    created() {
        const {
            dropdownStyle,
            dropdownClassName,
            maxTagCount,
            maxTagPlaceholder,
            treeCheckStrictly,
            values
        } = this.data.get();
        if (values && values.length) {
            this.handleMaxTagPlaceholder(maxTagPlaceholder, values, maxTagCount);
        }
        if (treeCheckStrictly) {
            this.data.set('labelInValue', true);
        }
        this.data.set('treeSelectData.dropdownStyle', dropdownStyle);
        this.data.set('treeSelectData.dropdownClassName', dropdownClassName);
        this.watch('value', val => {
            if (typeof val === 'string') {
                val = [val];
            }
            this.setTitleOrDropdownFromValue(val);
        });
    },
    attached() {
        this.setDropdownWidth();
        // suffixIcon
        const suffixIcon = this.data.get('suffixIcon');
        if (suffixIcon && typeof suffixIcon === 'function') {
            const Render = suffixIcon();
            const renderer = new Render();
            const suffixRef = this.ref('suffixIconRef');
            if (suffixRef) {
                suffixRef.innerHTML = '';
                renderer.attach(suffixRef);
                renderer.parentComponent = this;
            }
        }
    },
    blur() {
        const multipleInputRef = this.ref('multipleInputRef');
        if (multipleInputRef) {
            const input = multipleInputRef.ref('importInput');
            input.blur();
        }
    },
    focus() {
        const multipleInputRef = this.ref('multipleInputRef');
        if (multipleInputRef) {
            const input = multipleInputRef.ref('importInput');
            input.focus();
        }
    },
    // 处理超出maxTagcount后的数据更新
    handleMaxTagPlaceholder(maxTagPlaceholder, values, maxTagCount) {
        const maxTagContent = this.setMaxTagPlaceholder(maxTagPlaceholder, values, maxTagCount);
        this.data.set('maxTagContent', maxTagContent);
    },

    /**
    * 设置超过maxTag的文案
    * @param {Function} maxTagPlaceholder 处理函数
    * @param {Array} values value数组
    * @param {number} maxTagCount 可放置tag的最大数
    *
    * @return {string}
    */
    setMaxTagPlaceholder(maxTagPlaceholder, values, maxTagCount) {
        let omittedValues = this.getVLFromChange(values.slice(maxTagCount, values.length));
        let content = `+ ${values.length - maxTagCount} ...`;
        if (maxTagPlaceholder) {
            content = typeof maxTagPlaceholder === 'function'
                ? maxTagPlaceholder(omittedValues)
                : maxTagPlaceholder;
        }
        return content;
    },

    /**
    * 从传入的values中返回简单数组
    * @param {Array} vals 数组
    *
    * @return {Array}
    */
    getVLFromChange(vals) {
        const labelInValue = this.data.get('labelInValue');
        if (vals !== undefined) {
            if (!labelInValue) {
                vals = vals.map(v => v.value);
            }
            return vals;
        }
        return vals;
    },

    /**
    * 获取node组件的所有parents组件
    * @param {Object} node 当前组件
    *
    * @return {Array}
    */
    getParentCompos(node) {
        let parents = [];
        let parent;
        function findParents(node) {
            parent = node.parentComponent;
            const tar = parent && parent.data.get('componentPropName') === 's-tree-node';
            if (tar) {
                parents.push(parent);
            }
            if (parent && parent.parentComponent) {
                parent = parent.parentComponent;
                findParents(parent);
            }
            return parents;
        }
        return findParents(node);
    },

    /**
    * 获取所有children组件
    * @param {Object} children 组件的children
    *
    * @return {Array}
    */
    getAllChilrenCompo(children) {
        const childrenList = [];
        function loopChildren(children) {
            children.forEach(child => {
                if (child.data && child.data.get('componentPropName') === 's-tree-node') {
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

    /**
    * 从组件中获取对应的value值
    * @param {Array} result 要进行取值的组件
    *
    * @return {Array}
    */
    getValueFromCompo(result) {
        return result.map(res => {
            return res.data.get('value');
        });
    },

    /**
    * 根据value或key找到对应的组件
    * @param {Array} targets value or key
    * @param {string} flag 'value' or 'key'
    *
    * @return {Array}
    */
    getAllShouldFindTargetComp(targets, flag) {
        let targetTreeNode = [];
        targets.forEach(tar => {
            targetTreeNode.push(...this.allTreeNode.filter(node => {
                return node.data.get(flag) === tar;
            }));
        });
        return targetTreeNode;
    },

    /**
    * 获取需要的父组件和子组件集合
    * @param {Object} targetTreeNode 当前的treeNode
    * @param {string} scope 要取得集合范围
    *
    * @return {Array}
    */
    getAllParentAndChildrenGroup(targetTreeNode, scope) {
        const parentNodes = [];
        const childrenNode = [];
        targetTreeNode.forEach(node => {
            parentNodes.push(...this.getParentCompos(node));
            childrenNode.push(...this.getAllChilrenCompo(node.children));
        });
        switch (scope) {
            case 'all':
                return [...parentNodes, ... targetTreeNode, ... childrenNode];
            case 'parent':
                if (!parentNodes.length) {
                    parentNodes.push(...targetTreeNode);
                }
                return parentNodes;
            case 'children':
                return childrenNode;
            default:
                break;
        }
    },

    /**
    * 确定某个key或value是否还有children结构,并获得children
    * @param {string} data key or values
    * @param {string} flag 'key' or 'value'
    *
    * @return {Array}
    */
    getChidrenKeyOrValue(data, flag) {
        const resData = [];
        function loopFind(exchangeData, data, flag) {
            exchangeData.forEach(d => {
                if (d[flag] === data && d.children && d.children.length) {
                    resData.push(...d.children);
                } else if (d.children && d.children.length) {
                    loopFind(d.children, data, flag);
                }
            });
            return resData;
        }
        return loopFind(this.exchangeData.children, data, flag);
    },

    /**
    * 通过传入的value，重新得到对应的title和keys
    * @param {Array} values 要处理的value数组
    *
    */
    setTitleOrDropdownFromValue(values) {
        const treeCheckable = this.data.get('treeCheckable');
        const transformData = this.transformTargetData(values, 'value', ['title', 'key']);
        const rightKeys = transformData.key;
        const rightTitles = transformData.title;
        if (treeCheckable) {
            this.data.set('checkedKeys', rightKeys);
        } else {
            this.data.set('selectedKeys', rightKeys);
        }
        this.data.set('defaultTitles', rightTitles);
    },
    messages: {
        visibleStateChange(state) {
            this.data.set('currentVisible', state.value);
        },
        inputSearch(data) {
            const value = data.value;
            this.fire('search', value);
        },
        exchangeCompo(data) {
            const showCheckedStrategy = this.data.get('showCheckedStrategy');
            let values = this.data.get('values');
            const treeCheckable = this.data.get('treeCheckable');
            let targetTreeNode;
            let resultCompo;
            // 根据treenode的曾经映射成对应的数据结构
            this.exchangeData = data.value.compoData;
            // 获得所有treeNode的平行结构
            this.allTreeNode = data.value.treeNodes;
            if (treeCheckable) {
                const targetTreeNode = this.getAllShouldFindTargetComp(values, 'value');
                switch (showCheckedStrategy) {
                    case 'SHOW_ALL':
                        resultCompo = this.getAllParentAndChildrenGroup(targetTreeNode, 'all');
                        break;
                    case 'SHOW_PARENT':
                        resultCompo = this.getAllParentAndChildrenGroup(targetTreeNode, 'parent');
                        break;
                    case 'SHOW_CHILD':
                        resultCompo = this.getAllParentAndChildrenGroup(targetTreeNode, 'children');
                        break;
                    default:
                        break;
                }
                values = this.getValueFromCompo(resultCompo);
            }
            if (values) {
                // 拿到values所在的titles
                this.setTitleOrDropdownFromValue(values);
            }
        },
        closeBtnClick(data) {
            const value = data.value;
            let flag;
            const {
                treeCheckable,
                labelInValue,
                maxTagCount,
                maxTagPlaceholder,
                titles
            } = this.data.get();
            const titlesToKey = this.getRightTreeNodeProperty(titles, this.allTreeNode, 'title', 'key');
            const closeKey = this.getRightTreeNodeProperty([value], this.allTreeNode, 'title', 'key');
            // update key
            titlesToKey.splice(titlesToKey.indexOf(closeKey[0]), 1);
            // key -> title
            const transformData = this.transformTargetData(titlesToKey, 'key', ['title', 'value']);
            const showTitles = transformData.title;
            let treeNodeValue = transformData.value;

            if (treeCheckable) {
                this.data.set('checkedKeys', [...titlesToKey]);
            } else {
                this.data.set('selectedKeys', [...titlesToKey]);
            }
            if (labelInValue) {
                treeNodeValue = this.getLabelInValue(treeNodeValue, showTitles);
            }
            if (treeNodeValue.length) {
                this.handleMaxTagPlaceholder(maxTagPlaceholder, treeNodeValue, maxTagCount);
            }
            // 通知到dropdown更新位置
            flag = ++tmpCount % 2 === 0 ? true : 1;
            this.data.set('newPosition', flag);
            this.data.set('title', showTitles);
            this.fire('change', treeNodeValue);
        },
        // 对 multiple下的input输入进行搜索处理
        queryInput(data) {
            const value = data.value.value;
            const event = data.value.event;
            this.multipleInput = data.target;
            this.handleInputChage(value);
        },

        handleBackspace(ev) {
            const {
                treeCheckable,
                labelInValue,
                maxTagCount,
                maxTagPlaceholder
            } = this.data.get();
            let flag;
            let newTitle;
            let newValue;
            let titleToKeys;
            let fireLabelInValue;
            if (!treeCheckable) {
                // 多选 multiple
                this.data.pop('title');
                titleToKeys = this.getRightTreeNodeProperty(this.data.get('title'), this.allTreeNode, 'title', 'key');
                this.data.set('selectedKeys', [...titleToKeys]);
                newValue = this.getRightTreeNodeProperty(titleToKeys, this.allTreeNode, 'key', 'value');
                fireLabelInValue = newValue;
                if (labelInValue) {
                    fireLabelInValue = this.getLabelInValue(newValue, this.data.get('title'));
                }
            } else {
                // 如果是删除子项，则直接删除；如果删除的是父项，则需要删除子项中的最后一项。
                const titles = this.data.get('titles');
                titleToKeys = this.getRightTreeNodeProperty(titles, this.allTreeNode, 'title', 'key');
                const shouldDelKey = titleToKeys.slice(-1);
                // 在删除的时候需要知道要删除的这项是不是还有子元素
                const childrenKey = this.getChidrenKeyOrValue(shouldDelKey[0], 'key');
                let resultKey;
                if (childrenKey) {
                    const childKeys = childrenKey.map(child => {
                        return child.key;
                    });
                    resultKey = [...titleToKeys.slice(0, -1), ...childKeys.slice(0, -1)];
                } else {
                    resultKey = [...titleToKeys.slice(0, -1)];
                }
                const transformData = this.transformTargetData(resultKey, 'key', ['title', 'value']);
                newTitle = transformData.title;
                newValue = transformData.value;
                fireLabelInValue = newValue;
                this.data.set('checkedKeys', resultKey);
                this.data.set('title', newTitle);
                if (labelInValue) {
                    fireLabelInValue = this.getLabelInValue(newValue, newTitle);
                }
            }
            if (newValue.length) {
                this.handleMaxTagPlaceholder(maxTagPlaceholder, newValue, maxTagCount);
            }
            flag = ++tmpCount % 2 === 0 ? true : 1;
            this.data.set('newPosition', flag);
            this.fire('change', fireLabelInValue);
        }
    },

    /**
    * 通过value找到对应的treenode中的值
    * @param {Array} values 指定当前选中的条目
    * @param {Array} treeNodes 所有的treeNode集合
    * @param {string} sourceProperty 参考的转变值
    * @param {string} name 需要push的属性名
    * @return {Array}
    */
    getRightTreeNodeProperty(values, treeNodes, sourceProperty, name) {
        let rightKeys = [];
        treeNodes.forEach(node => {
            values.forEach(value => {
                if (node.data.get(sourceProperty) === value) {
                    rightKeys.push(node.data.get(name));
                }
            });
        });
        return rightKeys;
    },

    /**
    * 将treenode数据处理成扁平化数据list
    * @param {Array} data 要处理的数据
    *
    * @return {Array}
    */
    generateList(data) {
        const dataList = [];
        function handleList(data) {
            for (let i = 0; i < data.length; i++) {
                const node = data[i];
                const key = node.key;
                const title = node.title;
                const disabled = node.disabled;
                dataList.push({key, title, disabled});
                if (node.children) {
                    handleList(node.children);
                }
            }
            return dataList;
        }
        return handleList(data);
    },

    /**
    * 通过key获取到treenode中对应的parentKey
    * @param {string} key 当前treenode中的key
    * @param {Array} tree 整个tree的数据
    *
    * @return {string}
    */
    getParentKey(key, tree) {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.children)) {
                    parentKey = this.getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    },
    setDropdownWidth() {
        setTimeout(() => {
            const width = this.el.offsetWidth;
            this.data.set('width', width);
        }, 0);
    },
    // 点击select 头部
    onHeadClick(e) {
        const {disabled, multiple, treeCheckable} = this.data.get();
        if (disabled) {
            e.stopPropagation();
            return false;
        }
        if (!disabled && (multiple || treeCheckable)) {
            // 处理input focus
            const elInput = this.el.querySelector('input,textarea');
            elInput.focus();
        }
    },
    triggerInput(e) {
        const currentVisible = this.data.get('currentVisible');
        if (currentVisible) {
            e.stopPropagation();
        }
    },
    // 处理展开状态
    handleOpenState() {

    },
    // 清除选择区域
    onClearSelection(event) {
        let flag = 0;
        event.stopPropagation();
        this.data.set('titles', '');
        this.data.set('selectedKeys', []);
        this.data.set('checkedKeys', []);
        flag = ++tmpCount % 2 === 0 ? true : 1;
        this.data.set('newPosition', flag);
    },
    // 选中tree具体项
    onSelect(value) {
        const {
            labelInValue,
            maxTagCount,
            maxTagPlaceholder,
            autoClearSearchValue
        } = this.data.get();
        const multiple = this.data.get('multiple') || this.data.get('treeCheckable');
        const selectTitle = value.e.node.data.get('title');
        const searchInput = this.ref('searchInput');
        const selectKeys = value.selectedKeys;
        const transformData = this.transformTargetData(selectKeys, 'key', ['title', 'value']);
        const newValue = transformData.value;
        const result = transformData.title;
        let labelInValueData;
        if (!multiple) {
            this.data.set('title', selectTitle);
            this.data.set('currentVisible', false);
            if (searchInput) {
                searchInput.value = '';
            }
            labelInValueData = newValue.join('');
            if (labelInValue) {
                labelInValueData = {
                    label: selectTitle,
                    value: newValue.join('')
                };
            }
        } else {
            if (this.multipleInput && autoClearSearchValue) {
                this.multipleInput.ref('importInput').value = '';
            }
            this.data.set('title', result);
            labelInValueData = newValue;
            if (labelInValue) {
                labelInValueData = this.getLabelInValue(newValue, result);
            }
            if (newValue.length) {
                this.handleMaxTagPlaceholder(maxTagPlaceholder, newValue, maxTagCount);
            }

        }
        this.fire('change', labelInValueData);
        this.fire('select', labelInValueData);
    },
    // 处理inputSearch相关
    onSearchInput(event) {
        const value = event.target.value;
        this.handleInputChage(value);
        this.fire('search', value);
    },

    onSearchInputKeyDown(event) {

    },

    /**
    * 组合labelInValue
    * @param {Array} values value集合
    * @param {Array} labels 对应的labels(title)
    */
    getLabelInValue(values, labels) {
        return values.map((val, index) => {
            return {
                value: val,
                label: labels[index]
            };
        });
    },
    onCheck(data) {
        const checkedKeys = data.checkedKeys;
        const checkedNodes = data.e.checkedNodes;
        const {
            labelInValue,
            maxTagCount,
            maxTagPlaceholder,
            showCheckedStrategy
        } = this.data.get();
        let resultTitle;
        let res;
        let changeValue;
        let transformData;
        let treeNodeValue;
        // 要注意，checked的值是key，不是value，tree组件中并没有value，value是在tree-select中才有的一个属性
        switch (showCheckedStrategy) {
            case 'SHOW_ALL':
                transformData = this.transformTargetData(checkedKeys, 'key', ['title', 'value']);
                break;
            case 'SHOW_PARENT':
                // 当父元素全选时，只把父元素传出
                res = this.finnaldataGetParent(checkedKeys, this.exchangeData.children);
                transformData = this.transformTargetData(res, 'key', ['title', 'value']);
                break;
            case 'SHOW_CHILD':
                // 只选择子组件的value
                res = this.finnaldataGetChildren(checkedKeys, this.exchangeData.children);
                transformData = this.transformTargetData(res, 'key', ['title', 'value']);
                break;
            default:
                break;
        }
        this.data.set('title', transformData.title);
        treeNodeValue = transformData.value;
        resultTitle = transformData.title;
        if (transformData.title.length) {
            this.handleMaxTagPlaceholder(maxTagPlaceholder, treeNodeValue, maxTagCount);
        }
        if (labelInValue) {
            treeNodeValue = this.getLabelInValue(treeNodeValue, resultTitle);
        }
        this.fire('change', treeNodeValue);
    },

    onExpand(value) {
        this.fire('treeExpand', value);
    },

    /**
    * 通过已有的keys转化成需要的数据
    * @param {Array} keys 原始keys数据
    * @param {string} flag 要转化的原始属性
    * @param {Array} changeArr 要转成的数据类型，比如通过selectedKeys,找到对应的values
    *
    * @return {Array} 转化以后的数据
    */
    transformTargetData(keys, flag, changeArr) {
        try {
            const changeObj = {};
            changeArr.forEach(item => {
                changeObj[item] = this.getRightTreeNodeProperty(keys, this.allTreeNode, flag, item);
            });
            return changeObj;
        } catch (e) {
            throw new Error('changeArr must be Array');
        }
        return [];
    },

    /**
    * 找到符合条件的子组件value
    * @param {Array} keys 当前选择的keys
    * @param {Array} checkedData 选择的tree数据
    *
    */
    finnaldataGetChildren(keys, checkedData) {
        let getChildrenArr = [...keys];
        keys.forEach(key => {
            checkedData.forEach(data => {
                if (data.key === key) {
                    getChildrenArr.splice(getChildrenArr.indexOf(key), 1);
                }
            });
        });
        return getChildrenArr;
    },

    /**
    * 找到符合条件的父组件value
    * @param {Array} keys 当前选择的keys
    * @param {Array} checkedData 选择的tree数据
    *
    * @return {Array}
    */
    finnaldataGetParent(keys, checkedData) {
        let resultGet = [];
        keys.forEach(key => {
            checkedData.forEach(data => {
                if (data.key === key) {
                    // 说明找到了共同的父组件,需要把values中的父组件中的子数据删除
                    const res = data.children.map(item => {
                        resultGet.push(item.key);
                    });
                }
            });
        });
        return keys.filter(item => {
            return !resultGet.includes(item);
        });
    },
    handleInputChage(value) {
        const compData = this.exchangeData.children;
        const dataList = this.generateList(compData);
        // 对数据进行循环，找出需要展示的key
        const expandedKeys = dataList.map(item => {
            if (item.title.indexOf(value) > -1) {
                return this.getParentKey(item.key, compData);
            }
            return null;
        });
        const newSetKeys = new Set(expandedKeys);
        this.data.set('treeExpandedKeys', [...newSetKeys]);
    },

    template: `
        <div>
            <s-select-trigger
                allData="{{treeSelectData}}"
                currentVisible="{{currentVisible}}"
                width="{{width}}"
                newPosition="{{newPosition}}"
                dropdownMatchSelectWidth="{{dropdownMatchSelectWidth}}"
                className="san-select-tree-dropdown"
                getPopupContainer="{{getPopupContainer}}"
            >
                <div class="{{classes}}" style="width: 100%" slot="triggerSlot">
                    <div class="{{containerClass}}" on-click="onHeadClick($event)">
                        <div class="${prefixCls}-selection__rendered" on-click="triggerInput($event)">
                            <s-single-selector
                                s-if="!multiple && !treeCheckable"
                                disabled="{{disabled}}"
                                placeholder="{{placeholder}}"
                                title="{{titles}}"
                            ></s-single-selector>
                            <s-multiple-selector
                                s-else
                                s-ref="multipleInputRef"
                                disabled="{{disabled}}"
                                maxTagContent="{{maxTagContent}}"
                                maxTagCount="{{maxTagCount}}"
                                title="{{titles}}"
                                placeholder="{{placeholder}}"
                            ></s-multiple-selector>
                        </div>
                        <span
                            s-if="allowClear && titles"
                            s-ref="clearIconRef"
                            class="${prefixCls}-selection__clear"
                            style="user-select:none;"
                            on-click="onClearSelection($event)"
                        >
                            <s-icon type="close-circle" theme="filled"></s-icon>
                        </span>
                        <span class="${prefixCls}-arrow">
                            <span s-ref="suffixIconRef" class="${prefixCls}-arrow-icon">
                                <s-icon s-if="!multiple && !treeCheckable" type="down"></s-icon>
                            </span>
                        </span>
                    </div>
                </div>
                <div slot="dropdownInner">
                    <span s-if="showSearch && !multiple" class="${prefixCls}-dropdown-search">
                        <!--input-->
                        <span class="${prefixCls}-search__field__wrap">
                            <input
                                s-ref="searchInput"
                                type="text"
                                value="{{searchValue}}"
                                disabled="{{disabled}}"
                                class="${prefixCls}-search__field"
                                on-input="onSearchInput($event)"
                                on-keydown="onSearchInputKeyDown($event)"
                            />
                            <span class="${prefixCls}-search__field__mirror">
                                {{searchValue}}
                            </span>
                        </span>
                    </span>
                    <s-tree
                        s-ref="treeRef"
                        showIcon="{{treeIcon}}"
                        checkStrictly="{{treeCheckStrictly}}"
                        multiple="{{multiple || treeCheckable}}"
                        treeNodeData="{{treeData}}"
                        checkable="{{treeCheckable}}"
                        isTreeSelect="{{treeCheckable}}"
                        blockNode
                        selectedKeys="{{selectedKeys}}"
                        checkedKeys="{{checkedKeys}}"
                        defaultExpandedKeys="{{treeDefaultExpandedKeys}}"
                        expandedKeys="{{treeExpandedKeys}}"
                        on-select="onSelect"
                        on-check="onCheck"
                        on-expand="onExpand"
                        defaultExpandAll="{{treeDefaultExpandAll}}"
                    >
                        <slot/>
                    </s-tree>
                </div>
            </s-select-trigger>
        </div>
    `
});
