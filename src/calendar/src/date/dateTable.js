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
                    let className = `${prefixCls}-cell`;
                    let disabled = false;
                    let selected = false;
                    if (isSameDay(current, today)) {
                        className += ` ${prefixCls}-today`;
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
                                    className += ` ${prefixCls}-selected-start-date`;
                                }
                            }
                            if (startValue || endValue) {
                                if (isSameDay(current, endValue)) {
                                    selected = true;
                                    dataTable[i].isActiveWeek = true;
                                    className += ` ${prefixCls}-selected-end-date`;
                                }
                                else if ((startValue === null || startValue === undefined)
                                    && current.isBefore(endValue, 'day')) {
                                    className += ` ${prefixCls}-in-range-cell`;
                                }
                                else if ((endValue === null || endValue === undefined)
                                    && current.isAfter(startValue, 'day')) {
                                    className += ` ${prefixCls}-in-range-cell`;
                                }
                                else if (current.isAfter(startValue, 'day')
                                    && current.isBefore(endValue, 'day')) {
                                    className += ` ${prefixCls}-in-range-cell`;
                                }
                            }
                        }
                    }
                    else if (isSameDay(current, value)) {
                        selected = true;
                        dataTable[i].isActiveWeek = true;
                    }

                    if (isSameDay(current, selectedValue)) {
                        className += ` ${prefixCls}-selected-date`;
                    }

                    if (isBeforeCurrentMonthYear) {
                        className += ` ${prefixCls}-last-month-cell`;
                    }

                    if (isAfterCurrentMonthYear) {
                        className += ` ${prefixCls}-next-month-btn-day`;
                    }

                    if (current.clone().endOf('month').date() === current.date()) {
                        className += ` ${prefixCls}-last-day-of-month`;
                    }

                    if (disabledDate) {
                        if (disabledDate(current, value)) {
                            disabled = true;

                            if (!last || !disabledDate(last, value)) {
                                className += ` ${prefixCls}-disabled-cell-first-of-row`;
                            }

                            if (!next || !disabledDate(next, value)) {
                                className += ` ${prefixCls}-disabled-cell-last-of-row`;
                            }
                        }
                    }

                    if (selected) {
                        className += ` ${prefixCls}-selected-day`;
                    }

                    if (disabled) {
                        className += ` ${prefixCls}-disabled-cell`;
                    }
                    dataTable[i].current[j].className = className;
                    dataTable[i].current[j].selected = selected;
                    dataTable[i].current[j].disabled = disabled;
                    passed++;
                }
            };
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
        },
        injectDate() {
            const instance = this.data.get('instance');
            const dateRender = this.data.get('dateRender');
            const contentRender = this.data.get('contentRender');

            let content;
            if (dateRender) {
                instance && (instance.components.daterender = dateRender);
            }
            else {
                if (contentRender) {
                    content = contentRender;
                }
                else {
                    content = san.defineComponent({
                        computed: {
                            date() {
                                return this.data.get('value').date();
                            }
                        },
                        template: '<span>{{date}}</span>'
                    });
                }
                instance && (instance.components.daterender = san.defineComponent({
                    components: {
                        's-content': content
                    },
                    template: `<div class="{{prefixCls}}-date">
                        <s-content value="{{value}}"/>
                    </div>`
                }));
            }
        }
    },
    inited() {
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        this.data.set('value', value || defaultValue);
        this.data.set('instance', this);
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
    components: {
    },
    getTrClassName(date) {
        const prefixCls = this.data.get('prefixCls');
        let classArr =[];
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
                        key="{{index}}"
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
                    key="{{index}}"
                    role="row"
                    class="{{getTrClassName(date)}}"
                >
                    <td
                        s-if="showWeekNumber"
                        key="{{date.week}}"
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
                        <daterender value="{{current.data}}" prefixCls="{{prefixCls}}"/>
                    </td>
                </tr>
            </tbody>
        </table>
    `
});
