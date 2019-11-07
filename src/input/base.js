/**
* @file input 基础组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import keyCode from '../core/util/keyCode';
import {classCreator} from '../core/util';
const prefixCls = classCreator('input')();

export default san.defineComponent({
    dataTypes: {
        size: DataTypes.string,
        disabled: DataTypes.bool
    },
    initData() {
        return {
            type: 'text'
        };
    },
    inputChange(e) {
        const inputValue = e.target.value;
        this.data.set('value', inputValue);
        this.fire('change', inputValue);
        this.dispatch('UI:form-item-interact', {fieldValue: inputValue, type: 'change', e});
    },
    keydownHander(e) {
        if (e.keyCode === keyCode.ENTER) {
            const inputValue = e.target.value;
            this.data.set('value', inputValue);
            this.fire('pressEnter', inputValue);
            this.dispatch('UI:form-item-interact', {fieldValue: inputValue, type: 'change', e});
        }
    },
    inputOnBlur(e) {
        const inputValue = e.target.value;
        this.data.set('value', inputValue);
        this.fire('blur', inputValue);
        this.dispatch('UI:form-item-interact', {fieldValue: inputValue, type: 'blur', e});
    },
    template: `
        <input
            placeholder="{{placeholder}}"
            class="${prefixCls} {{size ? '${prefixCls}-' + size : ''}} {{disabled ? '${prefixCls}-disabled' : ''}} {{inputClasses}}"
            on-input="inputChange($event)"
            on-keydown="keydownHander($event)"
            on-blur="inputOnBlur($event)"
            value="{{value}}"
            disabled="{{disabled}}"
            readonly="{{readOnly}}"
            id="{{id}}"
            type="{{type}}"
            tabindex="{{tabIndex}}"
            maxlength="{{maxLength}}"
            s-ref="input"
        />
    `
});
