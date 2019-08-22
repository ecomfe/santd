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
        className: DataTypes.string,
        prefixCls: DataTypes.string,
        avatar: DataTypes.string,
        title: DataTypes.string,
        description: DataTypes.string
    },
    initData() {
        return {
            prefixCls
        };
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
        <div class="{{prefixCls}}-item-meta {{className}}">
            <div class="{{prefixCls}}-item-meta-avatar" s-if="{{hasAvatar(avatar)}}">
                <s-avatar src="{{avatar}}" s-if="{{avatar}}"></s-avatar>
                <slot name="avatar"></slot>
            </div>
            <div class="{{prefixCls}}-item-meta-content" s-if="{{hasDescription(description) || hasTitle(title)}}">
                <h4 class="{{prefixCls}}-item-meta-title" s-if="{{hasTitle(title)}}">
                    {{title}}<slot name="title"></slot>
                </h4>
                <div class="{{prefixCls}}-item-meta-description" s-if="{{hasDescription(description)}}">
                    {{description}}<slot name="description"></slot>
                </div>
            </div>
        </div>
    `
});

const Item = san.defineComponent({
    initData() {
        return {
            prefixCls
        };
    },
    attached() {
        this.dispatch('santd_list_addItem', this);
    },
    hasExtra() {
        return this.sourceSlots.named.extra;
    },
    template: `
        <div class="{{prefixCls}}-item {{className}}">
            <template s-if="{{itemLayout === 'vertical' && hasExtra()}}">
                <div class="{{prefixCls}}-item-main" key="content">
                    <slot></slot>
                    <slot name="actions" s-bind="{{{prefixCls: prefixCls, item: item, index: index}}}"></slot>
                </div>
                <div class="{{prefixCls}}-item-extra" key="extra">
                    <slot name="extra"></slot>
                </div>
            </template>
            <template s-else>
                <slot></slot>
                <slot name="actions" s-bind="{{{prefixCls: prefixCls, item: item, index: index}}}"></slot>
            </template>
        </div>
    `
});

Item.Meta = Meta;
export default Item;
