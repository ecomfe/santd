/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Checkbox from '../checkbox/src/checkbox';
import './style/index.less';

const prefixCls = classCreator('radio')();

export default san.defineComponent({
    components: {
        's-checkbox': Checkbox
    },
    initData() {
        return {
            prefixCls
        };
    },
    attached() {
        this.dispatch('santd_radio_add', this);
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
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
        this.dispatch('santd_radio_toggleOption', {
            value: this.data.get('value'),
            event: e
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
                type="radio"
                prefixCls="{{prefixCls}}"
                checked="{{checked}}"
                defaultChecked="{{defaultChecked}}"
                disabled="{{disabled}}"
                name="{{name}}"
                autoFocus="{{autoFocus}}"
                value="{{value}}"
                on-focus="handleFocus"
                on-blur="handleBlur"
                on-click="handleClick"
                on-change="handleChange"
                s-ref="checkbox"
            />
            <span><slot /></span>
        </label>
    `
});
