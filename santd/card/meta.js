/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';

const prefixCls = classCreator('card')();
export default san.defineComponent({
    template: `
    	<div class="{{cls}}">
            <div s-if="isAvatar" class="${prefixCls}-meta-avatar">
                <slot name="avatar"></slot>
            </div>
            <div s-if="{{isTitle || isDes || title || description}}" class="${prefixCls}-meta-detail">
                <div s-if="{{isTitle || title}}" class="${prefixCls}-meta-title">
                    <slot name="title"></slot>{{title}}
                </div>
                <div s-if="{{isDes || description}}" class="${prefixCls}-meta-description">
                    <slot name="description"></slot>{{description}}
                </div>
            </div>
        </div>
    `,
    initData() {
        return {
            bordered: true
        };
    },
    computed: {
        cls() {
            return classNames(`${prefixCls}-meta`, this.data.get('className'));
        }
    },
    inited() {
        this.data.set('isAvatar', !!this.sourceSlots.named['avatar']);
        this.data.set('isDes', !!this.sourceSlots.named['description']);
        this.data.set('isTitle', !!this.sourceSlots.named['title']);
    }
});
