/**
 * @file Santd week picker createpicker file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Picker from '../calendar/src/picker';
import Calendar from '../calendar/src/calendar';
import classNames from 'classnames';
import moment from 'moment';
import {classCreator} from 'santd/core/util';
import inherits from 'santd/core/util/inherits';
import Icon from 'santd/icon';

const prefixCls = classCreator('calendar')();

export default san.defineComponent({
    computed: {
        classes() {
            const className = this.data.get('className');
            const pickerClass = this.data.get('pickerClass');

            return classNames(className, pickerClass);
        },
        calendar() {
            const disabledDate = this.data.get('disabledDate');
            const disabledTime = this.data.get('disabledTime');
            const timePicker = this.data.get('timePicker');
            const defaultValue = this.data.get('defaultPickerValue') || moment();
            const dateInputPlaceholder = this.data.get('placeholder');
            const prefixCls = this.data.get('prefixCls');
            const dateRender = this.data.get('dateRender');
            const format = this.data.get('format');
            const showToday = this.data.get('showToday');
            const monthCellContentRender = this.data.get('monthCellContentRender');
            const renderFooter = this.data.get('renderFooter');
            const value = this.data.get('value');
            const showTime = this.data.get('showTime');
            const instance = this.data.get('instance');

            return inherits(san.defineComponent({
                initData() {
                    return {
                        showWeekNumber: true,
                        prefixCls,
                        format,
                        showDateInput: false,
                        showToday: false,
                        disabledDate,
                        renderFooter,
                        value: value || defaultValue
                    };
                },
                onChange(value) {
                    instance.data.set('value', value);
                    instance.fire('change', {date: value, dateString: value && value.format(format)});
                },
                onPanelChange(value, mode) {
                    instance.fire('panelChange', {value, mode});
                },
                onOk(value) {
                    instance.fire('ok', value);
                }
            }), Calendar);
        },
        displayValue() {
            const value = this.data.get('value');
            const format = this.data.get('format');
            return value && value.format(format);
        },
        injectInputIcon() {
            const suffixIcon = this.data.get('suffixIcon');
            const instance = this.data.get('instance');

            let inputIcon;
            if (typeof suffixIcon === 'function') {
                inputIcon = suffixIcon;
            }
            else if (typeof suffixIcon === 'string') {
                inputIcon = san.defineComponent({
                    template: `<span class="{{className}}">
                            {{suffixIcon}}
                        </span>`
                });
            }
            else {
                inputIcon = Icon;
            }
            instance && (instance.components.inputicon = inputIcon);
        }
    },
    initData() {
        return {
            prefixCls,
            allowClear: true,
            format: 'gggg-wo',
            placeholder: '请选择日期'
        };
    },
    inited() {
        this.data.set('instance', this);
        this.data.set('inputStyle', this.data.get('style'));
        this.data.set('style', {});
    },
    handleCalendarChange(value) {
        this.data.set('value', value);
    },
    handleOpenChange(open) {
        this.data.set('open', open);
        this.fire('openChange', open);
    },
    handleClearSelection(e) {
        e.preventDefault();
        e.stopPropagation();

        this.data.set('value', null);
        this.fire('change', {date: null, dateString: null});
    },
    handleChange(value) {
        const format = this.data.get('format');
        this.data.set('value', value, {force: true});
        this.fire('change', {date: value, dateString: value && value.format(format)});
    },
    components: {
        's-picker': Picker,
        's-icon': Icon
    },
    template: `<span
            id="{{id}}"
            class="{{classes}}"
        >
            <s-picker
                calendar="{{calendar}}"
                value="{{value}}"
                prefixCls="{{prefixCls}}-picker-container"
                style="{{popupStyle}}"
                transitionName="{{transitionName}}"
                dropdownClassName="{{dropdownClassName}}"
                getCalendarContainer="{{getCalendarContainer}}"
                open="{{open}}"
                on-visibleChange="handleOpenChange"
                on-change="handleChange"
            >
                <div>
                    <input
                        disabled="{{disabled}}"
                        readOnly
                        value="{{displayValue}}"
                        placeholder="{{placeholder}}"
                        className="{{pickerInputClass}}"
                        tabIndex="{{tabIndex}}"
                        name="{{name}}"
                        style="{{inputStyle}}"
                    />
                    <s-icon
                        s-if="!disabled && allowClear && value"
                        type="close-circle"
                        class="{{prefixCls}}-picker-clear"
                        theme="filled"
                        on-click="handleClearSelection"
                    />
                    <inputicon className="{{prefixCls}}-picker-icon" type="calendar"/>
                </div>
            </s-picker>
        </span>`
});
