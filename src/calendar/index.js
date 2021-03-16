/**
 * @file 组件 calendar
 * @author chenkai13 <chenkai13@baidu.com>
 */
import san from 'san';
import dayjs from 'dayjs';
import {classCreator} from '../core/util';
import Radio from '../radio';
import Select from '../select';
import Calendar from './src/fullCalendar';
import './style/index.less';
import localeReceiver from '../localeprovider/receiver';

dayjs.extend(require('dayjs/plugin/weekOfYear'));
dayjs.extend(require('dayjs/plugin/localeData'));
const prefixCls = classCreator('fullcalendar')();

function getMonthsLocale(value) {
    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
    }
    return months;
}

export default san.defineComponent({
    initData() {
        return {
            prefixCls,
            fullscreen: true,
            mode: 'month',
            yearSelectOffset: 10,
            yearSelectTotal: 20,
            componentName: 'Calendar'
        };
    },
    computed: {
        ...localeReceiver.computed,

        classes() {
            const fullscreen = this.data.get('fullscreen');

            let classArr = [prefixCls];
            fullscreen && classArr.push(`${prefixCls}-fullscreen`);
            return classArr;
        },
        month() {
            const value = this.data.get('value');
            return value && String(value.month());
        },
        months() {
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
        year() {
            const value = this.data.get('value');
            return value && String(value.year());
        },
        years() {
            const year = this.data.get('year');
            const yearSelectTotal = this.data.get('yearSelectTotal');
            const yearSelectOffset = this.data.get('yearSelectOffset');
            const validRange = this.data.get('validRange');
            const locale = this.data.get('locale').lang;

            let start = year - yearSelectOffset;
            let end = start + yearSelectTotal;
            if (validRange) {
                start = validRange[0].get('year');
                end = validRange[1].get('year') + 1;
            }

            const options = [];

            for (let index = start; index < end; index++) {
                options.push({label: index + (locale.year === '年' ? '年' : ''), value: String(index)});
            }
            return options;
        }
    },
    setValue(value, way) {
        const prevValue = this.data.get('value').clone();
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
    },
    handleMonthChange(month) {
        const value = this.data.get('value').clone();
        value.month(month);
        this.setValue(value, 'changePanel');
    },
    handleYearChange(year) {
        const value = this.data.get('value').clone();
        value.year(year);
        this.setValue(value, 'changePanel');
    },
    handlePanelChange(value, mode) {
        this.fire('panelChange', {value, mode});
        if (value !== this.data.get('value')) {
            this.fire('change', value);
        }
    },
    inited() {
        localeReceiver.inited.call(this);

        const defaultValue = this.data.get('defaultValue');
        const value = this.data.get('value') || defaultValue || dayjs();
        const localeCode = this.data.get('localeCode');

        if (localeCode) {
            dayjs.locale(localeCode);
            value.locale(localeCode);
        }
        this.data.set('value', value);
        this.data.set('hasHeaderRender', !!this.sourceSlots.named.headerRender);

        this.watch('localeCode', val => {
            dayjs.locale(val);
            value.locale(val);
            this.data.set('value', value, {force: true});
        });
    },
    components: {
        's-calendar': Calendar,
        's-radio': Radio,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button,
        's-select': Select,
        's-selectoption': Select.Option
    },
    handleHeaderTypeChange(e) {
        const mode = e.target.value;
        this.data.set('mode', mode);
        this.handlePanelChange(this.data.get('value'), mode);
    },
    handleSelect(value) {
        this.setValue(value.selectedValue || value, 'select');
    },
    getDateRange(validRange, disabledDate) {
        if (!validRange) {
            return disabledDate;
        }

        return function (current) {
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
    },
    template: `
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
});
