/**
* @file textarea组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import keyCode from '../core/util/keyCode';
import calculateNodeHeight from './calculateNodeHeight';
const prefixCls = classCreator('input')();

export default san.defineComponent({
    dataTypes: {
        defaultValue: DataTypes.string,
        value: DataTypes.string
    },
    attached() {
        this.resizeTextarea();
    },
    updated() {
        this.resizeTextarea();
    },
    resizeTextarea() {
        let autosize = this.data.get('autosize');
        let textareaStyles;
        if (!autosize) {
            return;
        }
        // 如果autosize里面传的是字符串对象，需要进行解析
        if (typeof autosize === 'boolean') {
            textareaStyles = calculateNodeHeight(this.el, false, null, null);
        }
        else if (typeof autosize === 'object') {
            textareaStyles = calculateNodeHeight(this.el, false, autosize.minRows, autosize.maxRows);
        }
        this.data.set('styles', textareaStyles);
    },
    handleKeyDown(e) {
        if (e.keyCode === keyCode.ENTER) {
            this.fire('pressEnter', e.target.value);
        }
    },
    handleTextareaChange(e) {
        this.nextTick(() => {
            this.resizeTextarea();
        });
        this.fire('inputChange', e.target.value);
        this.dispatch('UI:form-item-interact', {fieldValue: e.target.value, type: 'change', e});
    },
    handleBlur(e) {
        this.fire('textareaBlur', e.target.value);
        this.dispatch('UI:form-item-interact', {fieldValue: e.target.value, type: 'change', e});
    },
    template: `
        <textarea
            class="${prefixCls} {{disabled ? '${prefixCls}-disabled': ''}}"
            style="{{styles}}"
            cols="{{cols}}"
            rows="{{rows}}"
            disabled="{{disabled}}"
            maxlength="{{maxlength}}"
            name="{{name}}"
            readonly="{{readOnly}}"
            autofocus="{{autofocus}}"
            placeholder="{{placeholder}}"
            on-input="handleTextareaChange($event)"
            on-keydown="handleKeyDown($event)"
            on-blur="handleBlur($event)"
            value="{{value || defaultValue}}"
        ></textarea>
    `
});
