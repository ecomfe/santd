/**
* @file textarea组件
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import keyCode from '../core/util/keyCode';
import calculateNodeHeight from './calculateNodeHeight';
import type {
    TextareaProps as Props
} from './interface';

const prefixCls = classCreator('input')();

export default class Textarea extends Base<{}, Props> {
    attached() {
        this.resizeTextarea();
        let value = this.data.get('value') || '';
        if (!value) {
            let defaultValue = this.data.get('defaultValue') || '';
            this.data.set('value', defaultValue);
        }
    }
    updated() {
        this.resizeTextarea();
    }
    resizeTextarea() {
        let autosize = this.data.get('autosize');
        let textareaStyles;
        if (!autosize) {
            return;
        }
        // 如果autosize里面传的是字符串对象，需要进行解析
        if (typeof autosize === 'boolean') {
            textareaStyles = calculateNodeHeight(this.el as HTMLTextAreaElement, false);
        }
        else if (typeof autosize === 'object') {
            textareaStyles = calculateNodeHeight(this.el as HTMLTextAreaElement, false, autosize.minRows, autosize.maxRows);
        }
        this.data.set('styles', textareaStyles);
    }
    handleKeyDown(e: KeyboardEvent) {
        if (e.keyCode === keyCode.ENTER) {
            this.fire('pressEnter', (e?.target as HTMLTextAreaElement).value);
        }
    }
    handleTextareaChange(e: InputEvent) {
        this.nextTick(() => {
            this.resizeTextarea();
        });
        const targetValue = (e?.target as HTMLTextAreaElement).value;
        this.fire('change', targetValue);
        this.dispatch('UI:form-item-interact', {fieldValue: targetValue, type: 'change', e});
    }
    handleBlur(e: FocusEvent) {
        const targetValue = (e?.target as HTMLTextAreaElement).value;
        this.fire('textareaBlur', targetValue);
        this.dispatch('UI:form-item-interact', {fieldValue: targetValue, type: 'change', e});
    }
    static template = /* html */ `
        <!--TODO: 大版本统一maxLength-->
        <textarea
            class="${prefixCls} {{disabled ? '${prefixCls}-disabled': ''}}"
            style="{{styles}}"
            cols="{{cols}}"
            rows="{{rows}}"
            disabled="{{disabled}}"
            maxlength="{{maxLength || maxlength}}"
            name="{{name}}"
            readonly="{{readOnly}}"
            autofocus="{{autofocus}}"
            placeholder="{{placeholder}}"
            on-input="handleTextareaChange($event)"
            on-keydown="handleKeyDown($event)"
            on-blur="handleBlur($event)"
            value="{=value=}"
        ></textarea>
    `
};

export type TTextarea = typeof Textarea;
