/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/

import Base from './Base';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import DateTable from './date/DateTable';
import DateInput from './date/DateInput';
import dayjs from 'dayjs';
import * as I from './interface';
import {getTimeConfig, getTodayTime, syncTime} from './util';
import {dayjsType, disabledTimeFunctionType} from '../interface';

export default class CalendarComponent extends Base {
    static components =  {
        's-calendarheader': CalendarHeader,
        's-calendarfooter': CalendarFooter,
        's-datetable': DateTable,
        's-dateinput': DateInput
    };
    static initData(): I.CalendarComponentState {
        return {
            visible: true,
            prefixCls: 'santd-calendar',
            showToday: true,
            showDateInput: true,
            focusablePanel: true
        };
    };
    inited(): void {
        const mode = this.data.get('mode');
        let value = this.data.get('value') || this.data.get('defaultValue') || dayjs();
        let selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
        const localeCode = this.data.get('localeCode');

        // 如果有国际化编码，对dayjs进行国际化处理
        if (localeCode) {
            require(`dayjs/locale/${localeCode}.js`);
            dayjs.locale(localeCode);
            if (value) {
                value = value.locale(localeCode);
            }
        }

        this.data.set('mode', mode || 'date');
        this.data.set('value', value);
        this.data.set('selectedValue', selectedValue);
    };

    // 处理日期点击事件
    handleDateTableSelect(value: dayjsType): void {
        const selectedValue = this.data.get('selectedValue');
        const showTime = this.data.get('showTime');
        if (!selectedValue && showTime) {
            const timePickerDefaultValue = showTime.defaultValue || dayjs();
            if (timePickerDefaultValue) {
                value = syncTime(timePickerDefaultValue, value);
            }
        }
        this.fire('select', {value});
    };

    // 处理弹出层中的输入框输入事件
    handleDateInputChange(value: dayjsType): void {
        if (value) {
            this.fire('select', {value, cause: {source: 'dateInput'}});
        }
    };
    // onPanelChange: (arg0: dayjsType, mode: string) => {} | null = null;
    handlePanelChange({value, mode}: {value: dayjsType | null, mode: string}): void {
        this.data.set('mode', mode);
        if (value) {
            this.data.set('value', value);
        }
        this.fire('panelChange', {value: value || this.data.get('value'), mode});
        this.dispatch('santd_calendar_panelChange', {value: value || this.data.get('value'), mode});
    };
    handleToday(): void {
        const value = this.data.get('value');
        const now = getTodayTime(value);
        this.fire('select', {value: now, cause: {source: 'todayButton'}});
        this.dispatch('santd_calendar_select', {value: now, cause: {source: 'todayButton'}});
    };
    handleOk(): void {
        const selectedValue = this.data.get('selectedValue');
        if (this.isAllowedDate(selectedValue)) {
            this.fire('ok', selectedValue);
            this.dispatch('santd_calendar_ok', selectedValue);
        }
    };
    handleOpenTimePicker(): void {
        this.handlePanelChange({value: null, mode: 'time'});
    };
    handleCloseTimePicker(): void {
        this.handlePanelChange({value: null, mode: 'date'});
    };
    handleDateInputClear(): void {
        this.fire('clear');
    };
    getTimeConfig(selectedValue: dayjsType, disabledTime: disabledTimeFunctionType, mode: string): void {
        const showTimePicker = this.data.get('mode') === 'time';
        if (showTimePicker && disabledTime) {
            const config = getTimeConfig(selectedValue, disabledTime);
            return (config as any)[mode];
        }
    };
    static template = /* html */ `
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
                    inputReadOnly="{{inputReadOnly}}"
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
                    <div class="{{prefixCls}}-time-picker" s-if="showTime && mode === 'time'">
                        <div class="{{prefixCls}}-time-picker-panel">
                            <s-timepicker
                                class="{{prefixCls}}-time-picker-column-{{columns}}"
                                showHour="{{showHour}}"
                                showMinute="{{showMinute}}"
                                showSecond="{{showSecond}}"
                                use12Hours="{{showTime && showTime.use12Hours}}"
                                hideDisabledOptions="{{showTime && showTime.hideDisabledOptions}}"
                                defaultOpenValue="{{showTime && showTime.defaultValue || value}}"
                                prefixCls="{{prefixCls}}-time-picker"
                                columns="{{columns}}"
                                disabledHours="{{getTimeConfig(selectedValue, disabledTime, 'disabledHours')}}"
                                disabledMinutes="{{getTimeConfig(selectedValue, disabledTime, 'disabledMinutes')}}"
                                disabledSeconds="{{getTimeConfig(selectedValue, disabledTime, 'disabledSeconds')}}"
                                on-change="handleDateInputChange"
                                value="{{showTime && showTime.defaultValue || value}}"
                            />
                        </div>
                    </div>
                    <div class="{{prefixCls}}-body">
                        <s-datetable
                            locale="{{locale}}"
                            value="{{value || defaultValue}}"
                            selectedValue="{{selectedValue}}"
                            prefixCls="{{prefixCls}}"
                            disabledDate="{{disabledDate}}"
                            showWeekNumber="{{showWeekNumber}}"
                            hasDateRender="{{hasDateRender}}"
                            on-select="handleDateTableSelect"
                        >
                            <slot name="dateRender" slot="dateRender" var-current="{{current}}" />
                        </s-datetable>
                    </div>
                    <s-calendarfooter
                        mode="{{mode}}"
                        locale="{{locale}}"
                        prefixCls="{{prefixCls}}"
                        showToday="{{showToday}}"
                        disabledTime="{{disabledTime}}"
                        showTimePicker="{{mode === 'time'}}"
                        showDateInput="{{showDateInput}}"
                        showTime="{{showTime}}"
                        selectedValue="{{selectedValue}}"
                        value="{{value}}"
                        disabledDate="{{disabledDate}}"
                        disabled="{{!selectedValue || !isAllowedDate(selectedValue)}}"
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
};
