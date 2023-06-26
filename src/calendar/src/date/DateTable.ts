/**
 * @file Santd calendar date table file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import {dayjsType} from '../../interface';
import dayjs from 'dayjs';
import {getTitleString, getTodayTime} from '../util/index';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekOfYear);
dayjs.extend(localeData);

const ROW = 6;
const COL = 7;

function isSameDay(one: dayjsType, two: dayjsType): boolean {
    return one && two && one.isSame(two, 'day');
}

function beforeCurrentMonthYear(current: dayjsType, today: dayjsType): boolean {
    if (current.year() < today.year()) {
        return true;
    }
    return current.year() === today.year() && current.month() < today.month();
}

function afterCurrentMonthYear(current: dayjsType, today: dayjsType): boolean {
    if (current.year() > today.year()) {
        return true;
    }
    return current.year() === today.year() && current.month() > today.month();
}

export default class DateTable extends Base<I.DateTableState, I.DateTableProps, I.DateTableComputed> {
    static computed = {
        dates(this: DateTable) {
            const prefixCls = this.data.get('prefixCls');
            const value = this.data.get('value') || dayjs();
            const today = getTodayTime(value);
            const selectedValue = this.data.get('selectedValue');
            const hoverValue = this.data.get('hoverValue');
            const disabledDate = this.data.get('disabledDate');
            const month = value.date(1);
            const day = month.day();
            const lastMonthDiffDay = (day + 7 - value.localeData().firstDayOfWeek()) % 7;
            const lastMonth = month.add(0 - lastMonthDiffDay, 'days');
            const dataTable = [];
            let passed = 0;
            let current;

            for (let i = 0; i < ROW; i++) {
                dataTable[i] = {
                    isCurrentWeek: false,
                    isActiveWeek: false,
                } as I.dataTableItemType;
                dataTable[i].current = [];
                for (let j = 0; j < COL; j++) {
                    current = lastMonth;
                    if (passed) {
                        current = current.add(passed, 'days');
                    }
                    dataTable[i].current!.push({data: current});
                    dataTable[i].week = current.week();

                    // 开始处理各种样式
                    let next = null;
                    let last = null;
                    if (j < COL - 1) {
                        next = current.add(passed + 1, 'days');
                    }
                    if (j > 0) {
                        last = current.add(passed - 1, 'days');
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
                    (current.endOf('month').date() === current.date()) && className.push(` ${prefixCls}-last-day-of-month`);

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
        weeks(this: DateTable) {
            const value = this.data.get('value') || dayjs();
            const localeData = value.localeData();
            const firstDayOfWeek = localeData.firstDayOfWeek();
            const weekDays = [];
            const veryShortWeekdays = [];
            let now = dayjs();

            for (let dateColIndex = 0; dateColIndex < COL; dateColIndex++) {
                const index = (firstDayOfWeek + dateColIndex) % COL;
                now = now.day(index);
                veryShortWeekdays[dateColIndex] = localeData.weekdaysMin(now);
                weekDays[dateColIndex] = localeData.weekdaysShort(now);
            }
            return {
                veryShortWeekdays,
                weekDays
            };
        }
    }
    attached(): void {
        console.log('DateTable: ', this.data.get())
    }
    inited(): void {
        this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
    }
    handlePreviousYear(): void {
        this.fire('changeYear', -1);
    }
    handleYearPanelShow(): void {
        this.fire('yearPanelShow');
    }
    handleNextYear(): void {
        this.fire('changeYear', 1);
    }
    setAndSelectValue(value: dayjsType): void {
        this.data.set('value', value);
        this.fire('select', value);
    }
    getTrClassName(date: I.dataTableItemType): string[] {
        const prefixCls = this.data.get('prefixCls');
        let classArr = [];
        date.isCurrentWeek && classArr.push(`${prefixCls}-current-week`);
        date.isActiveWeek && classArr.push(`${prefixCls}-active-week`);
        return classArr;
    }
    getTitleString(current: I.dataTableItemDataType): string {
        return getTitleString(current.data);
    }
    handleClick(disabled: boolean, value: dayjsType): void {
        if (!disabled) {
            this.fire('select', value);
        }
    }
    handleMouseEnter(value: dayjsType): void {
        this.fire('dayHover', value);
    }
    getDate(value: dayjsType): number {
        return value.date();
    }
    static template = /* html */ `
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
                        on-mouseenter="handleMouseEnter(current.data)"
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
};
