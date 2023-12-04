/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';

const prefixCls = classCreator('card')();
export default class Meta extends Base {
    static template = `
    	<div class="${prefixCls}-meta">
            <div s-if="isAvatar" class="${prefixCls}-meta-avatar">
                <slot name="avatar" />
            </div>
            <div s-if="isTitle || isDes || title || description" class="${prefixCls}-meta-detail">
                <div s-if="isTitle || title" class="${prefixCls}-meta-title">
                    <slot name="title" />{{title}}
                </div>
                <div s-if="isDes || description}}" class="${prefixCls}-meta-description">
                    <slot name="description" />{{description}}
                </div>
            </div>
        </div>
    `;
    inited(): void {
        this.data.set('isAvatar', !!this.sourceSlots.named.avatar);
        this.data.set('isDes', !!this.sourceSlots.named.description);
        this.data.set('isTitle', !!this.sourceSlots.named.title);
    }
}