/**
* @file menuItemGroup component
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator, isUndefined} from '../core/util';
import MenuItem from './MenuItem';
import {
    MenuItemGroupProps as Props,
    MenuItemGroupState as State,
    MenuItemGroupComputed as Computed
} from './interface';
const prefixCls = classCreator('menu')();

type Message = {
    santd_menu_addItem: (this: MenuItemGroup, payload: {value: MenuItem}) => void
};

export default class MenuItemGroup extends Base<State, Props, Computed> {
    static computed: Computed =  {
        // 因为menu有其他组件调用传入prefixCls，所以这里需要重新设置menu prefixCls
        groupPrefixCls(this: MenuItemGroup) {
            const rootPrefixCls = this.data.get('prefixCls');

            return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-item-group';
        }
    }

    items!: Base[]

    initData() {
        return {
            inlineIndent: 24
        };
    }

    inited() {
        this.items = [];
    }

    itemGroupClick(e: MouseEvent) {
        e.stopPropagation();
    }

    getTitleStyle(mode: Props['mode'], level: Props['level']) {
        const inlineIndent = this.data.get('inlineIndent');

        return mode === 'inline'
            ? !isUndefined(level)
                ? `padding-left: ${inlineIndent * level}px;`
                : ''
            : '';
    }

    updated() {
        const level = this.data.get('level');
        if (isUndefined(level)) {
            return;
        }
        this.items.forEach(item => {
            item.data.set('level', level + 1);
        });
    }

    static messages: Message =  {
        santd_menu_addItem(payload) {
            this.items.push(payload.value);
            this.dispatch('santd_menu_addItem', payload.value);
        }
    }

    attached() {
        this.dispatch('santd_menu_addItem', this);
    }

    static template = /* html */ `
        <li class="{{groupPrefixCls}}" on-click="itemGroupClick($event)">
            <div
                class="{{groupPrefixCls}}-title"
                style="{{getTitleStyle(mode, level)}}"
            >
                <slot name="title" s-if="!title" />
                <template s-else>{{title}}</template>
            </div>
            <ul class="{{groupPrefixCls}}-list">
                <slot />
            </ul>
        </li>
    `
};

export type TMenuItemGroup = typeof MenuItemGroup;
