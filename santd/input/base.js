/**
* @file input 基础组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import keyCode from '../core/util/keyCode';
const pagin = classCreator('input');
const prefixCls = pagin();

export default san.defineComponent({
    components: {
    },
    computed: {
        baseClass() {
            const size = this.data.get('sizeMap')[this.data.get('size')];
            const disabled = this.data.get('disabled');
            const className = this.data.get('className');
            let classArr = [prefixCls, className];
            size && classArr.push(`${prefixCls}-${size}`);
            disabled && classArr.push(`${prefixCls}-disabled`);
            return classArr;
        }
    },
    initData() {
        return {
            type: 'text',
            stateValue: '',
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    inputChange(e) {
        const inputValue = e.target.value;
        this.dispatch('inputChange', inputValue);
    },
    keydownHander(e) {
        if (e.keyCode === keyCode.ENTER) {
            this.dispatch('pressEnter', e.target.value);
        }
    },
    inputOnBlur(e) {
        const inputValue = e.target.value;
        this.dispatch('inputBlur', inputValue);
    },
    template: `
        <input
            placeholder="{{placeholder}}"
            class="{{baseClass}}}"
            on-input="inputChange($event)"
            on-keydown="keydownHander($event)"
            on-blur="inputOnBlur($event)"
            value="{{value}}"
            disabled="{{disabled}}"
            id="{{id}}"
            type="{{type}}"
            maxlength="{{maxLength}}"
        />
    `

});
