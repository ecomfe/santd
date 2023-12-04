/**
* @file menuItem component
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator, isUndefined} from '../core/util';
import type {
    MenuItemComputed as Computed,
    MenuItemProps as Props,
    MenuItemState as State
} from './interface';
const prefixCls = classCreator('menu-item')();

export default class MenuItem extends Base<State, Props, Computed> {
    static computed: Computed = {
        classes(this: MenuItem) {
            const disabled = this.data.get('disabled');
            const active = this.data.get('active');
            const isSelected = this.data.get('isSelected');
            let rootPrefixCls = this.data.get('rootPrefixCls');
            rootPrefixCls = rootPrefixCls && rootPrefixCls + '-item' || prefixCls;

            let classArr = [rootPrefixCls];

            !disabled && active && classArr.push(`${rootPrefixCls}-active`);
            isSelected && classArr.push(`${rootPrefixCls}-selected`);
            disabled && classArr.push(`${rootPrefixCls}-disabled`);

            return classArr;
        },
        isSelected(this: MenuItem) {
            const key = this.data.get('key');
            let selectedKeys = this.data.get('selectedKeys') || [];
            if (typeof selectedKeys === 'string') {
                selectedKeys = [selectedKeys];
            }
            return selectedKeys.includes(key as string);
        },
        active(this: MenuItem) {
            const key = this.data.get('key');
            const activeKey = this.data.get('activeKey') || {};
            const subMenuKey = this.data.get('subMenuKey');

            return activeKey[subMenuKey] === key;
        }
    }
    inited() {
        this.dispatch('santd_menu_addItem', this);
    }
    getItemStyle(mode: Props['mode'], level: Props['level']) {
        const inlineIndent = this.data.get('inlineIndent');

        return mode === 'inline'
            ? (isUndefined(inlineIndent) || isUndefined(level))
                ? ''
                : `padding-left: ${inlineIndent * level}px;`
            : '';
    }
    handleClick(e: MouseEvent) {
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
            const dispatchName = `santd_menu_${isSelected ? 'itemDeselect' : 'itemSelect'}`;
            this.dispatch(dispatchName, info);
        }
        else {
            this.dispatch('santd_menu_itemSelect', info);
        }
    }
    handleMouseEnter(e: MouseEvent) {
        if (this.data.get('disabled')) {
            return;
        }

        const key = this.data.get('key');
        this.dispatch('santd_menu_itemMouseEnter', {key, e});
    }
    static template = /* html */ `
        <li
            class="{{classes}}"
            style="{{getItemStyle(mode, level)}}"
            role="{{role || 'menuitem'}}"
            aria-disabled="{{disabled}}"
            aria-selected="{{isSelected}}"
            on-click="handleClick($event)"
            on-mouseenter="handleMouseEnter($event)"
            s-if="!isFolded"
        >
            <slot />
        </li>
    `
};

export type TMenuItem = typeof MenuItem;
