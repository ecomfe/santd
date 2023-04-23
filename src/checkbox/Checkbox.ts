/**
 * @file 组件 Checkbox
 * @author jinzhan <jinzhan@baidu.com>
 */
import {classCreator} from '../core/util';
import Base from 'santd/base';
import type {
    CheckboxState as State,
    CheckboxProps as Props,
    CheckboxComputed as Computed,
    CheckboxChangeEvent
} from './interface';
import type {TGroup} from './Group';

import './style/index.less';

const prefixCls = classCreator('checkbox')();

export default class Checkbox extends Base<State, Props, Computed> {
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
                    readonly="{{readOnly}}"
                    disabled="{{disabled}}"
                    tabindex="{{tabIndex}}"
                    class="${prefixCls}-input"
                    on-click="handleClick"
                    on-focus="handleFocus"
                    on-blur="handleBlur"
                    on-change="handleChange"
                    autofocus="{{autoFocus}}"
                    s-ref="input"
                    value="{{value}}"
                />
                <span class="${prefixCls}-inner" />
            </span>
            <span s-if="hasSlot"><slot /></span>
        </label>
    `

    static Group: TGroup

    initData(): State {
        return {
            type: 'checkbox',
            defaultChecked: false,
            indeterminate: false
        };
    }

    inited() {
        this.data.set('checked', this.data.get('checked') || this.data.get('defaultChecked'));
        this.data.set('hasSlot', !!this.sourceSlots?.noname);
    }

    attached() {
        this.dispatch('santd_checkbox_add', this);
    }

    static computed: Computed = {
        classes(this: Checkbox) {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const indeterminate = this.data.get('indeterminate');

            let classArr = [`${prefixCls}-wrapper`];
            checked && classArr.push(`${prefixCls}-wrapper-checked`);
            disabled && classArr.push(`${prefixCls}-wrapper-disabled`);
            indeterminate && classArr.push(`${prefixCls}-indeterminate`);

            return classArr;
        },

        inputWrapClasses(this: Checkbox) {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            let classArr = [prefixCls];

            checked && classArr.push(`${prefixCls}-checked`);
            disabled && classArr.push(`${prefixCls}-disabled`);

            return classArr;
        }
    }

    handleChange(e: CheckboxChangeEvent) {
        if (this.data.get('disabled')) {
            return;
        }

        let checked = e.target.checked;
        if (checked === this.data.get('checked')) {
            checked = !checked;
        }
        this.data.set('checked', checked);

        this.fire('change', {
            target: this.data.get(),
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
            nativeEvent: e.nativeEvent
        });

        this.dispatch('santd_checkbox_toggleOption', {
            value: this.data.get('value'),
            e
        });

        // 提交数据给form表单使用
        this.dispatch('UI:form-item-interact', {
            fieldValue: checked,
            type: 'change',
            e
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
