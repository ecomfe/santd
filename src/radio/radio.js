/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';

const prefixCls = classCreator('radio')();

export default san.defineComponent({
    template: `
        <label
            class="{{classes}}"
            on-mouseenter="handleMouseEnter"
            on-mouseleave="handleMouseLeave"
        >
            <span class="{{inputWrapClasses}}">
                <input
                    name="{{name}}"
                    type="{{type}}"
                    class="{{prefixCls}}-input"
                    readonly="{{readOnly}}"
                    disabled="{{disabled}}"
                    tabindex="{{tabIndex}}"
                    on-click="handleClick"
                    on-focus="handleFocus"
                    on-blur="handleBlur"
                    on-change="handleChange"
                    autofocus="{{autoFocus}}"
                    s-ref="input"
                    value="{{value}}"
                />
                <span class="{{prefixCls}}-inner" />
            </span>
            <span s-if="hasSlot"><slot /></span>
        </label>
    `,

    dataTypes: {
        checked: DataTypes.bool,
        disabled: DataTypes.bool
    },

    initData() {
        return {
            // 这里写入prefixCls,因为groupbutton里需要重写该样式
            prefixCls,
            type: 'radio',
            defaultChecked: false
        };
    },

    inited() {
        this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
        this.data.set('hasSlot', !!this.sourceSlots.noname);
    },

    attached() {
        this.dispatch('santd_radio_add', this);
    },

    computed: {
        classes() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const prefixCls = this.data.get('prefixCls');

            let classArr = [`${prefixCls}-wrapper`];
            checked && classArr.push(`${prefixCls}-wrapper-checked`);
            disabled && classArr.push(`${prefixCls}-wrapper-disabled`);

            return classArr;
        },

        inputWrapClasses() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const prefixCls = this.data.get('prefixCls');
            let classArr = [prefixCls];

            checked && classArr.push(`${prefixCls}-checked`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        }
    },

    handleChange(e) {
        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('checked', e.target.checked);

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
        this.ref('input').focus();
    },

    blur() {
        this.ref('input').blur();
    }
});
