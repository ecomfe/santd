/**
 * @file 组件 badge
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
// 注意公共方法提取到 util，送人玫瑰手有余香~
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import ScrollNumber from './ScrollNumber';
const prefixCls = classCreator('badge')();
const scrollNumberPrefixCls = classCreator('scroll-number')();

const presetColorTypes = [
    'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue',
    'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'
];

export default san.defineComponent({
    dataTypes: {
        count: DataTypes.oneOfType([DataTypes.string, DataTypes.number, DataTypes.object]),
        showZero: DataTypes.bool,
        overflowCount: DataTypes.number,
        dot: DataTypes.bool,
        prefixCls: DataTypes.string,
        scrollNumberPrefixCls: DataTypes.string,
        className: DataTypes.string,
        status: DataTypes.string,
        color: DataTypes.string,
        offset: DataTypes.array,
        title: DataTypes.string
    },
    components: {
        's-scrollnumber': ScrollNumber
    },
    initData() {
        return {
            count: null,
            showZero: false,
            dot: false,
            overflowCount: 99,
            prefixCls: prefixCls,
            scrollNumberPrefixCls: scrollNumberPrefixCls,
            style: {}
        };
    },
    created() {
        const style = this.data.get('style');
        this.data.set('bodyStyle', style);
        this.data.set('style', {});
    },
    attached() {
        const prefixCls = this.data.get('prefixCls');
        const scrollNumberPrefixCls = this.data.get('scrollNumberPrefixCls');
        let hasChild = false;
        this.slotChildren.forEach(slot => {
            if (slot.children.length) {
                hasChild = true;
            }
            slot.name === 'count' && slot.children.length && slot.children.forEach(children => {
                if (children.nodeType === 5) {
                    children.data.set('className', scrollNumberPrefixCls + '-custom-component');
                }
            });
        });
        this.data.set('hasChild', hasChild);
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const hasStatus = this.data.get('hasStatus');

            return classNames(className, prefixCls, {
                [`${prefixCls}-status`]: hasStatus,
                [`${prefixCls}-not-a-wrapper`]: !this.data.get('hasChild')
            });
        },
        hasStatus() {
            const status = this.data.get('status');
            const color = this.data.get('color');

            return !!status || !!color;
        },
        styleWithOffset() {
            const offset = this.data.get('offset');
            const bodyStyle = this.data.get('bodyStyle') || {};

            return offset
                ? {
                    'right': -parseInt(offset[0], 10),
                    'margin-top': offset[1],
                    ...bodyStyle
                }
                : bodyStyle;
        },
        statusClass() {
            const prefixCls = this.data.get('prefixCls');
            const hasStatus = this.data.get('hasStatus');
            const status = this.data.get('status');
            const color = this.data.get('color');

            return classNames({
                [`${prefixCls}-status-dot`]: hasStatus,
                [`${prefixCls}-status-${status}`]: !!status,
                [`${prefixCls}-status-${color}`]: presetColorTypes.indexOf(color) !== -1
            });
        },
        getNumberedDispayCount() {
            const count = this.data.get('count');
            const overflowCount = this.data.get('overflowCount');

            return count > overflowCount ? overflowCount + '+' : count;
        },
        isZero() {
            const numberedDispayCount = this.data.get('getNumberedDispayCount');
            return numberedDispayCount === '0' || numberedDispayCount === 0 || numberedDispayCount < 0;
        },
        isDot() {
            const dot = this.data.get('dot');
            const isZero = this.data.get('isZero');
            return (dot && !isZero) || this.data.get('hasStatus');
        },
        getDisplayCount() {
            const isDot = this.data.get('isDot');
            // dot mode don't need count
            if (isDot) {
                return '';
            }
            return this.data.get('getNumberedDispayCount');
        },
        isHidden() {
            const showZero = this.data.get('showZero');
            const displayCount = this.data.get('getDisplayCount');
            const isZero = this.data.get('isZero');
            // const isDot = this.data.get('isDot');
            const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
            return (isEmpty || (isZero && !showZero));
        },
        scrollNumberClass() {
            const isDot = this.data.get('isDot');
            const prefixCls = this.data.get('prefixCls');
            const count = this.data.get('count');
            const hasStatus = this.data.get('hasStatus');

            return classNames({
                [`${prefixCls}-dot`]: isDot,
                [`${prefixCls}-count`]: !isDot,
                [`${prefixCls}-multiple-words`]: !isDot && count && count.toString && count.toString().length > 1,
                [`${prefixCls}-status-${status}`]: hasStatus
            });
        },
        getScrollNumberTitle() {
            const title = this.data.get('title');
            const count = this.data.get('count');
            if (title) {
                return title;
            }
            return typeof count === 'string' || typeof count === 'number' ? count : undefined;
        },
        statusStyle() {
            const color = this.data.get('color');
            if (color && presetColorTypes.indexOf(color) === -1) {
                return {
                    background: color
                };
            }
            return {};
        }
    },
    template: `
        <span class="{{classes}}" style="{{!hasChild && hasStatus ? styleWithOffset : ''}}">
            <slot></slot>
            <span s-if="!hasChild && hasStatus" class="{{statusClass}}" style="{{statusStyle}}"></span>
            <span
                style="{{{color: styleWithOffset.color}}}"
                class="{{prefixCls}}-status-text"
                s-if="!hasChild && hasStatus"
            >{{text}}</span>
            <s-scrollnumber
                s-if="!isHidden || isDot && !hasStatus"
                prefixCls="{{scrollNumberPrefixCls}}"
                data-show="{{!isHidden}}"
                className="{{scrollNumberClass}}"
                count="{{getDisplayCount}}"
                title="{{getScrollNumberTitle}}"
                style="{{styleWithOffset}}"
                key="{{scrollNumber}}"
            ></s-scrollnumber>
            <slot name="count"></slot>
        </span>
    `
});
