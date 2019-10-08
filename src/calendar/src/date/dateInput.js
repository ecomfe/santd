/**
 * @file Santd calendar date input file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import moment from 'moment';
import {formatDate} from '../util/index';
import KeyCode from '../../../core/util/keyCode';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        timePicker: DataTypes.func,
        value: DataTypes.object,
        disabledTime: DataTypes.func,
        format: DataTypes.oneOfType([DataTypes.string, DataTypes.arrayOf(DataTypes.string)]),
        locale: DataTypes.object,
        disabledDate: DataTypes.func,
        placeholder: DataTypes.string,
        selectedValue: DataTypes.object,
        clearIcon: DataTypes.func,
        inputMode: DataTypes.string
    },
    initData() {
        return {
            str: '',
            invalid: false,
            hasFocus: false
        };
    },
    inited() {
        const format = this.data.get('format');
        this.data.set('str', formatDate(this.data.get('selectedValue'), format));
        this.watch('selectedValue', val => {
            this.data.set('str', formatDate(val, format));
        });
    },
    attached() {
        if (this.data.get('hasFocus')) {
            this.ref('input').focus();
        }
    },
    computed: {
        invalidClass() {
            const invalid = this.data.get('invalid');
            const prefixCls = this.data.get('prefixCls');
            return invalid ? prefixCls + '-input-invalid' : '';
        }
    },
    handleClear() {
        this.data.set('str', '');
        this.fire('clear');
    },
    handleChange(e) {
        const str = e.target.value;
        const {
            disabledDate,
            format,
            selectedValue
        } = this.data.get();

        // 没有内容，合法并直接退出
        if (!str) {
            this.fire('change', null);
            this.data.set('invalid', false);
            this.data.set('str', '');
            return;
        }

        // 不合法直接退出
        const parsed = moment(str, format, true);
        if (!parsed.isValid()) {
            this.data.set('invalid', true);
            this.data.set('str', str);
            return;
        }

        const value = this.data.get('value').clone();
        value
            .year(parsed.year())
            .month(parsed.month())
            .date(parsed.date())
            .hour(parsed.hour())
            .minute(parsed.minute())
            .second(parsed.second());

        if (!value || (disabledDate && disabledDate(value))) {
            this.data.set('invalid', true);
            this.data.set('str', str);
            return;
        }

        if (selectedValue !== value || (
            selectedValue && value && !selectedValue.isSame(value)
        )) {
            this.data.set('invalid', false);
            this.data.set('str', str);
            this.fire('change', value);
        }
    },
    handleFocus() {
        this.data.set('hasFocus', true);
    },
    handleBlur() {
        const value = this.data.get('value');
        const format = this.data.get('format');
        this.data.set('hasFocus', false);
        this.data.set('str', formatDate(value, format));
    },
    handleKeyDown(e) {
        const disabledDate = this.data.get('disabledDate');
        const value = this.data.get('value');
        if (e.keyCode === KeyCode.ENTER) {
            const validateDate = !disabledDate || !disabledDate(value);
            if (validateDate) {
                this.fire('select', value.clone());
            }
        }
    },
    template: `
        <div class="{{prefixCls}}-input-wrap">
            <div class="{{prefixCls}}-date-input-wrap">
                <input
                    class="{{prefixCls}}-input {{invalidClass}}"
                    value="{{str}}"
                    disabled="{{disabled}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-input="handleChange"
                    on-focus="handleFocus"
                    on-blur="handleBlur"
                    on-keydown="handleKeyDown"
                    inputMode="{{inputMode}}"
                    s-ref="input"
                />
                <a role="button" title="{{locale.clear}} on-click="handleClear" s-if="showClear">
                    <span class="{{prefixCls}}-clear-btn"></span>
                </a>
            </div>
        </div>
    `
});
