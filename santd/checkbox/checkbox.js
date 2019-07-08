/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Checkbox from './src/checkbox';
import './style/index.less';

const prefixCls = classCreator('checkbox')();

export default san.defineComponent({
    components: {
        's-checkbox': Checkbox
    },
    initData() {
        return {
            prefixCls: prefixCls,
            indeterminate: false
        };
    },
    inited() {
        this.data.set('instance', this);
    },
    attached() {
        this.dispatch('addCheckbox', this);
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const prefixCls = this.data.get('prefixCls');
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');

            return classNames(className, {
                [`${prefixCls}-wrapper`]: true,
                [`${prefixCls}-wrapper-checked`]: checked,
                [`${prefixCls}-wrapper-disabled`]: disabled
            });
        },
        checkboxClass() {
            const indeterminate = this.data.get('indeterminate');
            const prefixCls = this.data.get('prefixCls');
            return classNames({
                [`${prefixCls}-indeterminate`]: indeterminate
            });
        },
        hasSlot() {
            const instance = this.data.get('instance');
            return instance && instance.sourceSlots.noname;
        }
    },
    handleChange(e) {
        this.fire('change', e);
        this.dispatch('toggleOption', {
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
            style="{{style}}"
            on-mouseenter="handleMouseEnter"
            on-mouseleave="handleMouseLeave"
        >
            <s-checkbox
                prefixCls="{{prefixCls}}"
                type="{{type}}"
                class="{{checkboxClass}}"
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
            /><span s-if="hasSlot"><slot></slot></span>
        </label>
    `
});
