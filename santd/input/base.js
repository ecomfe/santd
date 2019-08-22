/**
* @file input 基础组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import keyCode from '../core/util/keyCode';

export default san.defineComponent({
    dataTypes: {
        size: DataTypes.string,
        disabled: DataTypes.bool,
        prefixCls: DataTypes.string
    },
    computed: {
        baseClass() {
            const prefixCls = this.data.get('prefixCls');
            const size = this.data.get('sizeMap')[this.data.get('size')];
            const disabled = this.data.get('disabled');
            const className = this.data.get('className');
            let classArr = [prefixCls];

            className && (classArr = classArr.concat(className));
            size && classArr.push(`${prefixCls}-${size}`);
            disabled && classArr.push(`${prefixCls}-disabled`);
            return classArr;
        }
    },
    initData() {
        return {
            type: 'text',
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
            readonly="{{readOnly}}"
            id="{{id}}"
            type="{{type}}"
            tabindex="{{tabIndex}}"
            maxlength="{{maxLength}}"
        />
    `

});
