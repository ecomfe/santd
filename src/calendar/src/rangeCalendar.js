/**
 * @file Santd range calendar source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Base from './base';
import DateTable from './date/dateTable';
import MonthTable from './month/monthTable';
import CalendarHeader from './fullCalendarHeader';
import RangePanel from './range/rangePanel';
import TodayButton from './calendar/todayButton';
import OkButton from './calendar/okButton';
import TimePickerButton from './calendar/timepickerButton';
import inherits from '../../core/util/inherits';
import moment from 'moment';
import {syncTime, getTodayTime, isAllowedDate} from './util';

function isEmptyArray(arr) {
    return Array.isArray(arr) && (arr.length === 0 || arr.every(i => !i));
}

function getValueFromSelectedValue(selectedValue) {
    let [start, end] = selectedValue;
    if (end && (start === undefined || start === null)) {
        start = end.clone().subtract(1, 'month');
    }

    if (start && (end === undefined || end === null)) {
        end = start.clone().add(1, 'month');
    }
    return [start, end];
}

function normalizeAnchor(data, init) {
    const selectedValue = data.get('selectedValue') || init && data.get('defaultSelectedValue');
    const value = data.get('value') || init && data.get('defaultValue');
    const normalizedValue = value
        ? getValueFromSelectedValue(value)
        : getValueFromSelectedValue(selectedValue);
    return !isEmptyArray(normalizedValue) ? normalizedValue : init && [moment(), moment().add(1, 'months')];
}

export default inherits(san.defineComponent({
    initData() {
        return {
            prefixCls: 'san-calendar',
            type: 'both',
            seperator: '~',
            defaultSelectedValue: [],
            showToday: true,
            showDateInput: true,
            panelTriggerSource: '',
            hoverValue: [],
            selectedValue: [],
            disabledTime() {}
        };
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const showTimePicker = this.data.get('showTimePicker');
            const showWeekNumber = this.data.get('showWeekNumber');

            let classArr = [className, prefixCls, `${prefixCls}-range`];
            showTimePicker && classArr.push(`${prefixCls}-show-time-picker`);
            showWeekNumber && classArr.push(`${prefixCls}-week-number`);
            return classArr;
        },
        footerClass() {
            const prefixCls = this.data.get('prefixCls');
            const showOkButton = this.data.get('showOkButton');

            let classArr = [`${prefixCls}-footer`, `${prefixCls}-range-bottom`];
            showOkButton && classArr.push(`${prefixCls}-footer-show-ok`);
            return classArr;
        },
        mode() {
            return this.data.get('propMode') || ['date', 'date'];
        },
        showOkButton() {
            const showOk = this.data.get('showOk');
            const timePicker = this.data.get('timePicker');

            return showOk || showOk !== false && !!timePicker;
        },
        hasSelectedValue() {
            const selectedValue = this.data.get('selectedValue') || [];
            return !!selectedValue[1] && !!selectedValue[0];
        },
        isAllowedDateAndTime() {
            const selectedValue = this.data.get('selectedValue') || [];
            const disabledDate = this.data.get('disabledDate');
            const disabledStartTime = this.data.get('disabledStartTime');
            const disabledEndTime = this.data.get('disabledEndTime');
            return isAllowedDate(selectedValue[0], disabledDate, disabledStartTime)
                && isAllowedDate(selectedValue[1], disabledDate, disabledEndTime);
        },
        disabledStartTime() {
            const disabledTime = this.data.get('disabledTime');
            return function (time) {
                return disabledTime(time, 'start');
            };
        },
        disabledEndTime() {
            const disabledTime = this.data.get('disabledTime');
            return function (time) {
                return disabledTime(time, 'end');
            };
        },
        disabledStartMonth() {
            const value = this.data.get('value');
            return function (month) {
                return month.isAfter(value[1], 'month');
            };
        },
        disabledEndMonth() {
            const value = this.data.get('value');
            return function (month) {
                return month.isBefore(value[0], 'month');
            };
        },
        placeholder() {
            const dateInputPlaceholder = this.data.get('dateInputPlaceholder');
            if (Array.isArray(dateInputPlaceholder)) {
                return {
                    value1: dateInputPlaceholder[0],
                    value2: dateInputPlaceholder[1]
                };
            }
            return {
                value1: dateInputPlaceholder,
                value2: dateInputPlaceholder
            };
        },
        getStartValue() {
            const selectedValue = this.data.get('selectedValue') || [];
            const showTimePicker = this.data.get('showTimePicker');
            const value = this.data.get('value');
            const mode = this.data.get('mode');
            const panelTriggerSource = this.data.get('panelTriggerSource');
            if (!value) {
                return;
            }
            let startValue = value[0];
            // keep selectedTime when select date
            if (selectedValue[0] && this.data.get('timePicker')) {
                startValue = startValue.clone();
                syncTime(selectedValue[0], startValue);
            }
            if (showTimePicker && selectedValue[0]) {
                startValue = selectedValue[0];
            }

            // Adjust month if date not align
            if (panelTriggerSource === 'end' && mode[0] === 'date' && mode[1] === 'date'
                && startValue.isSame(value[1], 'month')) {
                startValue = startValue.clone().subtract(1, 'month');
            }

            return startValue;
        },
        getEndValue() {
            const selectedValue = this.data.get('selectedValue') || [];
            const showTimePicker = this.data.get('showTimePicker');
            const value = this.data.get('value');
            const mode = this.data.get('mode');
            const panelTriggerSource = this.data.get('panelTriggerSource');
            if (!value) {
                return;
            }
            let endValue = value[1] ? value[1].clone() : value[0].clone().add(1, 'month');
            // keep selectedTime when select date
            if (selectedValue[1] && this.data.get('timePicker')) {
                syncTime(selectedValue[1], endValue);
            }
            if (showTimePicker) {
                endValue = selectedValue[1] ? selectedValue[1] : this.data.get('getStartValue');
            }

            // Adjust month if date not align
            if (!showTimePicker && panelTriggerSource !== 'end' && mode[0] === 'date' && mode[1] === 'date'
                && endValue.isSame(value[0], 'month')) {
                endValue = endValue.clone().add(1, 'month');
            }

            return endValue;
        },
        isTodayInView() {
            const startValue = this.data.get('getStartValue');
            const endValue = this.data.get('getEndValue');
            if (!startValue) {
                return;
            }
            const todayTime = getTodayTime(startValue);
            const thisMonth = todayTime.month();
            const thisYear = todayTime.year();

            return startValue.year() === thisYear && startValue.month() === thisMonth
                || endValue.year() === thisYear && endValue.month() === thisMonth;
        }
    },
    inited() {
        const selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
        const value = normalizeAnchor(this.data, true);
        const localeCode = this.data.get('localeCode');

        this.data.set('selectedValue', selectedValue);
        this.data.set('prevSelectedValue', selectedValue);
        this.data.set('firstSelectedValue', null);

        localeCode && moment.locale(localeCode);
        localeCode && value[0].locale(localeCode);
        localeCode && value[1].locale(localeCode);
        this.data.set('value', value);
        this.data.set('instance', this);
    },
    fireSelectValueChange(selectedValue, direct, cause) {
        const {
            timePicker,
            prevSelectedValue
        } = this.data.get();

        if (timePicker && timePicker.prototype.initData().defaultValue) {
            const timePickerDefaultValue = timePicker.prototype.initData().defaultValue;
            if (!prevSelectedValue[0] && selectedValue[0]) {
                syncTime(timePickerDefaultValue[0], selectedValue[0]);
            }
            if (!prevSelectedValue[1] && selectedValue[1]) {
                syncTime(timePickerDefaultValue[1], selectedValue[1]);
            }
        }

        if (selectedValue[0] && !selectedValue[1]) {
            this.data.set('firstSelectedValue', selectedValue[0]);
            this.fireHoverValueChange(selectedValue.concat());
        }
        this.fire('change', selectedValue);
        this.dispatch('santd_calendar_change', selectedValue);
        if (direct || selectedValue[0] && selectedValue[1]) {
            this.data.set('prevSelectedValue', selectedValue);
            this.data.set('firstSelectedValue', null);
            this.fireHoverValueChange([]);
            this.fire('select', {selectedValue, cause});
            this.dispatch('santd_calendar_select', {value: selectedValue, cause});
        }
    },
    compare(v1, v2) {
        if (this.data.get('timePicker')) {
            return v1.diff(v2);
        }
        return v1.diff(v2, 'days');
    },
    isMonthYearPanelShow(mode) {
        return ['month', 'year', 'decade'].indexOf(mode) > -1;
    },
    fireHoverValueChange(hoverValue) {
        this.data.set('hoverValue', hoverValue);
        this.fire('hoverChange', hoverValue);
        this.dispatch('santd_calendar_hoverChange', hoverValue);
    },
    handleDatePanelLeave() {
        const type = this.data.get('type');
        if (type === 'both') {
            return;
        }
        const hasSelectedValue = this.data.get('hasSelectedValue');
        if (hasSelectedValue) {
            this.fireHoverValueChange([]);
        }
    },
    handleDatePanelEnter() {
        const type = this.data.get('type');
        if (type === 'both') {
            return;
        }
        const hasSelectedValue = this.data.get('hasSelectedValue');
        if (hasSelectedValue) {
            this.fireHoverValueChange(this.data.get('selectedValue').concat());
        }
    },
    handleClear() {
        this.fireSelectValueChange([], true);
        this.fire('clear');
    },
    handleRangeSelect(value) {
        const {
            type,
            selectedValue,
            prevSelectedValue,
            firstSelectedValue
        } = this.data.get();

        let nextSelectedValue;
        if (type === 'both') {
            if (!firstSelectedValue) {
                syncTime(prevSelectedValue[0], value);
                nextSelectedValue = [value];
            }
            else if (this.compare(firstSelectedValue, value) < 0) {
                syncTime(prevSelectedValue[1], value);
                nextSelectedValue = [firstSelectedValue, value];
            }
            else {
                syncTime(prevSelectedValue[0], value);
                syncTime(prevSelectedValue[1], firstSelectedValue);
                nextSelectedValue = [value, firstSelectedValue];
            }
        }
        else if (type === 'start') {
            syncTime(prevSelectedValue[0], value);
            const endValue = selectedValue[1];
            nextSelectedValue = endValue && this.compare(endValue, value) > 0 ? [value, endValue] : [value];
        }
        else { // type === 'end'
            const startValue = selectedValue[0];
            if (startValue && this.compare(startValue, value) <= 0) {
                syncTime(prevSelectedValue[1], value);
                nextSelectedValue = [startValue, value];
            }
            else {
                syncTime(prevSelectedValue[0], value);
                nextSelectedValue = [value];
            }
        }

        this.fireSelectValueChange(nextSelectedValue);
    },
    handleDayHover(value) {
        let hoverValue = [];
        const {
            selectedValue,
            firstSelectedValue,
            type
        } = this.data.get();

        const prevHoverValue = this.data.get('hoverValue');

        if (type === 'start' && selectedValue[1] || type === 'end' && selectedValue[0] || !!prevHoverValue.length) {

            if (type === 'start' && selectedValue[1]) {
                hoverValue = this.compare(value, selectedValue[1]) < 0 ? [value, selectedValue[1]] : [value];
            }
            else if (type === 'end' && selectedValue[0]) {
                hoverValue = this.compare(value, selectedValue[0]) > 0 ? [selectedValue[0], value] : [];
            }
            else {
                if (!firstSelectedValue) {
                    if (this.data.get('hoverValue').length) {
                        this.data.set('hoverValue', []);
                    }
                    return hoverValue;
                }
                hoverValue = this.compare(value, firstSelectedValue) < 0
                    ? [value, firstSelectedValue]
                    : [firstSelectedValue, value];
            }
            this.fireHoverValueChange(hoverValue);
        }
    },
    handleToday() {
        const startValue = getTodayTime(this.data.get('value')[0]);
        const endValue = startValue.clone().add(1, 'months');
        this.data.set('value', [startValue, endValue]);
    },
    handleOpenTimePicker() {
        this.data.set('showTimePicker', true);
    },
    handleCloseTimePicker() {
        this.data.set('showTimePicker', false);
    },
    handleOk() {
        const selectedValue = this.data.get('selectedValue');
        const isAllowedDateAndTime = this.data.get('isAllowedDateAndTime');
        if (isAllowedDateAndTime) {
            this.fire('ok', selectedValue);
            this.dispatch('santd_calendar_ok', selectedValue);
        }
    },
    handleStartValueChange(leftValue) {
        this.data.set('value[0]', leftValue);
        this.fire('valueChange', this.data.get('value'));
        this.dispatch('santd_calendar_valueChange', this.data.get('value'));
    },
    handleEndValueChange(rightValue) {
        this.data.set('value[1]', rightValue);
        this.fire('valueChange', this.data.get('value'));
        this.dispatch('santd_calendar_valueChange', this.data.get('value'));
    },
    handleStartPanelChange({value, mode}) {
        const newMode = [mode, this.data.get('mode')[1]];
        const prevValue = this.data.get('value');
        if (!this.data.get('propMode')) {
            this.data.set('mode', newMode);
        }
        this.data.set('panelTriggerSource', 'start');
        const newValue = [value || prevValue[0], prevValue[1]];
        this.fire('panelChange', {value: newValue, mode: newMode});
        this.dispatch('santd_calendar_panelChange', {value: newValue, mode: newMode});
    },
    handleEndPanelChange({value, mode}) {
        const newMode = [this.data.get('mode')[0], mode];
        const prevValue = this.data.get('value');
        if (!this.data.get('propMode')) {
            this.data.set('mode', newMode);
        }
        this.data.set('panelTriggerSource', 'end');
        const newValue = [prevValue[0], value || prevValue[1]];
        this.fire('panelChange', {value: newValue, mode: newMode});
        this.dispatch('santd_calendar_panelChange', {value: newValue, mode: newMode});
    },
    handleInputSelect(direction, value, cause) {
        if (!value) {
            return;
        }

        const originalValue = this.data.get('selectedValue');
        const selectedValue = originalValue.concat();
        const index = direction === 'left' ? 0 : 1;
        selectedValue[index] = value;
        if (selectedValue[0] && this.compare(selectedValue[0], selectedValue[1]) > 0) {
            selectedValue[1 - index] = this.data.get('showTimePicker') ? selectedValue[index] : undefined;
        }
        this.fire('inputSelect', selectedValue);
        this.fireSelectValueChange(selectedValue, null, cause || {source: 'dateInput'});
    },
    handleStartInputChange(value) {
        this.handleInputSelect('left', value);
    },
    handleEndInputChange(value) {
        this.handleInputSelect('right', value);
    },
    updated() {
        this.data.set('prevSelectedValue', this.data.get('selectedValue'));
    },
    components: {
        's-rangepanel': RangePanel,
        's-todaybutton': TodayButton,
        's-timepickerbutton': TimePickerButton,
        's-okbutton': OkButton
    },
    template: `
        <div class="{{classes}}" tabIndex="0">
            <div class="{{prefixCls}}-panel">
                <a
                    s-if="showClear && selectedValue[0] && selectedValue[1]"
                    role="button"
                    on-click="handleClear"
                >
                    <span class="{{prefixCls}}-clear-btn" />
                </a>
                <div
                    class="{{prefixCls}}-date-panel"
                    on-mouseleave="handleDatePanelLeave"
                    on-mouseenter="handleDatePanelEnter"
                >
                    <s-rangepanel
                        value="{{getStartValue}}"
                        locale="{{locale}}"
                        selectedValue="{{selectedValue}}"
                        hoverValue="{{hoverValue}}"
                        direction="left"
                        disabledTime="{{disabledStartTime}}"
                        disabledMonth="{{disabledStartMonth}}"
                        format="{{getFormat()}}"
                        placeholder="{{placeholder.value1}}"
                        showDateInput="{{showDateInput}}"
                        timePicker="{{timePicker}}"
                        showTimePicker="{{showTimePicker}}"
                        enablePrev
                        enableNext="{{!isClosestMonths || isMonthYearPanelShow(mode[1])}}"
                        mode="{{mode[0]}}"
                        dateRender="{{dateRender}}"
                        disabledDate="{{disabledDate}}"
                        on-select="handleRangeSelect"
                        on-dayHover="handleDayHover"
                        on-valueChange="handleStartValueChange"
                        on-panelChange="handleStartPanelChange"
                        on-inputChange="handleStartInputChange"
                    />
                    <span class="{{prefixCls}}-range-middle">{{seperator}}</span>
                    <s-rangepanel
                        value="{{getEndValue}}"
                        locale="{{locale}}"
                        selectedValue="{{selectedValue}}"
                        hoverValue="{{hoverValue}}"
                        direction="right"
                        disabledTime="{{disabledEndTime}}"
                        disabledMonth="{{disabledEndMonth}}"
                        format="{{getFormat()}}"
                        placeholder="{{placeholder.value2}}"
                        showDateInput="{{showDateInput}}"
                        timePicker="{{timePicker}}"
                        showTimePicker="{{showTimePicker}}"
                        enableNext
                        enablePrev="{{!isClosestMonths || isMonthYearPanelShow(mode[0])}}"
                        mode="{{mode[1]}}"
                        dateRender="{{dateRender}}"
                        disabledDate="{{disabledDate}}"
                        on-select="handleRangeSelect"
                        on-dayHover="handleDayHover"
                        on-valueChange="handleEndValueChange"
                        on-panelChange="handleEndPanelChange"
                        on-inputChange="handleEndInputChange"
                    />
                </div>
                <div class="{{footerClass}}">
                    <div
                        class="{{prefixCls}}-footer-btn"
                        s-if="showToday || timePicker || showOkButton || hasExtraFooter"
                    >
                        <div class="{{prefixCls}}-footer-extra" s-if="hasExtraFooter">
                            <slot name="renderExtraFooter" />
                        </div>
                        <s-todaybutton
                            s-if="showToday"
                            disabled="{{isTodayInView}}"
                            value="{{value[0]}}"
                            text="{{locale.backToToday}}"
                            disabledDate="{{disabledDate}}"
                            locale="{{locale}}"
                            prefixCls="{{prefixCls}}"
                            timePicker="{{timePicker}}"
                            on-today="handleToday"
                        />
                        <s-timepickerbutton
                            s-if="timePicker"
                            locale="{{locale}}"
                            showTimePicker="{{showTimePicker}}"
                            timePickerDisabled="{{!hasSelectedValue || !!hoverValue.length}}"
                            prefixCls="{{prefixCls}}"
                            on-openTimePicker="handleOpenTimePicker"
                            on-closeTimePicker="handleCloseTimePicker"
                        />
                        <s-okbutton
                            s-if="showOkButton"
                            locale="{{locale}}"
                            prefixCls="{{prefixCls}}"
                            okDisabled="{{!isAllowedDateAndTime || !hasSelectedValue || !!hoverValue.length}}"
                            on-ok="handleOk"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
}), Base);
