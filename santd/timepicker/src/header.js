/**
 * @file Santd timepicker header file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import moment from 'moment';

export default san.defineComponent({
    dataTypes: {
        format: DataTypes.string,
        prefixCls: DataTypes.string,
        placeholder: DataTypes.string,
        value: DataTypes.object,
        inputReadOnly: DataTypes.bool,
        hourOptions: DataTypes.array,
        minuteOptions: DataTypes.array,
        secondOptions: DataTypes.array,
        disabledHours: DataTypes.func,
        disabledMinutes: DataTypes.func,
        disabledSeconds: DataTypes.func,
        defaultOpenValue: DataTypes.object,
        focusOnOpen: DataTypes.bool
    },
    initData() {
        return {
            invalid: false,
            inputReadOnly: false
        };
    },
    computed: {
        inputClass() {
            const prefixCls = this.data.get('prefixCls');
            const invalid = this.data.get('invalid');

            return classNames(`${prefixCls}-input`, {
                [`${prefixCls}-input-invalid`]: invalid
            });
        }
    },
    inited() {
        const value = this.data.get('value');
        const format = this.data.get('format');

        this.data.set('str', value && value.format(format) || '');

        this.watch('value', val => {
            this.data.set('str', val && val.format(format) || '');
        });

        this.watch('refresh', val => {
            const value = this.data.get('value');
            this.data.set('str', value && value.format(format) || '');
        });
    },
    attached() {
        const focusOnOpen = this.data.get('focusOnOpen');
        if (focusOnOpen) {
            this.ref('input').focus();
            this.ref('input').select();
        }
    },
    handleKeyDown(e) {
        if (e.keyCode === 27) {
            this.fire('esc', e);
        }
        this.fire('keydown', e);
    },
    handleChange(e) {
        const str = e.target.value;
        this.data.set('str', str);
        const {
            format,
            hourOptions,
            minuteOptions,
            secondOptions,
            disabledHours,
            disabledMinutes,
            disabledSeconds
        } = this.data.get();

        if (str) {
            const originalValue = this.data.get('value');
            const value = this.data.get('value') || this.data.get('defaultOpenValue');
            const parsed = moment(str, format, true);
            if (!parsed.isValid()) {
                this.data.set('invalid', true);
                return;
            }
            value
                .hour(parsed.hour())
                .minute(parsed.minute())
                .second(parsed.second());

            // if time value not allowed, response warning.
            if (
                hourOptions.indexOf(value.hour()) < 0
                || minuteOptions.indexOf(value.minute()) < 0
                || secondOptions.indexOf(value.second()) < 0
            ) {
                this.data.set('invalid', true);
                return;
            }

            // if time value is disabled, response warning.
            const disabledHourOptions = disabledHours();
            const disabledMinuteOptions = disabledMinutes(value.hour());
            const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
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
                    const changedValue = originalValue.clone();
                    changedValue.hour(value.hour());
                    changedValue.minute(value.minute());
                    changedValue.second(value.second());
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
    },
    template: `<div class="{{prefixCls}}-input-wrap">
        <input
            className="{{inputClass}}"
            value="{{str}}"
            placeholder="{{placeholder}}"
            readOnly="{{!!inputReadOnly}}"
            on-change="handleChange"
            on-keydown="handleKeyDown"a
            s-ref="input"
        />
    </div>`
});
