/**
 * @file Santd cascader menus file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import arrayTreeFilter from './arraytreefilter';

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
        this.data.set('fieldNames', this.data.get('fieldNames') || this.data.get('defaultFieldNames') || []);
    },
    computed: {
        getActiveOptions() {
            const activeValue = this.data.get('activeValue');
            const options = this.data.get('options');
            const fieldNames = this.data.get('fieldNames');

            return arrayTreeFilter(
                options,
                (o, level) => o[fieldNames.value] === activeValue[level],
                {childrenKeyName: fieldNames.children}
            );
        },
        getShowOptions() {
            const options = this.data.get('options');
            const fieldNames = this.data.get('fieldNames');
            let result = this.data.get('getActiveOptions') || [];

            result = result.map(activeOption => activeOption[fieldNames.children])
                .filter(activeOption => !!activeOption);

            result.unshift(options);
            return result;
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

        return fieldNames[name];
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

        let classArr = [`${prefixCls}-menu-item`];
        (hasChildren || option.isLeaf === false) && classArr.push(`${prefixCls}-menu-item-expand`);
        this.isActiveOption(option, index) && classArr.push(`${prefixCls}-menu-item-active`);
        option.disabled && classArr.push(`${prefixCls}-menu-item-disabled`);
        option.loading && classArr.push(`${prefixCls}-menu-item-loading`);
        return classArr.join(' ');
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
        this.dispatch('santd_cascader_menuClick', {option, index, e});
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
            style="{{dropdownMenuColumnStyle}}"
        >
            <li
                s-for="option, subIndex in options"
                key="{{getLabel(option, 'value')}}"
                class="{{getMenuItemClass(options, index)}}"
                on-click="handleClick($event, option, index)"
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
