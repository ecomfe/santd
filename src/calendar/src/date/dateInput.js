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
        value: DataTypes.object,
        disabledTime: DataTypes.func,
        format: DataTypes.oneOfType([DataTypes.string, DataTypes.arrayOf(DataTypes.string)]),
        locale: DataTypes.object,
        disabledDate: DataTypes.func,
        placeholder: DataTypes.string,
        selectedValue: DataTypes.object,
        inputMode: DataTypes.string
    },

    initData() {
        return {
            showDate: '',
            invalid: false,
            hasFocus: true
        };
    },

    inited() {
        const format = this.data.get('format');
        this.data.set('showDate', formatDate(this.data.get('selectedValue'), format));
        this.watch('selectedValue', val => {
            this.data.set('showDate', formatDate(val, format));
        });
    },

    attached() {
        if (this.data.get('hasFocus')) {
            this.nextTick(() => {
                this.ref('input').focus();
            });
        }
    },

    handleClear() {
        this.data.set('showDate', '');
        this.fire('clear');
    },

    handleChange(e) {
        const showDate = e.target.value;
        const {
            disabledDate,
            format,
            selectedValue
        } = this.data.get();

        // 没有内容，合法并直接退出
        if (!showDate) {
            this.fire('change', null);
            this.data.set('invalid', false);
            this.data.set('showDate', '');
            return;
        }

        // 不合法直接退出
        const parsed = moment(showDate, format, true);
        if (!parsed.isValid()) {
            this.data.set('invalid', true);
            this.data.set('showDate', showDate);
            return;
        }

        const value = this.data.get('value').clone();
        value.year(parsed.year())
            .month(parsed.month())
            .date(parsed.date())
            .hour(parsed.hour())
            .minute(parsed.minute())
            .second(parsed.second());

        if (!value || (disabledDate && disabledDate(value))) {
            this.data.set('invalid', true);
            this.data.set('showDate', showDate);
            return;
        }

        if (selectedValue !== value || (
            selectedValue && value && !selectedValue.isSame(value)
        )) {
            this.data.set('invalid', false);
            this.data.set('showDate', showDate);
            this.fire('change', value);
        }
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
                    class="{{prefixCls}}-input {{invalid ? prefixCls + '-input-invalid' : ''}}"
                    value="{{showDate}}"
                    disabled="{{disabled}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-input="handleChange"
                    on-keydown="handleKeyDown"
                    inputMode="{{inputMode}}"
                    s-ref="input"
                />
            </div>
        </div>
    `
});
