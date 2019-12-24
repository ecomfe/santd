/**
 * @file Santd range calendar source file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Base from './base';
import RangePanel from './range/rangePanel';
import TodayButton from './calendar/todayButton';
import OkButton from './calendar/okButton';
import TimePickerButton from './calendar/timepickerButton';
import Tag from '../../tag';
import inherits from '../../core/util/inherits';
import moment from 'moment';
import {syncTime, getTodayTime, isAllowedDate, getTimeConfig} from './util';

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
            prefixCls: 'santd-calendar',
            type: 'both',
            seperator: '~',
            defaultSelectedValue: [],
            showToday: true,
            showDateInput: true,
            panelTriggerSource: '',
            hoverValue: [],
            selectedValue: [],
            disabledTime() {},
            mode: ['date', 'date']
        };
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const showTimePicker = this.data.get('showTimePicker');
            const showWeekNumber = this.data.get('showWeekNumber');

            let classArr = [prefixCls, `${prefixCls}-range`];
            showTimePicker && classArr.push(`${prefixCls}-show-time-picker`);
            showWeekNumber && classArr.push(`${prefixCls}-week-number`);
            return classArr;
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
        isClosestMonths() {
            const startValue = this.data.get('getStartValue');
            const endValue = this.data.get('getEndValue');
            const nextMonthOfStart = startValue.clone().add(1, 'months');

            return nextMonthOfStart.year() === endValue.year() && nextMonthOfStart.month() === endValue.month();
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
        getStartValue() {
            const selectedValue = this.data.get('selectedValue') || [];
            const showTimePicker = this.data.get('showTimePicker');
            const value = this.data.get('value');
            const mode = this.data.get('mode');
            const panelTriggerSource = this.data.get('panelTriggerSource');
            if (!value) {
                return;
            }
            let startValue = value[0].clone();
            // keep selectedTime when select date
            if (selectedValue[0] && this.data.get('showTime')) {
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
            if (selectedValue[1] && this.data.get('showTime')) {
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
        },
        rangesName() {
            return Object.keys(this.data.get('ranges') || {});
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
    },
    fireSelectValueChange(selectedValue, direct, cause) {
        const {
            showTime,
            prevSelectedValue
        } = this.data.get();

        if (showTime && showTime.defaultValue) {
            const timePickerDefaultValue = showTime.defaultValue;
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
        if (direct || selectedValue[0] && selectedValue[1]) {
            this.data.set('prevSelectedValue', selectedValue);
            this.data.set('firstSelectedValue', null);
            this.fireHoverValueChange([]);
            this.fire('select', {selectedValue, cause});
        }
    },
    compare(v1, v2) {
        if (this.data.get('showTime')) {
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
    },
    handleClear() {
        this.fireSelectValueChange([], true);
        this.fire('clear');
    },
    handleRangeSelect(value) {
        const {
            prevSelectedValue,
            firstSelectedValue
        } = this.data.get();

        let nextSelectedValue;
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

        this.fireSelectValueChange(nextSelectedValue);
    },
    handleDayHover(value) {
        if (!this.data.get('hoverValue').length) {
            return;
        }

        const {
            firstSelectedValue
        } = this.data.get();


        if (!firstSelectedValue) {
            if (this.data.get('hoverValue').length) {
                this.data.set('hoverValue', []);
            }
        }
        else {
            let hoverValue = this.compare(value, firstSelectedValue) < 0
                ? [value, firstSelectedValue]
                : [firstSelectedValue, value];
            this.fireHoverValueChange(hoverValue);
        }
    },
    handleToday() {
        const startValue = getTodayTime(this.data.get('value')[0]);
        const endValue = startValue.clone().add(1, 'months');
        this.data.set('value', [startValue, endValue]);
    },
    handleTimePicker(visible) {
        this.data.set('showTimePicker', visible);
    },
    handleOk() {
        const selectedValue = this.data.get('selectedValue');
        const isAllowedDateAndTime = this.data.get('isAllowedDateAndTime');
        if (isAllowedDateAndTime) {
            this.fire('ok', selectedValue);
        }
    },
    handleStartValueChange(leftValue) {
        this.data.set('value[0]', leftValue);
        this.fire('valueChange', this.data.get('value'));
    },
    handleEndValueChange(rightValue) {
        this.data.set('value[1]', rightValue);
        this.fire('valueChange', this.data.get('value'));
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

    getTimeConfig(selectedValue, disabledTime, mode) {
        const showTimePicker = this.data.get('showTimePicker');
        if (showTimePicker && disabledTime) {
            const config = getTimeConfig(selectedValue, disabledTime);
            return config[mode];
        }
    },

    updated() {
        this.data.set('prevSelectedValue', this.data.get('selectedValue'));
    },

    components: {
        's-rangepanel': RangePanel,
        's-todaybutton': TodayButton,
        's-timepickerbutton': TimePickerButton,
        's-okbutton': OkButton,
        's-tag': Tag
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
                <div class="{{prefixCls}}-date-panel">
                    <s-rangepanel
                        value="{{getStartValue}}"
                        locale="{{locale}}"
                        selectedValue="{{selectedValue}}"
                        hoverValue="{{hoverValue}}"
                        direction="left"
                        disabledTime="{{disabledStartTime}}"
                        disabledMonth="{{disabledStartMonth}}"
                        format="{{getFormat()}}"
                        placeholder="{{dateInputPlaceholder[0]}}"
                        showDateInput="{{showDateInput}}"
                        showTimePicker="{{showTimePicker}}"
                        enablePrev
                        enableNext="{{!isClosestMonths || isMonthYearPanelShow(mode[1])}}"
                        mode="{{mode[0]}}"
                        disabledDate="{{disabledDate}}"
                        hasDateRender="{{hasDateRender}}"
                        on-select="handleRangeSelect"
                        on-dayHover="handleDayHover"
                        on-valueChange="handleStartValueChange"
                        on-panelChange="handleStartPanelChange"
                        on-inputChange="handleStartInputChange"
                    >
                        <slot name="dateRender" slot="dateRender" var-current="{{current}}" />
                        <s-timepicker
                            slot="timepicker"
                            class="{{prefixCls}}-time-picker-column-{{columns}}"
                            showHour="{{showHour}}"
                            showMinute="{{showMinute}}"
                            showSecond="{{showSecond}}"
                            use12Hours="{{showTime && showTime.use12Hours}}"
                            hideDisabledOptions="{{showTime && showTime.hideDisabledOptions}}"
                            defaultOpenValue="{{showTime && showTime.defaultValue && showTime.defaultValue[0] || getStartValue}}"
                            prefixCls="{{prefixCls}}-time-picker"
                            columns="{{columns}}"
                            disabledHours="{{getTimeConfig(selectedValue, disabledStartTime, 'disabledHours')}}"
                            disabledMinutes="{{getTimeConfig(selectedValue, disabledStartTime, 'disabledMinutes')}}"
                            disabledSeconds="{{getTimeConfig(selectedValue, disabledStartTime, 'disabledSeconds')}}"
                            on-change="handleStartInputChange"
                            value="{{getStartValue}}"
                        />
                    </s-rangepanel>
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
                        placeholder="{{dateInputPlaceholder[1]}}"
                        showDateInput="{{showDateInput}}"
                        showTimePicker="{{showTimePicker}}"
                        enableNext
                        enablePrev="{{!isClosestMonths || isMonthYearPanelShow(mode[0])}}"
                        mode="{{mode[1]}}"
                        disabledDate="{{disabledDate}}"
                        hasDateRender="{{hasDateRender}}"
                        on-select="handleRangeSelect"
                        on-dayHover="handleDayHover"
                        on-valueChange="handleEndValueChange"
                        on-panelChange="handleEndPanelChange"
                        on-inputChange="handleEndInputChange"
                    >
                        <slot name="dateRender" slot="dateRender" var-current="{{current}}" />
                        <s-timepicker
                            slot="timepicker"
                            class="{{prefixCls}}-time-picker-column-{{columns}}"
                            showHour="{{showHour}}"
                            showMinute="{{showMinute}}"
                            showSecond="{{showSecond}}"
                            use12Hours="{{showTime && showTime.use12Hours}}"
                            hideDisabledOptions="{{showTime && showTime.hideDisabledOptions}}"
                            defaultOpenValue="{{showTime && showTime.defaultValue && showTime.defaultValue[1] || getEndValue}}"
                            prefixCls="{{prefixCls}}-time-picker"
                            columns="{{columns}}"
                            disabledHours="{{getTimeConfig(selectedValue, disabledEndTime, 'disabledHours')}}"
                            disabledMinutes="{{getTimeConfig(selectedValue, disabledEndTime, 'disabledMinutes')}}"
                            disabledSeconds="{{getTimeConfig(selectedValue, disabledEndTime, 'disabledSeconds')}}"
                            on-change="handleEndInputChange"
                            value="{{getEndValue}}"
                        />
                    </s-rangepanel>
                </div>
                <div
                    class="{{prefixCls}}-footer {{prefixCls}}-range-bottom {{showTime ? prefixCls + '-footer-show-ok' : ''}}"
                    s-if="showToday || showTime || hasExtraFooter || ranges"
                >
                    <div class="{{prefixCls}}-footer-btn">
                        <div s-if="rangesName.length" class="{{prefixCls}}-footer-extra {{prefixCls}}-range-quick-selector">
                            <s-tag
                                s-for="range in rangesName"
                                color="blue"
                                on-mouseenter="native:fireHoverValueChange(ranges[range])"
                                on-mouseleave="native:fireHoverValueChange([])"
                                on-click="fireSelectValueChange(ranges[range])"
                            >
                                {{range}}
                            </s-tag>
                        </div>
                        <div class="{{prefixCls}}-footer-extra" s-else-if="hasExtraFooter">
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
                            on-today="handleToday"
                        />
                        <s-timepickerbutton
                            s-if="showTime"
                            locale="{{locale}}"
                            showTimePicker="{{showTimePicker}}"
                            disabled="{{!hasSelectedValue || !!hoverValue.length}}"
                            prefixCls="{{prefixCls}}"
                            on-openTimePicker="handleTimePicker(true)"
                            on-closeTimePicker="handleTimePicker(false)"
                        />
                        <s-okbutton
                            s-if="showTime"
                            locale="{{locale}}"
                            prefixCls="{{prefixCls}}"
                            disabled="{{!isAllowedDateAndTime || !hasSelectedValue || !!hoverValue.length}}"
                            on-ok="handleOk"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
}), Base);
