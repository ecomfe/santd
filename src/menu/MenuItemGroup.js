/**
* @file menuItemGroup component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('menu')();

export default san.defineComponent({
    dataTypes: {
        title: DataTypes.any
    },

    computed: {
        // 因为menu有其他组件调用传入prefixCls，所以这里需要重新设置menu prefixCls
        groupPrefixCls() {
            const rootPrefixCls = this.data.get('prefixCls');

            return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-item-group';
        }
    },

    initData() {
        return {
            inlineIndent: 24
        };
    },

    inited() {
        this.items = [];
    },

    itemGroupClick(e) {
        e.stopPropagation();
    },

    getTitleStyle(mode, level) {
        const inlineIndent = this.data.get('inlineIndent');

        return mode === 'inline'
            ? `padding-left: ${inlineIndent * level}px;`
            : '';
    },

    updated() {
        const level = this.data.get('level');
        this.items.forEach(item => {
            item.data.set('level', level + 1);
        });
    },

    messages: {
        santd_menu_addItem(payload) {
            this.items.push(payload.value);
            this.dispatch('santd_menu_addItem', payload.value);
        }
    },

    attached() {
        this.dispatch('santd_menu_addItem', this);
    },

    template: `
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
});
