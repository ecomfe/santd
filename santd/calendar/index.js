/**
 * @file 组件 calendar
 * @author chenkai13 <chenkai13@baidu.com>
 */
import san, {DataTypes} from 'san';
import moment from 'moment';
import {classCreator} from 'santd/core/util';
import Radio from 'santd/radio';
import Select from 'santd/select';
import classNames from 'classnames';
import Calendar from './src/fullCalendar';
import './style/index.less';
const prefixCls = classCreator('fullcalendar')();

moment.locale('zh-cn');

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

function zeroFixed(v) {
    return v < 10 ? `0${v}` : `${v}`;
}

const sanNoop = san.defineComponent({
    template: '<span></span>'
});

export default san.defineComponent({
    initData() {
        return {
            prefixCls,
            fullscreen: true,
            mode: 'month',
            yearSelectOffset: 10,
            yearSelectTotal: 20,
            monthCellRender: sanNoop,
            dateCellRender: sanNoop
        };
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            const fullscreen = this.data.get('fullscreen');

            return classNames(prefixCls, className, {
                [`${prefixCls}-fullscreen`]: fullscreen
            });
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

            let start = year - yearSelectOffset;
            let end = start + yearSelectTotal;
            if (validRange) {
                start = validRange[0].get('year');
                end = validRange[1].get('year') + 1;
            }

            const options = [];

            for (let index = start; index < end; index++) {
                options.push({label: index + '年', value: String(index)});
            }
            return options;
        },
        injectHeader() {
            const headerRender = this.data.get('headerRender');
            const instance = this.data.get('instance');
            if (headerRender) {
                instance && (instance.components.headerrender = headerRender);
            }
            return headerRender;
        },
        customDateCellRender() {
            const dateCellRender = this.data.get('dateCellRender');
            return san.defineComponent({
                computed: {
                    date() {
                        const value = this.data.get('value');
                        return zeroFixed(value.date());
                    }
                },
                components: {
                    datecellrender: dateCellRender
                },
                template: `<div class="{{prefixCls}}-date">
                    <div class="{{prefixCls}}-value">{{date}}</div>
                    <div class="{{prefixCls}}-content">
                        <datecellrender value="{{value}}" prefixCls="{{prefixCls}}" />
                    </div>
                </div>`
            });
        },
        customMonthCellRender() {
            const monthCellRender = this.data.get('monthCellRender');
            return san.defineComponent({
                computed: {
                    month() {
                        const value = this.data.get('value');
                        return value.localeData().monthsShort(value);
                    }
                },
                components: {
                    monthcellrender: monthCellRender
                },
                template: `<div class="{{prefixCls}}-month">
                    <div class="{{prefixCls}}-value">{{month}}</div>
                    <div class="{{prefixCls}}-content">
                        <monthcellrender value="{{value}}" prefixCls="{{prefixCls}}" />
                    </div>
                </div>`
            });
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
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        this.data.set('value', value || defaultValue || moment());
        this.data.set('instance', this);
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
            <headerrender
                s-if="injectHeader"
                type="{{mode}}"
                value="{{value}}"
                on-typeChange="handleHeaderTypeChange"
                on-yearChange="handleYearChange"
                on-monthChange="handleMonthChange"
            />
            <div class="{{prefixCls}}-header" s-else>
                <s-select
                    size="{{fullscreen ? 'default' : 'small'}}"
                    dropdownMatchSelectWidth="{{false}}"
                    className="{{prefixCls}}-year-select"
                    value="{{year}}"
                    style="display:inline-block; min-width: 80px;"
                    on-change="handleYearChange"
                >
                    <s-selectoption s-for="year in years" value="{{year.value}}">{{year.label}}</s-selectoption>
                </s-select>
                <s-select
                    s-if="mode !== 'year'"
                    size="{{fullscreen ? 'default' : 'small'}}"
                    dropdownMatchSelectWidth="{{false}}"
                    className="{{prefixCls}}-month-select"
                    value="{{month}}"
                    style="display:inline-block; min-width: 80px;"
                    on-change="handleMonthChange"
                >
                    <s-selectoption s-for="month in months" value="{{month.value}}">{{month.label}}</s-selectoption>
                </s-select>
                <s-radiogroup
                    value="{{mode}}"
                    size="{{fullscreen ? 'default' : 'small'}}"
                    on-change="handleHeaderTypeChange"
                >
                    <s-radiobutton value="month">月</s-radiobutton>
                    <s-radiobutton value="year">年</s-radiobutton>
                </s-radiogroup>
            </div>
            <s-calendar
                disabledDate="{{getDateRange(validRange, disabledDate)}}"
                type="{{mode === 'year' ? 'month' : 'date'}}"
                prefixCls="{{prefixCls}}"
                showHeader="{{false}}"
                value="{{value}}"
                monthCellRender="{{monthFullCellRender || customMonthCellRender}}"
                dateCellRender="{{dateFullCellRender || customDateCellRender}}"
                fullscreen="{{fullscreen}}"
                on-select="handleSelect"
            />
        </div>
    `
});
