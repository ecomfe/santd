/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import MonthPanel from '../month/monthPanel';
import YearPanel from '../year/yearPanel';
import DecadePanel from '../decade/decadePanel';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        value: DataTypes.object,
        showTimePicker: DataTypes.bool,
        locale: DataTypes.object,
        enablePrev: DataTypes.any,
        enableNext: DataTypes.any,
        disabledMonth: DataTypes.func
    },
    initData() {
        return {
            enablePrev: 1,
            enableNext: 1
        };
    },
    computed: {
        displayYear() {
            const value = this.data.get('value');
            const locale = this.data.get('locale');

            return value && value.format(locale.yearFormat);
        },
        displayMonth() {
            const value = this.data.get('value');
            const locale = this.data.get('locale');
            const localeData = value && value.localeData();

            return locale.monthFormat
                ? value && value.format(locale.monthFormat)
                : localeData && localeData.monthsShort(value);
        },
        displayDay() {
            const value = this.data.get('value');
            const locale = this.data.get('locale');

            return value && value.format(locale.dayFormat);
        }
    },
    handlePreviousYear() {
        const previous = this.data.get('value').clone();
        previous.add(-1, 'years');
        this.fire('valueChange', previous);
    },
    handleNextYear() {
        const next = this.data.get('value').clone();
        next.add(1, 'years');
        this.fire('valueChange', next);
    },
    handlePreviousMonth() {
        const previous = this.data.get('value').clone();
        previous.add(-1, 'month');
        this.fire('valueChange', previous);
    },
    handleNextMonth() {
        const next = this.data.get('value').clone();
        next.add(1, 'month');
        this.fire('valueChange', next);
    },
    handleDecadeSelect(value) {
        this.fire('panelChange', {value: value, mode: 'year'});
        this.fire('valueChange', value);
    },
    showYearPanel(referer) {
        this.data.set('yearPanelReferer', referer);
        this.fire('panelChange', {value: null, mode: 'year'});
    },
    showMonthPanel() {
        this.fire('panelChange', {value: null, mode: 'month'});
    },
    showDecadePanel() {
        this.fire('panelChange', {value: null, mode: 'decade'});
    },
    handleMonthSelect(value) {
        this.fire('panelChange', {value, mode: 'date'});
        this.fire('monthSelect', value);
        this.fire('valueChange', value);
    },
    goYear(direction) {
        const next = this.data.get('value').clone();
        next.add(direction, 'years');
        this.fire('valueChange', next);
    },
    handleYearSelect(value) {
        const referer = this.data.get('yearPanelReferer');
        this.data.set('yearPanelReferer', '');
        this.fire('panelChange', {value, mode: referer});
        this.fire('valueChange', value);
    },
    components: {
        's-monthpanel': MonthPanel,
        's-yearpanel': YearPanel,
        's-decadepanel': DecadePanel
    },
    template: `
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
                on-select="handleMonthSelect"
                on-yearPanelShow="showYearPanel('month')"
                on-changeYear="goYear"
            >
                <slot name="renderExtraFooter" slot="renderExtraFooter" />
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
});
