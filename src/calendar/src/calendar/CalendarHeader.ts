/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import MonthPanel from '../month/MonthPanel';
import YearPanel from '../year/YearPanel';
import DecadePanel from '../decade/DecadePanel';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import * as I from './interface';

dayjs.extend(localeData);

export default class CalendarHeader extends Base<I.CalendarHeaderState, I.CalendarHeaderProps, I.CalendarHeaderComputed> {
    initData(): I.CalendarHeaderState {
        return {
            enablePrev: 1,
            enableNext: 1
        };
    }
    static computed: I.CalendarHeaderComputed = {
        displayYear(this: CalendarHeader) {
            const value = this.data.get('value');
            const locale = this.data.get('locale');

            return value && value.format(locale.yearFormat);
        },
        displayMonth(this: CalendarHeader) {
            const value = this.data.get('value');
            const locale = this.data.get('locale');
            const localeData = value && value.localeData();

            return locale.monthFormat
                ? value && value.format(locale.monthFormat)
                : localeData && localeData.monthsShort(value);
        },
        displayDay(this: CalendarHeader) {
            const value = this.data.get('value');
            const locale = this.data.get('locale');

            return value && value.format(locale.dayFormat);
        }
    }
    handlePreviousYear(): void {
        const previous = this.data.get('value').add(-1, 'years');
        this.fire('valueChange', previous);
    }
    handleNextYear(): void {
        const next = this.data.get('value').add(1, 'years');
        this.fire('valueChange', next);
    }
    handlePreviousMonth(): void {
        const previous = this.data.get('value').add(-1, 'month');
        this.fire('valueChange', previous);
    }
    handleNextMonth(): void {
        const next = this.data.get('value').add(1, 'month');
        this.fire('valueChange', next);
    }
    handleDecadeSelect(value: dayjs.Dayjs) {
        this.fire('panelChange', {value: value, mode: 'year'});
        this.fire('valueChange', value);
    }
    showYearPanel(referer: 'date' | 'month') {
        this.data.set('yearPanelReferer', referer);
        this.fire('panelChange', {value: null, mode: 'year'});
    }
    showMonthPanel(): void {
        this.fire('panelChange', {value: null, mode: 'month'});
    }
    showDecadePanel(): void {
        this.fire('panelChange', {value: null, mode: 'decade'});
    }
    handleMonthSelect(value: dayjs.Dayjs) {
        this.fire('panelChange', {value, mode: 'date'});
        this.fire('monthSelect', value);
        this.fire('valueChange', value);
    }
    goYear(direction: number) {
        const next = this.data.get('value').add(direction, 'years');
        this.fire('valueChange', next);
    }
    handleYearSelect(value: dayjs.Dayjs) {
        const referer = this.data.get('yearPanelReferer');
        this.data.set('yearPanelReferer', '');
        this.fire('panelChange', {value, mode: referer});
        this.fire('valueChange', value);
    }
    static components = {
        's-monthpanel': MonthPanel,
        's-yearpanel': YearPanel,
        's-decadepanel': DecadePanel
    }
    static template = /* html */ `
        <div class="{{prefixCls}}-header">
            <div style="position: relative;">
                <a
                    s-if="enablePrev && !showTimePicker"
                    class="{{prefixCls}}-prev-year-btn"
                    role="button"
                    title="{{locale.previousYear}}"
                    on-click="handlePreviousYear"
                    href="javascript:;"
                />
                <a
                    s-if="enablePrev && !showTimePicker"
                    class="{{prefixCls}}-prev-month-btn"
                    role="button"
                    title="{{locale.previousMonth}}"
                    on-click="handlePreviousMonth"
                    href="javascript:;"
                />
                <span class="{{prefixCls}}-ym-select">
                    <a
                        class="{{prefixCls}}-year-select {{showTimePicker ? prefixCls + '-time-status' : ''}}"
                        role="button"
                        on-click="showYearPanel('date')"
                        title="{{showTimePicker ? '' : locale.yearSelect}}"
                    >{{displayYear}}</a>
                    <a
                        class="{{prefixCls}}-month-select {{showTimePicker ? prefixCls + '-time-status' : ''}}"
                        role="button"
                        on-click="showMonthPanel"
                        title="{{showTimePicker ? '' : locale.monthSelect}}"
                    >{{displayMonth}}</a>
                    <a
                        s-if="showTimePicker"
                        class="{{prefixCls}}-day-select {{showTimePicker ? prefixCls + '-time-status' : ''}}"
                        role="button"
                    >{{displayDay}}</a>
                </span>
                <a
                    s-if="enableNext && !showTimePicker"
                    class="{{prefixCls}}-next-month-btn"
                    role="button"
                    title="{{locale.nextMonth}}"
                    on-click="handleNextMonth"
                    href="javascript:;"
                />
                <a
                    s-if="enableNext && !showTimePicker"
                    class="{{prefixCls}}-next-year-btn"
                    role="button"
                    title="{{locale.nextYear}}"
                    on-click="handleNextYear"
                    href="javascript:;"
                />
            </div>
            <s-monthpanel
                s-if="mode === 'month'"
                locale="{{locale}}"
                value="{{value}}"
                prefixCls="{{prefixCls}}"
                disabledDate="{{disabledMonth}}"
                hasExtraFooter="{{hasExtraFooter}}"
                hasMonthRender="{{hasMonthRender}}"
                on-select="handleMonthSelect"
                on-yearPanelShow="showYearPanel('month')"
                on-changeYear="goYear"
            >
                <slot name="renderExtraFooter" slot="renderExtraFooter" />
                <slot name="monthRender" slot="monthRender" />
            </s-monthpanel>
            <s-yearpanel
                s-if="mode === 'year'"
                locale="{{locale}}"
                defaultValue="{{value}}"
                value="{{value}}"
                prefixCls="{{prefixCls}}"
                hasExtraFooter="{{hasExtraFooter}}"
                on-select="handleYearSelect"
                on-decadePanelShow="showDecadePanel"
            >
                <slot name="renderExtraFooter" slot="renderExtraFooter" />
            </s-yearpanel>
            <s-decadepanel
                s-if="mode === 'decade'"
                locale="{{locale}}"
                defaultValue="{{value}}"
                value="{{value}}"
                prefixCls="{{prefixCls}}"
                hasExtraFooter="{{hasExtraFooter}}"
                on-select="handleDecadeSelect"
            >
                <slot name="renderExtraFooter" slot="renderExtraFooter" />
            </s-decadepanel>
        </div>
    `
};
