/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarFooter from './calendar/CalendarFooter';
import DateTable from './date/DateTable';
import DateInput from './date/DateInput';
import dayjs from 'dayjs';
import * as I from './interface';
import {getTimeConfig, getTodayTime, syncTime} from './util';
import {dayjsType, disabledTimeFunctionType} from '../interface';
import locale from './locale/en_US';
import {isAllowedDate} from './util/index';
import TimePickerPanel from '../../time-picker/Panel';

export default class CalendarComponent extends Base {
    static components =  {
        's-calendarheader': CalendarHeader,
        's-calendarfooter': CalendarFooter,
        's-datetable': DateTable,
        's-dateinput': DateInput,
        's-timepicker': TimePickerPanel,
    };
    initData(): I.CalendarComponentState {
        return {
            visible: true,
            prefixCls: 'santd-calendar',
            showToday: true,
            showDateInput: true,
            focusablePanel: true,
            timeFormat: 'HH:mm:ss',
            locale: locale,
        };
    };
    static computed: I.CalendarBaseComputed = {
        classes(this: CalendarComponent) {
            const prefixCls = this.data.get('prefixCls');
            const customClassName = this.data.get('customClassName');
            const visible = this.data.get('visible');
            const showWeekNumber = this.data.get('showWeekNumber');

            let classArr = [prefixCls, customClassName];
            !visible && classArr.push(`${prefixCls}-hidden`);
            showWeekNumber && classArr.push(`${prefixCls}-week-number`);
            return classArr;
        },
        showHour(this: CalendarComponent) {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
        },
        showMinute(this: CalendarComponent) {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('m') > -1;
        },
        showSecond(this: CalendarComponent) {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('s') > -1;
        },
        columns(this: CalendarComponent) {
            const showHour = this.data.get('showHour');
            const showMinute = this.data.get('showMinute');
            const showSecond = this.data.get('showSecond');
            const use12Hours = this.data.get('use12Hours');
            let column = 0;
            showHour && ++column;
            showMinute && ++column;
            showSecond && ++column;
            use12Hours && ++column;
            return column;
        }
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

    getFormat() {
        const {locale, showTime, format} = this.data.get('');

        if (format) {
            return format;
        }

        if (showTime) {
            return locale.dateTimeFormat;
        }

        return locale.dateFormat;
    };

    focus(): void {
        if (this.ref('focusEl')) {
            (this.ref('focusEl') as unknown as HTMLElement).focus();
        }
        else if (this.el) {
            (this.el as unknown as HTMLElement).focus();
        }
    };

    handleSelect(value: dayjsType, cause: dayjsType): void  {
        if (value) {
            this.setValue(value);
        }
        this.setSelectedValue(value, cause);
    };
    setSelectedValue(selectedValue: dayjsType, cause: dayjsType): void  {
        this.data.set('selectedValue', selectedValue);
        this.fire('select', {selectedValue, cause});
    };

    setValue(value: dayjsType): void  {
        const originalValue = this.data.get('value');

        this.data.set('value', value);
        if (originalValue && value && !originalValue.isSame(value) || originalValue || value) {
            this.fire('change', value);
        }
    };

    isAllowedDate(value: dayjsType): boolean {
        const disabledDate = this.data.get('disabledDate');
        const disabledTime = this.data.get('disabledTime');
        return isAllowedDate(value, disabledDate, disabledTime);
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
