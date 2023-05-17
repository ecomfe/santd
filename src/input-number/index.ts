/**
* @file input-number
* @author fuqiangqiang@baidu.com
*/

import {classCreator} from '../core/util';
import InputHandle from './InputHandler';
import './style/index.less';
const prefixCls = classCreator('input-number')();
import Base from 'santd/base';
import type {Props, State, Computed, Messages} from './interface';

export default class InputNumber extends Base<Props, State, Computed> {
    static template = `
        <div class="{{outClasses}}">
            <div class="${prefixCls}-handler-wrap">
                <input-handler
                    direction="up"
                    disabled="{{upDisabledConfirm}}"
                    prefixCls="${prefixCls}"
                />
                <input-handler
                    direction="down"
                    disabled="{{downDisabledConfirm}}"
                    prefixCls="${prefixCls}"
                />
            </div>
            <div
                class="${prefixCls}-input-wrap"
                role="spinbutton"
                aria-valuemin="{{min}}"
                aria-valuemax="{{max}}"
                aria-valuenow="{{defaultValue}}"
            >
                <input
                    s-ref="realInput"
                    type="text"
                    class="${prefixCls}-input"
                    on-focus="onFocus($event)"
                    on-blur="onBlur($event)"
                    on-keydown="onKeyDown($event)"
                    on-keyup="onKeyUp($event)"
                    disabled="{{disabled}}"
                    step="{{step}}"
                    max="{{max}}"
                    min="{{min}}"
                    name="{{inputName}}"
                    on-input="onChange($event)"
                    autoComplete='off'
                    value="{{inputDisplayValue}}"
                    placeholder="{{placeholder}}"
                    style="{{inputStyle}}"
                >
            </div>
        </div>
    `
    
    static components = {
        'input-handler': InputHandle
    }

    static computed: Computed = {
        outClasses(this: InputNumber) {
            const focused = this.data.get('autoFocus');
            const disabled = this.data.get('disabled');
            const size = this.data.get('size');
            let classArr = [prefixCls];

            focused && classArr.push(`${prefixCls}-focused`);
            disabled && classArr.push(`${prefixCls}-disabled`);
            size === 'large' && classArr.push(`${prefixCls}-lg`);
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            return classArr;
        }
    }

    initData(): State {
        return {
            disabled: false,
            size: 'default',
            step: 1,
            inputDisplayValue: 1,
        };
    }

    static messages: Messages = {
        santd_inputnumber_up() {
            // 拿到当前的value，然后通过step，进行+step
            this.valueWillHandle('up', 'change');
        },
        santd_inputnumber_down() {
            this.valueWillHandle('down', 'change');
        }
    }

    inited() {
        let defaultValue = this.data.get('defaultValue') || this.data.get('value') || '';
        this.data.set('inputDisplayValue', this.inputDisplayValueFormat(defaultValue));
        this.watch('value', value => {
            this.data.set('inputDisplayValue', this.inputDisplayValueFormat(value));
        });
    }

    valueWillHandle(direction: string, moving: string) {
        const parser = this.data.get('parser');
        const step = this.data.get('step');
        let inputValue = this.getValueFromEvent(this.data.get('inputDisplayValue') || '');

        inputValue = (typeof parser === 'function') ? parser(inputValue) : inputValue;
        this.stepFn(inputValue, step, direction, moving);
    }

    /**
    * 计算上一步/下一步数值
    * @param {string| number} num 要处理前的input-value
    * @param {number} ratio  每一次要处理的区间
    * @param {string} type 是要加还是减操作
    * @param {string} fireEvent 要触发的自定义事件
    */
    stepFn(num: string | number, ratio: string | number = 1, type: string, fireEvent: string) {
        if (this.data.get('disabled')) {
            return false;
        }
        const max = this.data.get('max');
        const min = this.data.get('min');
        const value = this.getCurrentValidValue(num, max!, min!) || 0;
        if (this.isNotCompleteNumber(value)) {
            return false;
        }
        const val = this.getStep(value, ratio, min!, type);
        this.setStatus(val, max!, min!, fireEvent);
    }

    /**
    * 动态设置value并fire事件
    *
    * @param {number| string} val value值
    * @param {number} max 最大值
    * @param {number} min 最小值
    * @param {string} fireEvent 向外fire的自定义事件名
    */
    setStatus(val: number | string, max: number | string, min: number | string, fireEvent: string) {
        if (this.isNotCompleteNumber(val)) {
            this.setNotNumberStatus(fireEvent);
            return false;
        }
        this.data.set('upDisabledConfirm', val >= max);
        this.data.set('downDisabledConfirm', val <= min);
        // val <= max && val >= min && this.fire(fireEvent, val);
        val = val > max ? max : val < min ? min : val;
        this.fire(fireEvent, val);
        this.data.set('inputDisplayValue', this.inputDisplayValueFormat(val));
    }

    setNotNumberStatus(fireEvent: string) {
        this.data.set('upDisabledConfirm', false);
        this.data.set('downDisabledConfirm', false);
        this.fire(fireEvent, null);
        this.data.set('inputDisplayValue', null);
    }

    getStep(val: number | string, rat: number | string, min: number | string, type: string) {
        // 获取到最大精度
        const precisionFactor = this.getPrecisionFactor(val, rat);
        const precision = Math.abs(+this.getMaxPrecision(val, rat));
        let result;
        if (typeof val === 'number') {
            const value = type === 'up' ? val + Number(rat) : val - Number(rat);
            result = (precisionFactor * value / precisionFactor).toFixed(precision);
        }
        else {
            result = min === -Infinity ? rat : min;
        }
        return this.toNumber(result);
    }

    toNumber(num: number | string) {
        if (this.isNotCompleteNumber(num)) {
            return num;
        }
        const precision = this.data.get('precision');
        return Number(precision || precision === 0 ? Number(num).toFixed(+precision) : num);
    }

    getPrecision(value: number | string) {
        const valueString = value.toString();
        if (valueString.indexOf('e-') >= 0) {
            return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
        }
        return valueString.indexOf('.') >= 0
            ? valueString.length - valueString.indexOf('.') - 1
            : 0;
    }

    // 获取数值精度，如：value=1.21, step=1.1
    getMaxPrecision(currentValue: number | string, ratio: number | string) {
        const precision = this.data.get('precision');
        if (precision) {
            return precision;
        }
        const ratioPrecision = this.getPrecision(ratio);
        const step = this.data.get('step');
        const stepPrecision = this.getPrecision(step);
        // 处理现有value精度
        const currentValuePrecision = this.getPrecision(currentValue);
        // 返回小数位后最大精度
        return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    }

    getPrecisionFactor(currentValue: number | string, ratio: number | string = 1) {
        const precision = this.getMaxPrecision(currentValue, ratio);
        return Math.pow(10, +precision);
    }

    getCurrentValidValue(num: number | string, max: number | string, min: number | string) {
        return this.toNumber(!this.isNotCompleteNumber(num) ? this.getValidValue(num, max, min) : num);
    }

    getValidValue(value: number | string, max: number | string, min: number | string) {
        let val = parseFloat(value.toString());
        if (isNaN(val)) {
            return value;
        }
        return (val > +max) ? +max : (val < +min) ? +min : val;
    }

    // 判断number
    isNotCompleteNumber(num: number | string ) {
        return (
            isNaN(+num)
            || num === ''
            || num === null
            || (num && num.toString().indexOf('.') === num.toString().length - 1)
          );
    }

    inputDisplayValueFormat(num: number | string) {
        const formatter = this.data.get('formatter');
        const decimalSeparator = this.data.get('decimalSeparator');
        if (num.toString() === '-0') {
            return '-0';
        }
        if (decimalSeparator !== undefined) {
            num = num.toString().replace('.', decimalSeparator);
        }
        if (formatter && typeof formatter === 'function') {
            return this.data.get('formatter')(num);
        }

        return num;
    }

    onFocus(e: Event) {
        this.fire('focus', e);
    }

    onBlur(e: {target: {value: any}}) {
        const max = this.data.get('max');
        const min = this.data.get('min');
        const formatter = this.data.get('formatter');
        const parser = this.data.get('parser');
        let input = this.getValueFromEvent(e.target?.value);
        if (typeof formatter === 'function' && typeof parser === 'function') {
            input = parser(input);
        }
        let value = this.getCurrentValidValue(input, max!, min!);
        let newValue = this.isNotCompleteNumber(parseFloat(value.toString())) ? undefined : parseFloat(value.toString());
        this.setStatus(newValue || '', max!, min!, 'change');
        this.fire('blur', newValue);
    }

    onKeyDown(e: {target: {value: any}, keyCode: number}) {
        const step = this.data.get('step');
        const inputValue = e.target.value;
        if (e.keyCode === 38) {
            this.stepFn(inputValue, step, 'up', 'keydown');
        }
        else if (e.keyCode === 40) {
            this.stepFn(inputValue, step, 'down', 'keydown');
        }
        else if (e.keyCode === 13) {
            this.fire('pressEnter', e);
        }
    }

    getValueFromEvent(value: number | string) {
        const decimalSeparator = this.data.get('decimalSeparator');
        return decimalSeparator ? value.toString().replace(decimalSeparator, '.') : value;
    }

    onKeyUp(e: Event) {
        this.fire('keyup', e);
    }

    onChange(e: {target: {value: any}}) {
        // 记录input时的change，并fire出去
        const formatter = this.data.get('formatter');
        const parser = this.data.get('parser');
        let input = e.target.value;
        let formatInput;
        input = this.getValueFromEvent(input);
        if (typeof formatter === 'function' && typeof parser === 'function') {
            input = parser(input);
        }
        formatInput = this.inputDisplayValueFormat(input);
        this.data.set('inputDisplayValue', formatInput);
        this.fire('change', input);
        this.dispatch('UI:form-item-interact', {fieldValue: input, type: 'change', e});
    }

    focus() {
        (this.ref('realInput') as unknown as HTMLInputElement).focus();
    }

    blur() {
        (this.ref('realInput') as unknown as HTMLInputElement).blur();
    }

    attached() {
        this.nextTick(() => {
            if (this.data.get('autoFocus') && !this.data.get('disabled')) {
                this.focus();
            }
        });
    }
};
