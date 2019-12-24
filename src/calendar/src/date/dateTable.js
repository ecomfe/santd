/**
 * @file Santd calendar date table file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import moment from 'moment';
import {getTitleString, getTodayTime} from '../util/index';

const ROW = 6;
const COL = 7;

function isSameDay(one, two) {
    return one && two && one.isSame(two, 'day');
}

function beforeCurrentMonthYear(current, today) {
    if (current.year() < today.year()) {
        return 1;
    }
    return current.year() === today.year() && current.month() < today.month();
}

function afterCurrentMonthYear(current, today) {
    if (current.year() > today.year()) {
        return 1;
    }
    return current.year() === today.year() && current.month() > today.month();
}

export default san.defineComponent({
    dataTypes: {
        disabledDate: DataTypes.func,
        renderFooter: DataTypes.func,
        rootPrefixCls: DataTypes.string,
        value: DataTypes.object,
        defaultValue: DataTypes.object
    },
    computed: {
        dates() {
            /* eslint-disable no-unused-vars */
            const prefixCls = this.data.get('prefixCls');
            const locale = this.data.get('locale');
            const value = this.data.get('value') || moment();
            const today = getTodayTime(value);
            const selectedValue = this.data.get('selectedValue');
            const hoverValue = this.data.get('hoverValue');
            const disabledDate = this.data.get('disabledDate');
            const month = value.clone();
            month.date(1);
            const day = month.day();
            const lastMonthDiffDay = (day + 7 - value.localeData().firstDayOfWeek()) % 7;
            const lastMonth = month.clone();
            lastMonth.add(0 - lastMonthDiffDay, 'days');
            const dataTable = [];
            let passed = 0;
            let current;

            for (let i = 0; i < ROW; i++) {
                dataTable[i] = {
                    isCurrentWeek: false,
                    isActiveWeek: false
                };
                dataTable[i].current = [];
                for (let j = 0; j < COL; j++) {
                    current = lastMonth;
                    if (passed) {
                        current = current.clone();
                        current.add(passed, 'days');
                    }
                    dataTable[i].current.push({data: current});
                    dataTable[i].week = current.week();

                    // 开始处理各种样式
                    let next = null;
                    let last = null;
                    if (j < COL - 1) {
                        next = current.clone().add(passed + 1, 'days');
                    }
                    if (j > 0) {
                        last = current.clone().add(passed - 1, 'days');
                    }
                    let className = [`${prefixCls}-cell`];
                    let disabled = false;
                    let selected = false;
                    if (isSameDay(current, today)) {
                        className.push(`${prefixCls}-today`);
                        dataTable[i].isCurrentWeek = true;
                    }

                    const isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
                    const isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

                    if (selectedValue && Array.isArray(selectedValue)) {
                        const rangeValue = hoverValue.length ? hoverValue : selectedValue;
                        if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
                            const startValue = rangeValue[0];
                            const endValue = rangeValue[1];
                            if (startValue) {
                                if (isSameDay(current, startValue)) {
                                    selected = true;
                                    dataTable[i].isActiveWeek = true;
                                    className.push(`${prefixCls}-selected-start-date`);
                                }
                            }
                            if (startValue || endValue) {
                                if (isSameDay(current, endValue)) {
                                    selected = true;
                                    dataTable[i].isActiveWeek = true;
                                    className.push(`${prefixCls}-selected-end-date`);
                                }
                                else if ((!startValue && current.isBefore(endValue, 'day'))
                                    || (!endValue && current.isAfter(startValue, 'day'))
                                    || (current.isAfter(startValue, 'day') && current.isBefore(endValue, 'day'))
                                ) {
                                    className.push(`${prefixCls}-in-range-cell`);
                                }
                            }
                        }
                    }
                    else if (isSameDay(current, value)) {
                        selected = true;
                        dataTable[i].isActiveWeek = true;
                    }

                    isSameDay(current, selectedValue) && className.push(`${prefixCls}-selected-date`);
                    isBeforeCurrentMonthYear && className.push(`${prefixCls}-last-month-cell`);
                    isAfterCurrentMonthYear && className.push(`${prefixCls}-next-month-btn-day`);
                    (current.clone().endOf('month').date() === current.date()) && className.push(` ${prefixCls}-last-day-of-month`);

                    if (disabledDate) {
                        if (disabledDate(current, value)) {
                            disabled = true;

                            (!last || !disabledDate(last, value)) && className.push(`${prefixCls}-disabled-cell-first-of-row`);
                            (!next || !disabledDate(next, value)) && className.push(`${prefixCls}-disabled-cell-last-of-row`);
                        }
                    }

                    selected && className.push(`${prefixCls}-selected-day`);
                    disabled && className.push(`${prefixCls}-disabled-cell`);
                    dataTable[i].current[j].className = className.join(' ');
                    dataTable[i].current[j].selected = selected;
                    dataTable[i].current[j].disabled = disabled;
                    passed++;
                }
            }
            return dataTable;
        },
        weeks() {
            const locale = this.data.get('locale');
            const value = this.data.get('value') || moment();
            const localeData = value.localeData();
            const firstDayOfWeek = localeData.firstDayOfWeek();
            const weekDays = [];
            const veryShortWeekdays = [];
            const now = moment();

            for (let dateColIndex = 0; dateColIndex < COL; dateColIndex++) {
                const index = (firstDayOfWeek + dateColIndex) % COL;
                now.day(index);
                veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
                weekDays[dateColIndex] = localeData.weekdaysShort(now);
            }
            return {
                veryShortWeekdays,
                weekDays
            };
        }
    },
    inited() {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
    },
    handlePreviousYear() {
        this.fire('changeYear', -1);
    },
    handleYearPanelShow() {
        this.fire('yearPanelShow');
    },
    handleNextYear() {
        this.fire('changeYear', 1);
    },
    setAndSelectValue(value) {
        this.data.set('value', value);
        this.fire('select', value);
    },
    getTrClassName(date) {
        const prefixCls = this.data.get('prefixCls');
        let classArr = [];
        date.isCurrentWeek && classArr.push(`${prefixCls}-current-week`);
        date.isActiveWeek && classArr.push(`${prefixCls}-active-week`);
        return classArr;
    },
    getTitleString(current) {
        return getTitleString(current.data);
    },
    handleClick(disabled, value) {
        if (!disabled) {
            this.fire('select', value);
        }
    },
    handleMouseEnter(disabled, value) {
        this.fire('dayHover', value);
    },
    getDate(value) {
        return value.date();
    },
    template: `
        <table class="{{prefixCls}}-table" cellspacing="0" role="grid">
            <thead>
                <tr role="row">
                    <th
                        s-if="showWeekNumber"
                        role="columnheader"
                        class="{{prefixCls}}-column-header {{prefixCls}}-week-number-header"
                    >
                        <span class="{{prefixCls}}-column-header-inner">x</span>
                    </th>
                    <th
                        s-for="day, index in weeks.weekDays"
                        role="columnheader"
                        title="{{day}}"
                        class="{{prefixCls}}-column-header"
                    >
                        <span class="{{prefixCls}}-column-header-inner">
                            {{weeks.veryShortWeekdays[index]}}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="{{prefixCls}}-tbody">
                <tr
                    s-for="date, index in dates"
                    role="row"
                    class="{{getTrClassName(date)}}"
                >
                    <td
                        s-if="showWeekNumber"
                        role="gridcell"
                        class="{{prefixCls}}-week-number-cell"
                    >
                        {{date.week}}
                    </td>
                    <td
                        s-for="current in date.current"
                        role="gridcell"
                        title="{{getTitleString(current)}}"
                        class="{{current.className}}"
                        on-click="handleClick(current.disabled, current.data)"
                        on-mouseenter="handleMouseEnter(current.disabled, current.data)"
                    >
                        <slot
                            s-if="hasDateRender"
                            name="dateRender"
                            var-current="{{current.data}}"
                            var-date="{{getDate(current.data)}}"
                            var-value="{{current.data}}"
                        />
                        <div class="{{prefixCls}}-date" s-else>{{getDate(current.data)}}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    `
});
