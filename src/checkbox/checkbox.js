/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Checkbox from './src/checkbox';
import './style/index.less';

const prefixCls = classCreator('checkbox')();

export default san.defineComponent({
    dataTypes: {
        checked: DataTypes.bool,
        disabled: DataTypes.bool,
        indeterminate: DataTypes.bool
    },

    components: {
        's-checkbox': Checkbox
    },

    initData() {
        return {
            indeterminate: false
        };
    },

    inited() {
        this.data.set('hasSlot', !!this.sourceSlots.noname);
    },

    attached() {
        this.dispatch('santd_checkbox_add', this);
    },

    computed: {
        classes() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');

            let classArr = [`${prefixCls}-wrapper`];
            checked && classArr.push(`${prefixCls}-wrapper-checked`);
            disabled && classArr.push(`${prefixCls}-wrapper-disabled`);

            return classArr;
        }
    },

    handleChange(e) {
        this.fire('change', e);
        this.dispatch('santd_checkbox_toggleOption', {
            value: this.data.get('value')
        });
    },

    handleClick(e) {
        this.fire('click', e);
    },

    handleBlur(e) {
        this.fire('blur', e);
    },

    handleFocus(e) {
        this.fire('focus', e);
    },

    handleMouseEnter(e) {
        this.fire('mouseenter', e);
    },

    handleMouseLeave(e) {
        this.fire('mouseleave', e);
    },

    focus() {
        this.ref('checkbox').focus();
    },

    blur() {
        this.ref('checkbox').blur();
    },

    template: `
        <label
            class="{{classes}}"
            on-mouseenter="handleMouseEnter"
            on-mouseleave="handleMouseLeave"
        >
            <s-checkbox
                prefixCls="${prefixCls}"
                type="{{type}}"
                class="{{indeterminate ? '${prefixCls}-indeterminate' : ''}}"
                checked="{{checked}}"
                disabled="{{disabled}}"
                name="{{name}}"
                defaultChecked="{{defaultChecked}}"
                autoFocus="{{autoFocus}}"
                value="{{value}}"
                on-focus="handleFocus"
                on-blur="handleBlur"
                on-click="handleClick"
                on-change="handleChange"
                s-ref="checkbox"
            /><span s-if="hasSlot"><slot /></span>
        </label>
    `
});
