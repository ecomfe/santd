/**
 * @file Santd cascader menus file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import classNames from 'classnames';
import arrayTreeFilter from './arraytreefilter';
import toStyle from 'to-style';

export default san.defineComponent({
    initData() {
        return {
            options: [],
            value: [],
            activeValue: [],
            prefixCls: 'cascader-menus',
            visible: false,
            expandTrigger: 'click',
            test: []
        };
    },
    inited() {
        this.data.set('instance', this);
    },
    computed: {
        getShowOptions() {
            const instance = this.data.get('instance');
            const options = this.data.get('options');
            const activeValue = this.data.get('activeValue');
            let result = instance && instance.getActiveOptions() || [];

            result = result.map(activeOption => {
                return activeOption[instance && instance.getFieldName('children')];
            }).filter(activeOption => {
                return !!activeOption;
            });
            result.unshift(options);
            return result.map((options, index) => {
                return options.map(option => {
                    if (instance) {
                        option.className = instance.getMenuItemClass(option, index);
                    }
                    return option;
                });
            });
        },
        dropdownStyle() {
            return toStyle.string(this.data.get('dropdownMenuColumnStyle'));
        }
    },
    updated() {
        const options = this.data.get('getShowOptions');
        options.forEach((option, index) => {
            option.forEach((item, subIndex) => {
                const ref = this.ref('option' + index + '-' + subIndex);
                ref.className = this.getMenuItemClass(item, index);
            });
        });
    },
    getFieldName(name) {
        const fieldNames = this.data.get('fieldNames');
        const defaultFieldNames = this.data.get('defaultFieldNames');

        return fieldNames[name] || defaultFieldNames[name];
    },
    getActiveOptions(values) {
        const activeValue = values || this.data.get('activeValue');
        const options = this.data.get('options');
        return arrayTreeFilter(
            options,
            (o, level) => o[this.getFieldName('value')] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
    },
    getLabel(option, label) {
        return option[this.getFieldName(label)];
    },
    isActiveOption(option, menuIndex) {
        const activeValue = this.data.get('activeValue') || [];
        return activeValue[menuIndex] === option[this.getFieldName('value')];
    },
    getMenuItemClass(option, index) {
        const prefixCls = this.data.get('prefixCls');
        const hasChildren = option[this.getFieldName('children')]
            && option[this.getFieldName('children')].length > 0;

        const menuItemClass = classNames(prefixCls + '-menu-item', {
            [`${prefixCls}-menu-item-expand`]: hasChildren || option.isLeaf === false,
            [`${prefixCls}-menu-item-active`]: this.isActiveOption(option, index),
            [`${prefixCls}-menu-item-disabled`]: option.disabled,
            [`${prefixCls}-menu-item-loading`]: option.loading
        });
        return menuItemClass;
    },
    getExpandIconNode(option) {
        const hasChildren = option[this.getFieldName('children')]
            && option[this.getFieldName('children')].length > 0;

        if ((hasChildren || option.isLeaf === false) && !option.loading) {
            return true;
        }
        return false;
    },
    handleClick(e, option, index) {
        this.dispatch('menuClick', {option, index, e});
    },
    handleDoubleClick(e, option, index) {
        this.dispatch('menuDoubleClick', {option, index});
    },
    handleMouseEnter(e, option, index) {
        const expandTrigger = this.data.get('expandTrigger');
        const hasChildren = option[this.getFieldName('children')]
            && option[this.getFieldName('children')].length > 0;

        if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
            this.delayHandleSelect(true, e, option, index);
        }
    },
    handleMouseLeave(e, option, index) {
        const expandTrigger = this.data.get('expandTrigger');
        const hasChildren = option[this.getFieldName('children')]
            && option[this.getFieldName('children')].length > 0;

        if (expandTrigger === 'hover' && (hasChildren || option.isLeaf === false)) {
            this.delayHandleSelect();
        }
    },
    delayHandleSelect(isEnter, e, option, index) {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
        if (isEnter) {
            this.delayTimer = setTimeout(() => {
                this.handleClick(e, option, index);
                this.delayTimer = null;
            }, 150);
        }
    },
    template: `<div>
        <ul
            s-for="options, index in getShowOptions"
            class="{{prefixCls}}-menu"
            key="{{index}}"
            role="menuitem"
            style="{{dropdownStyle}}"
        >
            <li
                s-for="option, subIndex in options"
                key="{{getLabel(option, 'value')}}"
                class="{{option.className}}"
                on-click="handleClick($event, option, index)"
                on-doubleclick="handleDoubleClick($event, option, index)"
                on-mouseenter="handleMouseEnter($event, option, index)"
                on-mouseleave="handleMouseLeave($event, option, index)"
                s-ref="option{{index}}-{{subIndex}}"
            >
                {{getLabel(option, 'label') | raw}}
                <span class="{{prefixCls}}-menu-item-expand-icon" s-if="getExpandIconNode(option)">{{expandIcon}}</span>
            </li>
        </ul>
    </div>`
});
