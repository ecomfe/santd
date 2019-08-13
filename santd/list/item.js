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
    computed: {
        classes() {
            const className = this.data.get('className');
            return [`${prefixCls}-item-meta`, className];
        },
        hasAvatar() {
            const instance = this.data.get('instance');
            const avatar = this.data.get('avatar');
            return instance && instance.sourceSlots.named.avatar || avatar;
        },
        hasTitle() {
            const instance = this.data.get('instance');
            const title = this.data.get('title');
            return instance && instance.sourceSlots.named.title || title;
        },
        hasDescription() {
            const instance = this.data.get('instance');
            const description = this.data.get('description');
            return instance && instance.sourceSlots.named.description || description;
        }
    },
    initData() {
        return {
            prefixCls
        };
    },
    inited() {
        this.data.set('instance', this);
    },
    components: {
        's-avatar': Avatar
    },
    template: `
        <div class="{{classes}}">
            <div class="{{prefixCls}}-item-meta-avatar" s-if="hasAvatar">
                <s-avatar src="{{avatar}}" s-if="avatar"></s-avatar>
                <slot name="avatar"></slot>
            </div>
            <div class="{{prefixCls}}-item-meta-content" s-if="hasDescription || hasTitle">
                <h4 class="{{prefixCls}}-item-meta-title" s-if="hasTitle">
                    {{title}}<slot name="title"></slot>
                </h4>
                <div class="{{prefixCls}}-item-meta-description" s-if="hasDescription">
                    {{description}}<slot name="description"></slot>
                </div>
            </div>
        </div>
    `
});

const Item = san.defineComponent({
    computed: {
        classes() {
            const className = this.data.get('className');
            return [`${prefixCls}-item`, className];
        },
        hasExtra() {
            const instance = this.data.get('instance');
            return instance && instance.sourceSlots.named.extra;
        }
    },
    initData() {
        return {
            prefixCls
        };
    },
    inited() {
        this.data.set('instance', this);
    },
    attached() {
        this.dispatch('addItem', this);
    },
    template: `
        <div class="{{classes}}">
            <template s-if="itemLayout === 'vertical' && hasExtra">
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
