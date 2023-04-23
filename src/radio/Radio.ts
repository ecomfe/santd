/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */

import {classCreator} from '../core/util';
import Base from 'santd/base';
import type {TGroup} from './Group';
import type {TRadioButton} from './RadioButton';

import {
    RadioState as State,
    RadioProps as Props,
    RadioComputed as Computed,
    RadioChangeEvent
} from './interface';
import './style/index.less';

const prefixCls = classCreator('radio')();

export default class Radio extends Base<State, Props, Computed> {
    static template = /* html */ `
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
    `

    static Group: TGroup

    static Button: TRadioButton

    initData(): State {
        return {
            // 这里写入prefixCls,因为groupbutton里需要重写该样式
            prefixCls,
            type: 'radio',
            defaultChecked: false
        };
    }

    inited() {
        this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
        this.data.set('hasSlot', !!this.sourceSlots?.noname);
    }

    attached() {
        this.dispatch('santd_radio_add', this);
    }

    static computed: Computed = {
        classes(this: Radio) {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const prefixCls = this.data.get('prefixCls');

            let classArr = [`${prefixCls}-wrapper`];
            checked && classArr.push(`${prefixCls}-wrapper-checked`);
            disabled && classArr.push(`${prefixCls}-wrapper-disabled`);

            return classArr;
        },

        inputWrapClasses(this: Radio) {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const prefixCls = this.data.get('prefixCls');
            let classArr = [prefixCls];

            checked && classArr.push(`${prefixCls}-checked`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        }
    }

    handleChange(e: RadioChangeEvent) {
        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('checked', e.target.checked);

        this.dispatch('santd_radio_toggleOption', {
            value: this.data.get('value'),
            event: e
        });
    }

    handleClick(e: MouseEvent) {
        this.fire('click', e);
    }

    handleBlur(e: FocusEvent) {
        this.fire('blur', e);
    }

    handleFocus(e: FocusEvent) {
        this.fire('focus', e);
    }

    handleMouseEnter(e: MouseEvent) {
        this.fire('mouseenter', e);
    }

    handleMouseLeave(e: MouseEvent) {
        this.fire('mouseleave', e);
    }

    focus() {
        (this.ref('input') as unknown as HTMLInputElement).focus();
    }

    blur() {
        (this.ref('input') as unknown as HTMLInputElement).blur();
    }
};
