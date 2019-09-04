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
    hasAvatar(avatar) {
        return this.sourceSlots.named.avatar || avatar;
    },
    hasTitle(title) {
        return this.sourceSlots.named.title || title;
    },
    hasDescription(description) {
        return this.sourceSlots.named.description || description;
    },
    template: `
        <div class="${prefixCls}-item-meta">
            <div class="${prefixCls}-item-meta-avatar" s-if="{{hasAvatar(avatar)}}">
                <s-avatar src="{{avatar}}" s-if="{{avatar}}" />
                <slot name="avatar" />
            </div>
            <div class="${prefixCls}-item-meta-content" s-if="{{hasDescription(description) || hasTitle(title)}}">
                <h4 class="${prefixCls}-item-meta-title" s-if="{{hasTitle(title)}}">
                    {{title}}<slot name="title" />
                </h4>
                <div class="${prefixCls}-item-meta-description" s-if="{{hasDescription(description)}}">
                    {{description}}<slot name="description" />
                </div>
            </div>
        </div>
    `
});

const Item = san.defineComponent({
    dataTypes: {
        actions: DataTypes.array
    },
    attached() {
        this.dispatch('santd_list_addItem', this);
    },
    hasExtra() {
        return this.sourceSlots.named.extra;
    },
    template: `
        <div class="${prefixCls}-item">
            <template s-if="{{itemLayout === 'vertical' && hasExtra()}}">
                <div class="${prefixCls}-item-main" key="content">
                    <slot />
                    <ul s-if="{{actions}}" class="${prefixCls}-item-action">
                        <li s-for="action, index in actions">
                            <slot name="{{action}}" />
                            <em class="${prefixCls}-item-action-split" s-if="{{index !== actions.length - 1}}" />
                        </li>
                    </ul>
                </div>
                <div class="${prefixCls}-item-extra" key="extra">
                    <slot name="extra" />
                </div>
            </template>
            <template s-else>
                <slot />
                <ul s-if="{{actions}}" class="${prefixCls}-item-action">
                    <li s-for="action, index in actions">
                        <slot name="{{action}}" />
                        <em class="${prefixCls}-item-action-split" s-if="{{index !== actions.length - 1}}" />
                    </li>
                </ul>
            </template>
        </div>
    `
});

Item.Meta = Meta;
export default Item;
