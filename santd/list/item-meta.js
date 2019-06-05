/**
* @file item-meta.js 包含avatar、description、title
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
const pagin = classCreator('list');
const prefixCls = pagin();

export default san.defineComponent({
    initData() {
        return {
            isAvatar: true,
            isTitle: true
        };
    },
    attached() {
        const avatarSlot = this.slot('avatar')[0];
        const titleSlot = this.slot('title')[0];
        if (!avatarSlot || !avatarSlot.isInserted) {
            this.data.set('isAvatar', false);
        }
        if (!avatarSlot || !avatarSlot.isInserted) {
            this.data.set('isTitle', false);
        }
    },
    template: `
        <div class="${prefixCls}-item-meta">
            <div s-if="{{isAvatar}}" class="${prefixCls}-item-meta-avatar">
                <slot name="avatar"></slot>
            </div>
            <div class="${prefixCls}-item-meta-content">
                <div s-if="{{isTitle}}" class="${prefixCls}-item-meta-title">
                    <slot name="title"></slot>
                </div>
                <div s-if="{{description}}" class="${prefixCls}-item-meta-description">
                    {{description}}
                </div>
            </div>
        </div>
    `
});
