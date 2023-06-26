/**
 * @file Santd month calendar source file
 * @author mayihui@baidu.com
 **/

import Base from './Base';
import CalendarHeader from './calendar/CalendarHeader';
import dayjs from 'dayjs';
import * as I from './interface';
import {dayjsType} from '../interface';

export default class MonthCalendar extends Base {
    static initData(): I.MonthCalendarState {
        return {
            mode: 'month',
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
        's-calendarheader': CalendarHeader
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
