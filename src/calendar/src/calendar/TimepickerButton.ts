/**
 * @file Santd calendar timepicker button file
 * @author mayihui@baidu.com
 **/
import Base from 'santd/base';
import * as I from './interface';

export default class TimepickerButton extends Base<I.TimepickerButtonState, I.TimepickerButtonProps, I.TimepickerButtonComputed> {
    handleClick() {
        const showTimePicker = this.data.get('showTimePicker');
        if (!this.data.get('disabled')) {
            this.fire(showTimePicker ? 'closeTimePicker' : 'openTimePicker');
        }
    };
    static template = /* html */ `
        <a
            class="{{prefixCls}}-time-picker-btn {{disabled ? prefixCls + '-time-picker-btn-disabled' : ''}}"
            role="button"
            on-click="handleClick"
        >
            {{showTimePicker ? locale.dateSelect : locale.timeSelect}}
        </a>
    `
};
