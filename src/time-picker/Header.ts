/**
 * @file Santd timepicker header file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {HeaderState, HeaderProps} from './interface';

dayjs.extend(customParseFormat);

export default class Header extends Base<HeaderState, HeaderProps> {
    initData() {
        return {
            invalid: false,
            inputReadOnly: false
        };
    }
    static computed = {
        showTime(this: Header) {
            const value = this.data.get('value');
            const format = this.data.get('format');

            return value && value.format(format);
        }
    }
    attached() {
        const focusOnOpen = this.data.get('focusOnOpen');
        if (focusOnOpen) {
            (this.ref('input') as unknown as HTMLInputElement).focus();
            (this.ref('input') as unknown as HTMLInputElement).select();
        }
    }
    handleKeyDown(e: {keyCode: number}) {
        if (e.keyCode === 27) {
            this.fire('esc', e);
        }
        this.fire('keydown', e);
    }
    handleChange(e: {target: {value: any}}) {
        const inputValue = e.target.value;
        const {
            format,
            hourOptions,
            minuteOptions,
            secondOptions,
            disabledHours,
            disabledMinutes,
            disabledSeconds
        } = this.data.get();

        if (inputValue) {
            const originalValue = this.data.get('value');
            let value = this.data.get('value') || this.data.get('defaultOpenValue');
            const parsed = dayjs(inputValue, format, true);
            if (!parsed.isValid()) {
                this.data.set('invalid', true);
                return;
            }
            value = value
                .hour(parsed.hour())
                .minute(parsed.minute())
                .second(parsed.second());

            // if time value not allowed, response warning.
            if (
                hourOptions!.indexOf(value.hour()) < 0
                || minuteOptions!.indexOf(value.minute()) < 0
                || secondOptions!.indexOf(value.second()) < 0
            ) {
                this.data.set('invalid', true);
                return;
            }

            // if time value is disabled, response warning.
            const disabledHourOptions = disabledHours!();
            const disabledMinuteOptions = disabledMinutes!(value.hour());
            const disabledSecondOptions = disabledSeconds!(value.hour(), value.minute());
            if (
                (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0)
                || (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0)
                || (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
            ) {
                this.data.set('invalid', true);
                return;
            }

            if (originalValue) {
                if (
                    originalValue.hour() !== value.hour()
                    || originalValue.minute() !== value.minute()
                    || originalValue.second() !== value.second()
                ) {
                    const changedValue = originalValue
                        .hour(value.hour())
                        .minute(value.minute())
                        .second(value.second());
                    this.fire('change', changedValue);
                }
            }
            else if (originalValue !== value) {
                this.fire('change', value);
            }
        }
        else {
            this.fire('change', null);
        }

        this.data.set('invalid', false);
    }
    static template = `<div class="{{prefixCls}}-input-wrap">
        <input
            class="{{prefixCls}}-input {{invalid ? prefixCls + '-input-invalid' : ''}}"
            value="{{showTime}}"
            placeholder="{{placeholder}}"
            readOnly="{{!!inputReadOnly}}"
            on-change="handleChange"
            on-keydown="handleKeyDown"
            s-ref="input"
        />
    </div>`
};
