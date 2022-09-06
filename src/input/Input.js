/**
* @file input 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';
import BaseInput from './Base';
import Icon from '../icon';
const prefixCls = classCreator('input')();

export default san.defineComponent({
    dataTypes: {
        addonAfter: DataTypes.string,
        addonBefore: DataTypes.string,
        prefix: DataTypes.string,
        suffix: DataTypes.string,
        defaultValue: DataTypes.any,
        placeholder: DataTypes.string,
        disabled: DataTypes.bool,
        inputType: DataTypes.oneOf(['inputGroup', 'inputFix']),
        id: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        size: DataTypes.oneOf(['large', 'default', 'small']),
        type: DataTypes.string,
        value: DataTypes.any
    },

    components: {
        's-icon': Icon
    },

    inited() {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue') || '');
        this.data.set('hasAddonBefore', this.data.get('addonBefore') || !!this.sourceSlots.named.addonBefore);
        this.data.set('hasAddonAfter', this.data.get('addonAfter') || !!this.sourceSlots.named.addonAfter);
        this.data.set('hasPrefix', this.data.get('prefix') || !!this.sourceSlots.named.prefix);
        this.data.set('hasSuffix', this.data.get('suffix') || !!this.sourceSlots.named.suffix);
    },

    handleIconClear() {
        this.data.set('value', '');
        this.focus();
    },

    handleMouseDown(e) {
        // Do not trigger onBlur when clear input
        e.preventDefault();
    },

    template: `
        <span class="{{value && allowClear ? '${prefixCls}-affix-wrapper' : ''}}">
            <span class="${prefixCls}-group-wrapper {{size ? '${prefixCls}-group-wrapper-' + size: ''}}" s-if="hasAddonBefore || hasAddonAfter">
                <span class="${prefixCls}-wrapper ${prefixCls}-group">
                    <span class="${prefixCls}-group-addon" s-if="hasAddonBefore">
                        <slot name="addonBefore" s-if="!addonBefore" />
                        <template s-else>{{addonBefore}}</template>
                    </span>
                    ${BaseInput.prototype.template}
                    <span class="${prefixCls}-group-addon" s-if="hasAddonAfter">
                        <slot name="addonAfter" s-if="!addonAfter" />
                        <template s-else>{{addonAfter}}</template>
                    </span>
                </span>
            </span>
            <span class="${prefixCls}-affix-wrapper {{size ? '${prefixCls}-affix-wrapper-' + size: ''}}" s-else-if="hasPrefix || hasSuffix">
                <span class="${prefixCls}-prefix" s-if="hasPrefix">
                    <slot name="prefix" s-if="!prefix" />
                    <template s-else>{{prefix}}</template>
                </span>
                ${BaseInput.prototype.template}
                <span class="${prefixCls}-suffix" s-if="hasSuffix">
                    <slot name="suffix" s-if="!suffix" />
                    <template s-else>{{suffix}}</template>
                </span>
            </span>
            <template s-else>
                ${BaseInput.prototype.template}
            </template>
            <span
                class="${prefixCls}-suffix"
                s-if="value && allowClear"
                on-click="handleIconClear"
                on-mousedown="handleMouseDown"
            >
                <s-icon type="close-circle" />
            </span>
        </span>
    `
}, BaseInput);
