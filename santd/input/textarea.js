/**
* @file textarea组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import keyCode from 'santd/core/util/keyCode';
import calculateNodeHeight from './calculateNodeHeight';
const pagin = classCreator('input');
const prefixCls = pagin();

export default san.defineComponent({
    dataTypes: {
        defaultValue: DataTypes.string,
        value: DataTypes.string
    },
    components: {
    },
    computed: {
        areaClass() {
            const disabled = this.data.get('disabled') || false;
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-disabled`]: disabled
            });
        }
    },
    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    attached() {
        this.getBaseData();
    },
    updated() {
        this.getBaseData();
    },
    getBaseData() {
        const defaultValue = this.data.get('defaultValue');
        const value = this.data.get('value');
        const stateValue = value ? value : (defaultValue ? defaultValue : '');
        this.data.set('stateValue', stateValue);
        this.resizeTextarea();
    },
    resizeTextarea() {
        let autosize = this.data.get('autosize');
        let textareaStyles;
        if (!autosize) {
            return;
        }
        // 如果autosize里面传的是字符串对象，需要进行解析
        if (autosize.toString() === 'false' || autosize.toString() === 'true') {
            textareaStyles = calculateNodeHeight(this.el, false, null, null);
        } else {
            const parseObj = this.parseObjString(autosize);
            if (typeof parseObj === 'object') {
                const minRows = parseObj.minRows;
                const maxRows = parseObj.maxRows;
                textareaStyles = calculateNodeHeight(this.el, false, minRows, maxRows);
            }
        }
        this.data.set('styles', textareaStyles);
    },
    parseObjString(str) {
        str = str.replace(/'/g, '');
        const regExp = /{(.*)}/;
        let res = regExp.exec(str)[1].split(',');
        if (!res) {
            return '';
        }
        let obj = {};
        res.forEach(item => {
            let temp = item.split(':');
            obj[temp[0].trim()] = temp[1].toString().trim();
        });
        return obj;
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
    },
    handleBlur(e) {
        this.fire('textareaBlur', e.target.value);
    },
    template: `
        <textarea
            class="{{areaClass}}"
            style="{{styles}}"
            cols="{{cols}}"
            rows="{{rows}}"
            disabled="{{disabled}}"
            maxlength="{{maxlength}}"
            name="{{name}}"
            readonly="{{readonly}}"
            autofocus="{{autofocus}}"
            placeholder="{{placeholder}}"
            on-input="handleTextareaChange($event)"
            on-keydown="handleKeyDown($event)"
            on-blur="handleBlur($event)"
            value="{{stateValue}}"
        ></textarea>
    `
});
