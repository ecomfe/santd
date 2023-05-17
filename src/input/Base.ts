/**
* @file input 基础组件
* @author fuqiangqiang@baidu.com
*/
import Base from 'santd/base';
import keyCode from '../core/util/keyCode';
import {classCreator} from '../core/util';
import type {
    BaseInputState as State,
    BaseInputProps as Props
} from './interface';

const prefixCls = classCreator('input')();

export default class BaseInput extends Base<State, Props> {
    initData(): State {
        return {
            type: 'text'
        };
    }
    inputChange(e: Event) {
        const targetValue = (e?.target as HTMLInputElement).value;
        this.fire('change', targetValue);
        this.dispatch('UI:form-item-interact', {fieldValue: targetValue, type: 'change', e});
    }
    keydownHander(e: KeyboardEvent) {
        if (e.keyCode === keyCode.ENTER) {
            const targetValue = (e?.target as HTMLInputElement).value;
            this.fire('pressEnter', targetValue);
            this.dispatch('UI:form-item-interact', {fieldValue: targetValue, type: 'change', e});
        }
    }
    inputOnBlur(e: FocusEvent) {
        const targetValue = (e?.target as HTMLInputElement).value;
        this.fire('blur', targetValue);
        this.dispatch('UI:form-item-interact', {fieldValue: targetValue, type: 'blur', e});
    }
    focus() {
        (this.ref('input') as unknown as HTMLInputElement).focus();
    }
    blur() {
        (this.ref('input') as unknown as HTMLInputElement).blur();
    }
    static template = /* html */ `
        <input
            placeholder="{{placeholder}}"
            class="${prefixCls} {{size ? '${prefixCls}-' + size : ''}} {{disabled ? '${prefixCls}-disabled' : ''}} {{inputClasses}}"
            on-input="inputChange($event)"
            on-keydown="keydownHander($event)"
            on-blur="inputOnBlur($event)"
            value="{=value=}"
            disabled="{{disabled}}"
            readonly="{{readOnly}}"
            id="{{id}}"
            type="{{type}}"
            tabindex="{{tabIndex}}"
            maxlength="{{maxLength}}"
            autocomplete="{{autocomplete}}"
            s-ref="input"
        />
    `
};
