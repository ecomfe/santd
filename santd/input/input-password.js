/**
* @file inputPassword 输入框密码组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import BaseInput from './base';
import Icon from '../icon';
const prefixCls = classCreator('input')();
const passwordPrefixCls = classCreator('input-password')();

export default san.defineComponent({
    components: {
        's-base-input': BaseInput,
        's-icon': Icon
    },
    initData() {
        return {
            type: 'password',
            visibilityToggle: true
        };
    },
    messages: {
        santd_input_change(item) {
            this.fire('change', item.value);
            this.dispatch('UI:form-item-interact', {fieldValue: item.value, type: 'change'});
        },
        santd_input_pressEnter(item) {
            this.fire('pressEnter', item.value);
        },
        santd_input_blur(item) {
            this.fire('blur', item.value);
            this.dispatch('UI:form-item-interact', {fieldValue: item.value, type: 'blur'});
        }
    },
    handleEye() {
        const type = this.data.get('type');
        this.data.set('type', type === 'text' ? 'password' : 'text');
    },
    template: `
        <span class="${passwordPrefixCls} ${prefixCls}-affix-wrapper">
            <s-base-input
                prefixCls="${prefixCls}"
                type="{{type}}"
                placeholder="{{placeholder}}"
                size="{{size}}"
                value="{{value}}"
                disabled="{{disabled}}"
                readOnly="{{readOnly}}"
                tabIndex="{{tabIndex}}"
                className="{{className}}"
                autoComplete="{{autoComplete}}"
                autoFocus="{{autoFocus}}"
            />
            <span class="${prefixCls}-suffix" s-if="{{visibilityToggle}}" on-click="handleEye">
                <s-icon s-if="{{type==='password'}}" type="eye-invisible" />
                <s-icon s-if="{{type==='text'}}" type="eye" />
            </span>
        </span>
    `
});
