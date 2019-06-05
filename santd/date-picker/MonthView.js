/**
 * @file MonthView.js
 * @author jinzhan@baidu.com
 */
import {DataTypes, defineComponent} from 'san';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import {classCreator} from 'santd/core/util';
import Icon from 'santd/icon';

const cc = classCreator('monthview');

const buildMonths = (year, month, date, range) => {
    let repeater = new Date(year, month, 1);
    let nextMonth = new Date(year, month + 1, 1);
    let begin = 1 - (repeater.getDay() + 6) % 7;
    repeater.setDate(begin);

    let index = 0;
    let rows = [];
    let cells = [];
    rows.push(cells);
    while (nextMonth - repeater > 0 || index % 7 !== 0) {
        if (begin > 1 && index % 7 === 0) {
            cells = [];
            rows.push(cells);
        }
        const virtual = repeater.getMonth() !== month;
        const active = isSameDay(date, repeater);
        const today = isToday(repeater);
        // range定义的begin之前end之后的日期不可选,
        const disabled = range && ((repeater < range.begin) || (repeater > range.end));
        cells.push({
            year: repeater.getFullYear(),
            month: repeater.getMonth(),
            date: repeater.getDate(),
            today,
            virtual,
            active,
            disabled
        });
        repeater = new Date(year, month, ++begin);
        index++;
    }

    return rows;
};

const kDefaultRange = {begin: new Date(2016, 1, 1), end: new Date(2046, 10, 4)};

const template = `<div class="{{mainClass}}">
    <div class="${cc('head')}">
        <a class="${cc('year-back-btn')}" on-click="onYearBack"><s-icon type="double-left"></s-icon></a>
        <a class="${cc('month-back-btn')}" on-click="onMonthBack"><s-icon type="left"></s-icon></a>
        <span>{{yearDs.value}}年{{monthDs.value+1}}月</span>
        <a class="${cc('month-forward-btn')}" on-click="onMonthForward"><s-icon type="right"></s-icon></a>
        <a class="${cc('year-forward-btn')}" on-click="onYearForward"><s-icon type="double-right"></s-icon></a>
    </div>

    <div class="${cc('month')}">
        <table border="0" cellpadding="0" cellspacing="0" class="${cc('main')}">
            <thead>
                <tr>
                    <td class="${cc('title')}" s-for="title in titles">{{title}}</td>
                </tr>
            </thead>
            <tbody>
                <tr s-for="row in rows">
                    <td s-for="cell in row" class="{{cell | cellClass}}" on-click="onCellClick(cell)">{{cell.date}}</td>
                </tr>
                <tr s-if="{{today}}">
                    <td colspan="7" class="${cc('shortcut')}">
                        <a class="${cc('today-btn')}" on-click="onTodayClick()">今天</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`;

export default defineComponent({
    template,
    components: {
        's-icon': Icon
    },
    computed: {
        mainClass() {
            const disabled = this.data.get('disabled');
            return disabled ? [cc(), cc('disabled')] : cc();
        },
        rows() {
            const year = this.data.get('yearDs.value');
            const month = this.data.get('monthDs.value');
            const range = this.data.get('range');
            return buildMonths(year, month, this.data.get('value'), range);
        }
    },
    filters: {
        cellClass(cell) {
            const klass = [cc('item')];
            if (cell.virtual) {
                klass.push(cc('item-virtual'));
            }

            if (cell.disabled) {
                klass.push(cc('item-disabled'));
            }

            if (cell.active) {
                klass.push(cc('item-selected'));
            }

            if (cell.today) {
                klass.push(cc('item-today'));
            }

            return klass;
        }
    },
    initData() {
        return {
            disabled: false,
            skin: '',
            time: false,
            endOfDay: false, // 如果设置为 true 的时候，当没有 time 选型，选择日期的时候是 23:59:59 结束
            value: new Date(),
            titles: ['一', '二', '三', '四', '五', '六', '日'],
            range: kDefaultRange,

            // 下面的几个都是组件内部的状态，不建议对外公开
            hour: null,
            minute: null,
            second: null,
            yearDs: {datasource: []},
            monthDs: {datasource: []},
            today: true
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 如果没有设置 time，但是 end-of-day 设置了 true，<br>
         * 那么选择了日期之后，结束时间是 23:59:59<br>
         * 否则默认的情况是 00:00:00
         * @default false
         */
        endOfDay: DataTypes.bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: DataTypes.bool,

        /**
         * 组件的皮肤
         * @default ''
         */
        skin: DataTypes.string,

        /**
         * 组件的值
         * @default new Date()
         */
        value: DataTypes.instanceOf(Date),

        /**
         * 日期的可选范围
         * @default {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)}
         */
        range: DataTypes.object,

        /**
         * 星期的名称
         * @default ['一', '二', '三', '四', '五', '六', '日']
         */
        titles: DataTypes.array
    },
    initYearOptions() {
        const value = this.data.get('value');
        const {begin, end} = this.data.get('range');
        const year = value.getFullYear();
        const datasource = [];

        const endYear = end.getFullYear();
        for (let year = begin.getFullYear(); year <= endYear; year++) {
            datasource.push({text: year, value: year});
        }

        this.data.set('yearDs.datasource', datasource);
        this.data.set('yearDs.value', year);
    },
    initMonthOptions(year) {
        const {value, yearDs, range} = this.data.get();
        const datasource = [];
        let month = value.getMonth();
        let end = 11;
        let start = 0;

        year = year || yearDs.value;

        if (year === range.begin.getFullYear()) {
            start = range.begin.getMonth();
            month < start && (month = start);
        }
        else if (year === range.end.getFullYear()) {
            end = range.end.getMonth();
            month > end && (month = end);
        }

        for (; start <= end; start++) {
            datasource.push({text: start + 1, value: start});
        }

        this.data.set('monthDs.datasource', datasource);
        this.data.set('monthDs.value', month);
    },
    inited() {
        const range = this.data.get('range');
        // 外部有可能传过来的range为undefined
        if (!range) {
            this.data.set('range', kDefaultRange);
        }
        // value = "2017-12-14T10:44:01Z"
        const value = this.data.get('value');
        if (value && typeof value === 'string') {
            this.data.set('value', new Date(value));
        }

        const valueWatcher = value => {
            this.initYearOptions();
            this.initMonthOptions();
            const time = this.data.get('time');
            if (value && time) {
                this.data.set('hour', value.getHours());
                this.data.set('minute', value.getMinutes());
                this.data.set('second', value.getSeconds());
            }
            this.fire('change', {value});
        };
        this.watch('value', valueWatcher);
        valueWatcher(this.data.get('value'));

        this.watch('hour', hour => {
            const time = this.data.get('time');
            if (time) {
                if (!(hour >= 0 && hour <= 23)) {
                    hour = 0;
                }
                const value = this.data.get('value');
                value.setHours(+hour);
                this.data.set('value', new Date(value));
            }
        });
        this.watch('minute', minute => {
            const time = this.data.get('time');
            if (time) {
                if (!(minute >= 0 && minute <= 59)) {
                    minute = 0;
                }
                const value = this.data.get('value');
                value.setMinutes(+minute);
                this.data.set('value', new Date(value));
            }
        });
        this.watch('second', second => {
            const time = this.data.get('time');
            if (time) {
                if (!(second >= 0 && second <= 59)) {
                    second = 0;
                }
                const value = this.data.get('value');
                value.setSeconds(+second);
                this.data.set('value', new Date(value));
            }
        });
    },
    onTodayClick() {
        this.data.set('value', new Date());
        this.fire('set-val', false);
    },
    onCellClick(item) {
        if (item.disabled) {
            return;
        }
        const {year, month, date} = item;
        const {value, time, endOfDay} = this.data.get();
        value.setFullYear(year);
        value.setMonth(month);
        value.setDate(date);
        if (endOfDay && !time) {
            value.setHours(23, 59, 59, 999);
        }
        this.data.set('value', new Date(value));
    },

    onYearBack() {
        let year = this.data.get('yearDs.value') - 1;
        this.data.set('yearDs.value', year);
        this.initMonthOptions(year);
    },

    onYearForward() {
        let year = this.data.get('yearDs.value') + 1;
        this.data.set('yearDs.value', year);
        this.initMonthOptions(year);
    },

    onMonthBack() {
        let month = this.data.get('monthDs.value');
        let year = this.data.get('yearDs.value');
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        else {
            month -= 1;
        }
        this.data.set('monthDs.value', month);
        this.data.set('yearDs.value', year);
    },
    onMonthForward() {
        let month = this.data.get('monthDs.value');
        let year = this.data.get('yearDs.value');
        if (month === 11) {
            month = 0;
            year += 1;
        }
        else {
            month += 1;
        }
        this.data.set('monthDs.value', month);
        this.data.set('yearDs.value', year);
    }
});
