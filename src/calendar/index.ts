/**
 * @file 组件 calendar
 * @author chenkai13 <chenkai13@baidu.com> wufuguo@baidu.com
 */
import dayjs from 'dayjs';
import {classCreator} from '../core/util';
import Radio from '../radio';
import Select from '../select';
import FullCalendar from './src/FullCalendar';
import './style/index.less';
import localeReceiver from '../locale-provider/receiver';
import localeData from 'dayjs/plugin/localeData';
import * as I from './interface';
import Base from 'santd/base';

dayjs.extend(localeData);

const prefixCls = classCreator('fullcalendar')();

function getMonthsLocale(value: I.dayjsType) {
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
        months.push(localeData.monthsShort(value.month(i)));
    }
    return months;
}

export default class Calendar extends Base<I.State, I.Props, I.Computed> {
    initData(): I.State {
        return {
            prefixCls,
            fullscreen: true,
            mode: 'month',
            yearSelectOffset: 10,
            yearSelectTotal: 20,
            componentName: 'Calendar'
        };
    }
    static computed: I.Computed = {
        ...localeReceiver.computed,

        classes(this: Calendar) {
            const fullscreen = this.data.get('fullscreen');

            let classArr = [prefixCls];
            fullscreen && classArr.push(`${prefixCls}-fullscreen`);
            return classArr;
        },
        month(this: Calendar) {
            const value = this.data.get('value');
            return value && String(value.month());
        },
        months(this: Calendar) {
            const value = this.data.get('value');
            const validRange = this.data.get('validRange');
            const options = [];
            const months = value && getMonthsLocale(value) || [];
            let start = 0;
            let end = 12;

            if (validRange) {
                const [rangeStart, rangeEnd] = validRange;
                const currentYear = value.get('year');
                if (rangeEnd.get('year') === currentYear) {
                    end = rangeEnd.get('month') + 1;
                }
                if (rangeStart.get('year') === currentYear) {
                    start = rangeStart.get('month');
                }
            }

            for (let index = start; index < end; index++) {
                options.push({value: String(index), label: months[index]});
            }

            return options;
        },
        year(this: Calendar) {
            const value = this.data.get('value');
            return value && String(value.year());
        },
        years(this: Calendar) {
            const year = this.data.get('year');
            const yearSelectTotal = this.data.get('yearSelectTotal');
            const yearSelectOffset = this.data.get('yearSelectOffset');
            const validRange = this.data.get('validRange');
            const locale = this.data.get('locale').lang;

            let start = +year - yearSelectOffset;
            let end = start + yearSelectTotal;
            if (validRange) {
                start = validRange[0].get('year');
                end = validRange[1].get('year') + 1;
            }

            const options = [];

            for (let index = start; index < end; index++) {
                options.push({label: index + (locale && locale.year === '年' ? '年' : ''), value: String(index)});
            }
            return options;
        }
    }
    setValue(value: I.dayjsType, way: 'select' | 'changePanel') {
        const prevValue = this.data.get('value');
        const mode = this.data.get('mode');

        this.data.set('value', value);
        if (way === 'select') {
            if (prevValue && prevValue.month() !== value.month()) {
                this.handlePanelChange(value, mode);
            }
            this.fire('select', value);
        }
        else if (way === 'changePanel') {
            this.handlePanelChange(value, mode);
        }
    }
    handleMonthChange(month: string[]) {
        // 不知道为什么这个函数的传值确实是string[]，但dayjs的month是number
        this.setValue(this.data.get('value').month(month as unknown as number), 'changePanel');
    }
    handleYearChange(year: string[]) {
        this.setValue(this.data.get('value').year(year as unknown as number), 'changePanel');
    }
    handlePanelChange(value: I.dayjsType, mode: string) {
        this.fire('panelChange', {value, mode});
        if (value !== this.data.get('value')) {
            this.fire('change', value);
        }
    }
    inited() {
        localeReceiver.inited.call(this);

        const defaultValue = this.data.get('defaultValue');
        let value = this.data.get('value') || defaultValue || dayjs();
        const localeCode = this.data.get('localeCode');

        if (localeCode) {
            require(`dayjs/locale/${localeCode}.js`);
            dayjs.locale(localeCode);
            value = value.locale(localeCode);
        }
        this.data.set('value', value);
        this.data.set('hasHeaderRender', !!this.sourceSlots.named.headerRender);

        this.watch('localeCode', val => {
            require(`dayjs/locale/${val}.js`);
            dayjs.locale(val);
            value = value.locale(val);
            this.data.set('value', value);
        });
    }
    static components = {
        's-calendar': FullCalendar,
        's-radio': Radio,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button,
        's-select': Select,
        's-selectoption': Select.Option
    }
    handleHeaderTypeChange(e: I.headerTypeChangeType) {
        const mode = e.target.value;
        this.data.set('mode', mode);
        this.handlePanelChange(this.data.get('value'), mode);
    }
    handleSelect(value: I.dayjsType) {
        this.setValue(value.selectedValue || value, 'select');
    }
    getDateRange(validRange: [I.dayjsType, I.dayjsType], disabledDate: (args0: I.dayjsType) => boolean) {
        if (!validRange) {
            return disabledDate;
        }

        return function (current: I.disabledDateType) {
            if (!current) {
                return false;
            }

            const [startDate, endDate] = validRange;
            const inRange = !current.isBetween(startDate, endDate, 'days', '[]');
            if (disabledDate) {
                return disabledDate(current) || inRange;
            }
            return inRange;
        };
    }
    static template = /* html */ `
        <div class="{{classes}}">
            <slot
                s-if="hasHeaderRender"
                name="headerRender"
                var-type="{{mode}}"
                var-value="{{value}}"
                var-locale="{{locale.lang}}"
                on-typeChange="handleHeaderTypeChange"
                on-yearChange="handleYearChange"
                on-monthChange="handleMonthChange"
            />
            <div class="{{prefixCls}}-header" s-else>
                <s-select
                    size="{{fullscreen ? 'default' : 'small'}}"
                    dropdownMatchSelectWidth="{{false}}"
                    class="{{prefixCls}}-year-select"
                    value="{{year}}"
                    style="display:inline-block; min-width: 80px;"
                    on-change="handleYearChange"
                >
                    <s-selectoption s-for="year in years" value="{{year.value}}" locale="{{locale}}">
                        {{year.label}}
                    </s-selectoption>
                </s-select>
                <s-select
                    s-if="mode !== 'year'"
                    size="{{fullscreen ? 'default' : 'small'}}"
                    dropdownMatchSelectWidth="{{false}}"
                    class="{{prefixCls}}-month-select"
                    value="{{month}}"
                    style="display:inline-block; min-width: 80px;"
                    on-change="handleMonthChange"
                >
                    <s-selectoption s-for="month in months" value="{{month.value}}" locale="{{locale}}">
                        {{month.label}}
                    </s-selectoption>
                </s-select>
                <s-radiogroup
                    value="{{mode}}"
                    size="{{fullscreen ? 'default' : 'small'}}"
                    on-change="handleHeaderTypeChange"
                    name="calendarmode"
                >
                    <s-radiobutton value="month">{{locale.lang.month}}</s-radiobutton>
                    <s-radiobutton value="year">{{locale.lang.year}}</s-radiobutton>
                </s-radiogroup>
            </div>
            <s-calendar
                disabledDate="{{getDateRange(validRange, disabledDate)}}"
                type="{{mode === 'year' ? 'month' : 'date'}}"
                prefixCls="{{prefixCls}}"
                showHeader="{{false}}"
                value="{{value}}"
                locale="{{locale.lang}}"
                fullscreen="{{fullscreen}}"
                on-select="handleSelect"
            >
                <div class="{{prefixCls}}-date" slot="customDateCellRender">
                    <div class="{{prefixCls}}-value">{{date}}</div>
                    <div class="{{prefixCls}}-content">
                        <slot name="dateCellRender" var-value="{{value}}" />
                    </div>
                </div>
                <div class="{{rootPrefixCls}}-month" slot="customMonthCellRender">
                    <div class="{{rootPrefixCls}}-value">{{month}}</div>
                    <div class="{{rootPrefixCls}}-content">
                        <slot name="monthCellRender" var-value="{{value}}"/>
                    </div>
                </div>
            </s-calendar>
        </div>
    `
};
