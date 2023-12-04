/**
 * @file Santd calendar ok button file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';

export default class OkButton extends Base<I.OkButtonState, I.OkButtonProps, I.OkButtonComputed> {
    handleClick() {
        if (!this.data.get('disabled')) {
            this.fire('ok');
        }
    };
    static template = /* html */ `
        <a
            class="{{prefixCls}}-ok-btn {{disabled ? prefixCls + '-ok-btn-disabled' : ''}}"
            role="button"
            on-click="handleClick"
        >
            {{locale.ok}}
        </a>
    `
};
