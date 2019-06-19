/**
 * @file Santd calendar range panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import CalendarHeader from '../calendar/calendarHeader';
import DateTable from '../date/dateTable';
import DateInput from '../date/dateInput';
import {getTimeConfig} from '../util/index';
import classNames from 'classnames';
import moment from 'moment';

export default san.defineComponent({
    components: {
        's-calendarheader': CalendarHeader,
        's-datetable': DateTable,
        's-dateinput': DateInput
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const rangeClassName = prefixCls + '-range';
            const direction = this.data.get('direction');

            return classNames(`${rangeClassName}-part`, `${rangeClassName}-${direction}`);
        },
        injectTimePicker() {
            const timePicker = this.data.get('timePicker');
            const instance = this.data.get('instance');
            if (instance && timePicker) {
                instance.components.timepicker = timePicker;
            }
        }
    },
    initData() {
        return {
            visible: true,
            prefixCls: 'san-calendar',
            className: '',
            showToday: true,
            showDateInput: true,
            timePicker: null,
            focusablePanel: true
        };
    },
    inited() {
        const mode = this.data.get('mode');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const selectedValue = this.data.get('selectedValue');
        const defaultSelectedValue = this.data.get('defaultSelectedValue');

        this.data.set('mode', mode || 'date');
        this.data.set('value', value || defaultValue || moment());
        this.data.set('selectedValue', selectedValue || defaultSelectedValue);
        this.data.set('instance', this);
    },
    handleDateTableSelect(value) {
        this.fire('select', value);
    },
    handleDateInputChange(value) {
        this.fire('inputChange', value);
    },
    handlePanelChange({value, mode}) {
        this.fire('panelChange', {value, mode});
    },
    handleValueChange(value) {
        this.fire('valueChange', value);
    },
    handleDayHover(value) {
        this.fire('dayHover', value);
    },
    handleInputChange(value) {
        this.fire('inputChange', value);
    },
    handleDateInputClear() {
        this.fire('clear');
    },
    dateInputValue(selectedValue) {
        const direction = this.data.get('direction');
        const value = selectedValue[direction === 'left' ? 0 : 1];
        return value && value.clone();
    },
    getTimeConfig(selectedValue, disabledTime, mode) {
        const showTimePicker = this.data.get('showTimePicker');
        const timePicker = this.data.get('timePicker');
        if (showTimePicker && timePicker && disabledTime) {
            const config = getTimeConfig(selectedValue, disabledTime);
            return config[mode];
        }
    },
    template: `
        <div class="{{classes}}">
            <div class="{{prefixCls}}-panel" key="panel">
                <s-dateinput
                    s-if="showDateInput"
                    format="{{format}}"
                    locale="{{locale}}"
                    prefixCls="{{prefixCls}}"
                    timePicker="{{timePicker}}"
                    disabledDate="{{disabledDate}}"
                    placeholder="{{placeholder}}"
                    disabledTime="{{disabledTime}}"
                    value="{{value || defaultValue}}"
                    showClear="{{false}}"
                    selectedValue="{{dateInputValue(selectedValue)}}"
                    clearIcon="{{clearIcon}}"
                    on-clear="handleDateInputClear"
                    on-change="handleDateInputChange"
                />
                <div>
                    <s-calendarheader
                        locale="{{locale}}"
                        mode="{{mode}}"
                        value="{{value || defaultValue}}"
                        renderFooter="{{renderFooter}}"
                        showTimePicker="{{showTimePicker}}"
                        prefixCls="{{prefixCls}}"
                        enableNext="{{enableNext}}"
                        enablePrev="{{enablePrev}}"
                        disabledMonth="{{disabledMonth}}"
                        on-valueChange="handleValueChange"
                        on-panelChange="handlePanelChange"
                    />
                    <div class="{{prefixCls}}-time-picker" s-if="timePicker && showTimePicker">
                        <div class="{{prefixCls}}-time-picker-panel">
                            <timepicker
                                value="{{dateInputValue(selectedValue)}}"
                                disabledHours="{{getTimeConfig(selectedValue, disabledTime, 'disabledHours')}}"
                                disabledMinutes="{{getTimeConfig(selectedValue, disabledTime, 'disabledMinutes')}}"
                                disabledSeconds="{{getTimeConfig(selectedValue, disabledTime, 'disabledSeconds')}}"
                                on-change="handleInputChange"
                            />
                        </div>
                    </div>
                    <div class="{{prefixCls}}-body">
                        <s-datetable
                            locale="{{locale}}"
                            value="{{value || defaultValue}}"
                            hoverValue="{{hoverValue}}"
                            showTimePicker="{{showTimePicker}}"
                            selectedValue="{{selectedValue}}"
                            prefixCls="{{prefixCls}}"
                            dateRender="{{dateRender}}"
                            disabledDate="{{disabledDate}}"
                            showWeekNumber="{{showWeekNumber}}"
                            on-select="handleDateTableSelect"
                            on-dayHover="handleDayHover"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
});
