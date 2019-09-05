/**
* @file item.js 列表组件每个具体项
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Avatar from '../avatar';

const prefixCls = classCreator('list')();

const Meta = san.defineComponent({
    dataTypes: {
        avatar: DataTypes.string,
        title: DataTypes.string,
        description: DataTypes.string
    },

    components: {
        's-avatar': Avatar
    },

    inited() {
        this.data.set('hasAvatar', !!(this.sourceSlots.named.avatar || this.data.get('avatar')));
        this.data.set('hasTitle', !!(this.sourceSlots.named.title || this.data.get('title')));
        this.data.set('hasDescription', !!(this.sourceSlots.named.description || this.data.get('description')));
    },

    template: `
        <div class="${prefixCls}-item-meta">
            <div class="${prefixCls}-item-meta-avatar" s-if="hasAvatar">
                <s-avatar src="{{avatar}}" s-if="avatar" />
                <slot name="avatar" s-else/>
            </div>
            <div class="${prefixCls}-item-meta-content" s-if="hasDescription || hasTitle">
                <h4 class="${prefixCls}-item-meta-title" s-if="hasTitle">
                    <template s-if="title">{{title}}</template>
                    <slot name="title" s-else />
                </h4>
                <div class="${prefixCls}-item-meta-description" s-if="hasDescription">
                    <template s-if="description">{{description}}</template>
                    <slot name="description" s-else />
                </div>
            </div>
        </div>
    `
});

const actionsTemplate = `
    <slot />
    <ul s-if="actions" class="${prefixCls}-item-action">
        <li s-for="action, index in actions">
            <slot name="{{action}}" />
            <em class="${prefixCls}-item-action-split" s-if="index !== actions.length - 1" />
        </li>
    </ul>
`;

const Item = san.defineComponent({
    dataTypes: {
        actions: DataTypes.array
    },
    inited() {
        this.data.set('hasExtra', !!this.sourceSlots.named.extra);
    },
    attached() {
        this.dispatch('santd_list_addItem', this);
    },
    template: `
        <div class="${prefixCls}-item">
            <template s-if="itemLayout === 'vertical' && hasExtra">
                <div class="${prefixCls}-item-main" key="content">${actionsTemplate}</div>
                <div class="${prefixCls}-item-extra" key="extra"><slot name="extra" /></div>
            </template>
            <template s-else>
                ${actionsTemplate}
            </template>
        </div>
    `
});

Item.Meta = Meta;
export default Item;
