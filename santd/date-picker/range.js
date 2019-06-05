/**
 * @file 组件 range-picker
 * @author jinzhan@baidu.com
 */

import './style/index';
import {DataTypes, defineComponent} from 'san';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import endOfDay from 'date-fns/end_of_day';
import Layer from 'santd/layer';
import MonthView from './MonthView';
import Button from 'santd/button';
import Icon from 'santd/icon';

// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';


// cc()就是 prefix class，cc('xxx')返回 prefixClass-xxx
let cc = classCreator('range-picker');

const kDefaultRange = {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)};


function getDayValue(bd = 1, ed = 2) {
    return function () {
        const now = new Date();
        const begin = addDays(now, bd);
        const end = addDays(now, ed);
        return {begin, end};
    };
}

function getLastWeekValue() {
    return function () {
        const now = new Date();
        const begin = new Date(now);
        const end = new Date(now);

        const startOfWeek = 1; // 周一为第一天;

        if (begin.getDay() < startOfWeek % 7) {
            begin.setDate(
                begin.getDate() - 14 + startOfWeek - begin.getDay()
            );
        }
        else {
            begin.setDate(
                begin.getDate() - 7 - begin.getDay() + startOfWeek % 7
            );
        }
        begin.setHours(0, 0, 0, 0);

        end.setFullYear(
            begin.getFullYear(),
            begin.getMonth(),
            begin.getDate() + 6
        );
        end.setHours(23, 59, 59, 999);

        return {begin, end};
    };
}

function getMonthValue() {
    return function () {
        const now = new Date();
        const begin = startOfMonth(now);
        const end = endOfDay(now);
        return {begin, end};
    };
}

function getLastMonthValue() {
    return function () {
        const now = new Date();
        const begin = startOfMonth(addMonths(now, -1));
        const end = endOfDay(addDays(startOfMonth(now), -1));
        return {begin, end};
    };
}

function getLastQuarterValue() {
    return function () {
        const now = new Date();
        const begin = startOfMonth(addMonths(now, -(now.getMonth() % 3 + 3)));
        const end = endOfDay(addDays(startOfMonth(
            addMonths(now, -now.getMonth() % 3)
        ), -1));
        return {begin, end};
    };
}

const template = `<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="{{contentClass}}">{{text}}</div>
    <s-icon type="calendar" />
    <s-layer open="{=active=}" s-ref="layer" follow-scroll="{{false}}">
        <div class="${cc('layer')}">
            <div class="${cc('shortcut')}" s-if="shortcut">
                <span on-click="onShortcutSelect(item)"
                    class="${cc('shortcut-item')}"
                    s-for="item in shortcutItems">{{item.text}}</span>
            </div>
            <div class="${cc('body')}">
                <div class="${cc('begin')}">
                    <div class="${cc('label')}"><h3>开始日期</h3></div>
                    <div class="${cc('begin-cal')}">
                        <s-monthview today="{{false}}" value="{=begin.value=}" range="{{range}}" time="{{time}}" />
                    </div>
                </div>
                <div class="${cc('end')}">
                    <div class="${cc('label')}"><h3>结束日期</h3></div>
                    <div class="${cc('end-cal')}">
                        <s-monthview
                            today="{{false}}"
                            value="{=end.value=}"
                            range="{{range}}"
                            time="{{time}}"
                            end-of-day />
                    </div>
                </div>
            </div>
            <div class="${cc('foot')}">
                <s-button on-click="onSelect" type="primary" class="${cc('okBtn')}">确定</s-button>
                <s-button on-click="closeLayer" skin="cancel" class="${cc('cancelBtn')}">取消</s-button>
            </div>
        </div>
    </s-layer>
</div>`;

export default defineComponent({
    template,
    components: {
        's-layer': Layer,
        's-monthview': MonthView,
        's-button': Button,
        's-icon': Icon
    },
    computed: {
        text() {
            const value = this.data.get('value');
            if (!value) {
                return '-';
            }
            const {begin, end} = value;
            const fm = this.data.get('format');
            const f = this.data.get('time') ? `${fm} HH:mm:ss` : fm;
            const beginText = format(begin, f);
            const endText = format(end, f);
            return `${beginText} ~ ${endText}`;
        },
        mainClass() {
            const disabled = this.data.get('disabled');
            return disabled ? [cc(), cc('disabled')] : cc();
        },
        contentClass() {
            const size = this.data.get('sizeMap')[this.data.get('size')] || 'default';
            return [cc('text'), cc(size)];
        }
    },
    initData() {
        return {
            value: {
                begin: new Date(),
                end: new Date()
            },
            time: null,
            range: {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)},
            // BEGIN 临时的数据
            begin: {
                value: null
            },
            end: {
                value: null
            },
            // E N D 临时的数据
            active: false,
            shortcut: true,
            format: 'YYYY-MM-DD',
            shortcutItems: [
                {text: '昨天', value: getDayValue(1, 1)},
                {text: '最近7天', value: getDayValue(6, 0)},
                {text: '上周', value: getLastWeekValue()},
                {text: '本月', value: getMonthValue()},
                {text: '上个月', value: getLastMonthValue()},
                {text: '上个季度', value: getLastQuarterValue()}
            ],
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    dataTypes: {
        /**
         * 获取或者设置组件的值
         * @default {begin: new Date(), end: new Date()}
         */
        value: DataTypes.object,

        /**
         * 日期可以选择的范围
         * @default {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)}
         */
        range: DataTypes.object,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 是否启用选择日期的快捷方式
         * @default true
         */
        shortcut: DataTypes.bool,

        /**
         * 浮层的打开状态
         * @default false
         */
        active: DataTypes.bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: DataTypes.bool,

        /**
         * 文案格式化日期的时候默认格式
         * @default YYYY-MM-DD
         */
        format: DataTypes.string
    },
    inited() {
        let {begin, end} = this.data.get('value');
        if (!begin) {
            begin = new Date();
        }
        else if (typeof begin === 'string') {
            // utc to date
            begin = new Date(begin);
        }

        if (!end) {
            end = new Date();
        }
        else if (typeof end === 'string') {
            // utc to date
            end = new Date(end);
        }

        this.data.set('value', {begin, end});
        this.watch('value', value => this.fire('change', {value}));
    },
    onShortcutSelect(item) {
        const {begin, end} = typeof item.value === 'function'
            ? item.value()
            : item.value;
        this.data.set('begin.value', begin);
        this.data.set('end.value', end);
    },
    onSelect() {
        const begin = this.data.get('begin.value');
        const end = this.data.get('end.value');
        this.data.set('value', begin > end ? {begin: end, end: begin} : {begin, end});
        this.closeLayer();
    },
    closeLayer() {
        this.data.set('active', false);
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        if (!active) {
            const {begin, end} = this.data.get('value');
            this.data.set('begin.value', new Date(begin));
            this.data.set('end.value', new Date(end));
        }
        this.data.set('active', !active);
    }
});
