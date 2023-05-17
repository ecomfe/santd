/**
* @file inputPassword 输入框密码组件
* @author fuqiangqiang@baidu.com
*/

import {classCreator} from '../core/util';
import BaseInput from './Base';
import Icon from '../icon';
import type {
    InputPasswordState as State
} from './interface';
const prefixCls = classCreator('input')();

export default class InputPassword extends BaseInput {

    static components = {
        's-icon': Icon
    }

    initData(): State {
        return {
            type: 'password',
            visibilityToggle: true
        };
    }

    handleEye() {
        const type = this.data.get('type');
        this.data.set('type', type === 'text' ? 'password' : 'text');
    }

    static template = /* html */ `
        <span class="${prefixCls}-password ${prefixCls}-affix-wrapper">
            ${BaseInput.template}
            <span class="${prefixCls}-suffix" s-if="visibilityToggle" on-click="handleEye">
                <s-icon type="eye{{type === 'password' ? '-invisible' : ''}}" />
            </span>
        </span>
    `
};

export type TInputPassword = typeof InputPassword;
