/**
 * @file Santd month calendar source file
 * @author mayihui@baidu.com
 **/

import CalendarHeader from './calendar/CalendarHeader';
import dayjs from 'dayjs';
import * as I from './interface';
import {dayjsType} from '../interface';
import locale from './locale/en_US';
import {isAllowedDate} from './util/index';
import TimePickerPanel from '../../time-picker/Panel';
import Base from 'santd/base';
export default class MonthCalendar extends Base {
    initData(): I.MonthCalendarState {
        return {
            mode: 'month',
            locale: locale,
            timeFormat: 'HH:mm:ss',
        };
    };
    inited(): void {
        let value = this.data.get('value') || this.data.get('defaultValue') || dayjs();
        let selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
        const localeCode = this.data.get('localeCode');

        if (localeCode) {
            require(`dayjs/locale/${localeCode}.js`);
            value = value.locale(localeCode);
        }

        this.data.set('value', value);
        this.data.set('selectedValue', selectedValue);
        this.data.set('mode', 'month');

        this.watch('selectedValue', val => {
            if (localeCode) {
                val = val.locale(localeCode);
            }
            this.data.set('value', val);
        });
    };
    handleMonthSelect(value: dayjsType): void {
        this.fire('select', {value});
    };
    handlePanelChange({value, mode}: {value: dayjsType, mode: string}): void {
        if (mode && mode !== 'date') {
            this.data.set('mode', mode);
        }
        this.fire('panelChange', {value: value || this.data.get('value'), mode});
    };
    static components = {
        's-calendarheader': CalendarHeader,
        's-timepicker': TimePickerPanel,
    };
    static computed: I.CalendarBaseComputed=  {
        classes(this: MonthCalendar) {
            const prefixCls = this.data.get('prefixCls');
            const customClassName = this.data.get('customClassName');
            const visible = this.data.get('visible');
            const showWeekNumber = this.data.get('showWeekNumber');

            let classArr = [prefixCls, customClassName];
            !visible && classArr.push(`${prefixCls}-hidden`);
            showWeekNumber && classArr.push(`${prefixCls}-week-number`);
            return classArr;
        },
        showHour(this: MonthCalendar) {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
        },
        showMinute(this: MonthCalendar) {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('m') > -1;
        },
        showSecond(this: MonthCalendar) {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('s') > -1;
        },
        columns(this: MonthCalendar) {
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
    static template = /* html */ `
        <div
            class="{{classes}} {{prefixCls}}-month-calendar"
            tabIndex="0"
        >
            <div class="{{prefixCls}}-month-calendar-contnet">
                <div class="{{prefixCls}}-month-header-wrap">
                    <s-calendarheader
                        prefixCls="{{prefixCls}}"
                        mode="{{mode}}"
                        value="{{value || defaultValue}}"
                        locale="{{locale}}"
                        disabledMonth="{{disabledDate}}"
                        hasExtraFooter="{{hasExtraFooter}}"
                        hasMonthRender="{{hasMonthRender}}"
                        on-valueChange="setValue"
                        on-panelChange="handlePanelChange"
                        on-monthSelect="handleMonthSelect"
                    >
                        <slot name="renderExtraFooter" slot="renderExtraFooter" />
                        <slot name="monthRender" slot="monthRender" />
                    </s-calendarheader>
                </div>
            </div>
        </div>
    `
};
