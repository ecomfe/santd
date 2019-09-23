/**
* @file inputPassword 输入框密码组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import BaseInput from './base';
import Icon from '../icon';
const prefixCls = classCreator('input')();

export default san.defineComponent({
    dataTypes: {
        ...BaseInput.prototype.dataTypes,
        type: DataTypes.string,
        visibilityToggle: DataTypes.bool
    },

    components: {
        's-icon': Icon
    },

    initData() {
        return {
            type: 'password',
            visibilityToggle: true
        };
    },

    handleEye() {
        const type = this.data.get('type');
        this.data.set('type', type === 'text' ? 'password' : 'text');
    },

    template: `
        <span class="${prefixCls}-password ${prefixCls}-affix-wrapper">
            ${BaseInput.prototype.template}
            <span class="${prefixCls}-suffix" s-if="visibilityToggle" on-click="handleEye">
                <s-icon type="eye{{type === 'password' ? '-invisible' : ''}}" />
            </span>
        </span>
    `
}, BaseInput);
