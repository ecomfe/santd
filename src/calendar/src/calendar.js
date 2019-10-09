/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Base from './base';
import CalendarHeader from './calendar/calendarHeader';
import CalendarFooter from './calendar/calendarFooter';
import DateTable from './date/dateTable';
import DateInput from './date/dateInput';
import inherits from '../../core/util/inherits';
import moment from 'moment';
import {getTimeConfig, getTodayTime, syncTime} from './util';

export default inherits(san.defineComponent({
    components: {
        's-calendarheader': CalendarHeader,
        's-calendarfooter': CalendarFooter,
        's-datetable': DateTable,
        's-dateinput': DateInput
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
        let value = this.data.get('value') || this.data.get('defaultValue') || moment();
        let selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
        const localeCode = this.data.get('localeCode');

        // 如果有国际化编码，对moment进行国际化处理
        localeCode && moment.locale(localeCode);
        localeCode && value && value.locale(localeCode);

        this.data.set('mode', mode || 'date');
        this.data.set('value', value);
        this.data.set('selectedValue', selectedValue);
    },

    // 处理日期点击事件
    handleDateTableSelect(value) {
        const selectedValue = this.data.get('selectedValue');
        const timePicker = this.data.get('timePicker');
        if (!selectedValue && timePicker) {
            const timePickerDefaultValue = timePicker.prototype.initData().defaultValue;
            if (timePickerDefaultValue) {
                syncTime(timePickerDefaultValue, value);
            }
        }
        this.fire('select', {value});
        // this.dispatch('santd_calendar_select', {value, cause: null});
    },

    // 处理弹出层中的输入框输入事件
    handleDateInputChange(value) {
        if (value) {
            this.fire('select', {value, cause: {source: 'dateInput'}});
            // this.dispatch('santd_calendar_select', {value: value.clone(), cause: null});
        }
    },
    handlePanelChange({value, mode}) {
        this.data.set('mode', mode);
        if (value) {
            this.data.set('value', value);
        }
        this.fire('panelChange', {value: value || this.data.get('value'), mode});
        this.dispatch('santd_calendar_panelChange', {value: value || this.data.get('value'), mode});
        if (this.onPanelChange) {
            this.onPanelChange(value || this.data.get('value'), mode);
        }
    },
    handleToday() {
        const value = this.data.get('value');
        const now = getTodayTime(value);
        this.fire('select', {value: now, cause: {source: 'todayButton'}});
        this.dispatch('santd_calendar_select', {value: now, cause: {source: 'todayButton'}});
    },
    handleOk() {
        const selectedValue = this.data.get('selectedValue');
        if (this.isAllowedDate(selectedValue)) {
            this.fire('ok', selectedValue);
            this.dispatch('santd_calendar_ok', selectedValue);
        }
    },
    handleOpenTimePicker() {
        this.handlePanelChange({value: null, mode: 'time'});
    },
    handleCloseTimePicker() {
        this.handlePanelChange({value: null, mode: 'date'});
    },
    handleDateInputClear() {
        this.fire('clear');
    },
    getTimeConfig(selectedValue, disabledTime, mode) {
        const showTimePicker = this.data.get('mode') === 'time';
        const timePicker = this.data.get('timePicker');
        if (showTimePicker && timePicker && disabledTime) {
            const config = getTimeConfig(selectedValue, disabledTime);
            return config[mode];
        }
    },
    template: `
        <div
            class="{{classes}}"
            tabIndex="0"
        >
            <div class="{{prefixCls}}-panel" key="panel">
                <s-dateinput
                    s-if="showDateInput"
                    format="{{getFormat()}}"
                    value="{{value || defaultValue}}"
                    locale="{{locale}}"
                    placeholder="{{dateInputPlaceholder}}"
                    showClear
                    disabledTime="{{disabledTime}}"
                    disabledDate="{{disabledDate}}"
                    prefixCls="{{prefixCls}}"
                    selectedValue="{{selectedValue}}"
                    on-clear="handleDateInputClear"
                    on-change="handleDateInputChange"
                    inputMode="{{inputMode}}"
                />
                <div class="{{prefixCls}}-date-panel">
                    <s-calendarheader
                        locale="{{locale}}"
                        mode="{{mode}}"
                        value="{{value || defaultValue}}"
                        on-valueChange="setValue"
                        on-panelChange="handlePanelChange"
                        showTimePicker="{{mode === 'time'}}"
                        prefixCls="{{prefixCls}}"
                        hasExtraFooter="{{hasExtraFooter}}"
                    >
                        <slot name="renderExtraFooter" slot="renderExtraFooter" />
                    </s-calendarheader>
                    <div class="{{prefixCls}}-time-picker" s-if="timePicker && mode === 'time'">
                        <div class="{{prefixCls}}-time-picker-panel">
                            <timepicker
                                value="{{value}}"
                                disabledHours="{{getTimeConfig(selectedValue, disabledTime, 'disabledHours')}}"
                                disabledMinutes="{{getTimeConfig(selectedValue, disabledTime, 'disabledMinutes')}}"
                                disabledSeconds="{{getTimeConfig(selectedValue, disabledTime, 'disabledSeconds')}}"
                                on-change="handleDateInputChange"
                                disabledTime="{{disabledTime}}"
                            />
                        </div>
                    </div>
                    <div class="{{prefixCls}}-body">
                        <s-datetable
                            locale="{{locale}}"
                            value="{{value || defaultValue}}"
                            selectedValue="{{selectedValue}}"
                            prefixCls="{{prefixCls}}"
                            dateRender="{{dateRender}}"
                            disabledDate="{{disabledDate}}"
                            showWeekNumber="{{showWeekNumber}}"
                            on-select="handleDateTableSelect"
                        />
                    </div>
                    <s-calendarfooter
                        showOk="{{showOk}}"
                        mode="{{mode}}"
                        locale="{{locale}}"
                        prefixCls="{{prefixCls}}"
                        showToday="{{showToday}}"
                        disabledTime="{{disabledTime}}"
                        showTimePicker="{{mode === 'time'}}"
                        showDateInput="{{showDateInput}}"
                        timePicker="{{timePicker}}"
                        selectedValue="{{selectedValue}}"
                        value="{{value}}"
                        disabledDate="{{disabledDate}}"
                        okDisabled="{{showOk !== false && (!selectedValue || !isAllowedDate(selectedValue))}}"
                        hasExtraFooter="{{hasExtraFooter}}"
                        on-today="handleToday"
                        on-ok="handleOk"
                        on-openTimePicker="handleOpenTimePicker"
                        on-closeTimePicker="handleCloseTimePicker"
                    >
                        <slot name="renderExtraFooter" slot="renderExtraFooter" />
                    </s-calendarfooter>
                </div>
            </div>
        </div>
    `
}), Base);
