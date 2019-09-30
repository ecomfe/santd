/**
* @file menuItem component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('menu-item')();

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        key: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        title: DataTypes.string,
        multiple: DataTypes.bool,
        selectedKeys: DataTypes.array
    },
    computed: {
        classes() {
            const disabled = this.data.get('disabled');
            const active = this.data.get('active');
            const isSelected = this.data.get('isSelected');

            let classArr = [prefixCls];

            !disabled && active && classArr.push(`${prefixCls}-active`);
            isSelected && classArr.push(`${prefixCls}-selected`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        },
        isSelected() {
            const key = this.data.get('key');
            const selectedKeys = this.data.get('selectedKeys') || [];
            return selectedKeys.includes(key);
        },
        active() {
            const key = this.data.get('key');
            const activeKey = this.data.get('activeKey') || {};
            const subMenuKey = this.data.get('subMenuKey');

            return activeKey[subMenuKey] === key;
        }
    },
    inited() {
        this.dispatch('santd_menu_addItem', this);
    },
    getItemStyle(mode) {
        const inlineIndent = this.data.get('inlineIndent');
        const level = this.data.get('level');

        return mode === 'inline'
            ? `padding-left: ${inlineIndent * level}px;`
            : '';
    },
    handleClick(e) {
        if (this.data.get('disabled')) {
            return;
        }

        const {
            key,
            multiple,
            isSelected
        } = this.data.get();

        const info = {
            key,
            keyPath: [key],
            item: this,
            e
        };
        this.dispatch('santd_menu_itemClick', info);
        if (multiple) {
            this.dispatch('santd_meun_' + isSelected ? 'itemDeselect' : 'itemSelect', info);
        }
        else {
            this.dispatch('santd_menu_itemSelect', info);
        }
    },
    handleMouseEnter(e) {
        if (this.data.get('disabled')) {
            return;
        }

        const key = this.data.get('key');
        this.dispatch('santd_menu_itemHover', {key, hover: true});
        this.dispatch('santd_menu_itemMouseEnter', {key, e});
    },
    handleMouseLeave(e) {
        if (this.data.get('disabled')) {
            return;
        }

        const key = this.data.get('key');
        this.dispatch('santd_menu_itemHover', {key, hover: false});
        this.dispatch('santd_menu_itemMouseLeave', {key, e});
    },
    template: `
        <li
            class="{{classes}}"
            style="{{getItemStyle(mode)}}"
            role="{{role || 'menuitem'}}"
            aria-disabled="{{disabled}}"
            aria-selected="{{isSelected}}"
            on-click="handleClick($event)"
            on-mouseleave="handleMouseLeave($event)"
            on-mouseenter="handleMouseEnter($event)"
        >
            <slot />
        </li>
    `
});
