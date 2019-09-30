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

    itemGroupClick(e) {
        e.stopPropagation();
    },

    getTitleStyle(mode) {
        const inlineIndent = this.data.get('inlineIndent');
        const level = this.data.get('level');

        return mode === 'inline'
            ? `padding-left: ${inlineIndent * level}px;`
            : '';
    },

    template: `
        <li class="{{groupPrefixCls}}" on-click="itemGroupClick($event)">
            <div
                class="{{groupPrefixCls}}-title"
                style="{{getTitleStyle(mode)}}"
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
