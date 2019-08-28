/**
 * @file 组件 badge
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
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
            style: {}
        };
    },

    created() {
        const style = this.data.get('style');
        this.data.set('bodyStyle', style);
        this.data.set('style', {});
    },

    attached() {
        let hasChild = false;
        this.slotChildren.forEach(slot => {
            if (slot.children.length) {
                hasChild = true;
            }
            slot.name === 'count' && slot.children.length && slot.children.forEach(children => {
                if (children.nodeType === 5) {
                    children.data.set('class', scrollNumberPrefixCls + '-custom-component');
                }
            });
        });
        this.data.set('hasChild', hasChild);
    },

    computed: {
        classes() {
            let classArr = [prefixCls];

            this.data.get('hasStatus') && classArr.push(`${prefixCls}-status`);
            !this.data.get('hasChild') && classArr.push(`${prefixCls}-not-a-wrapper`);
            return classArr;
        },
        hasStatus() {
            return !!this.data.get('status') || !!this.data.get('color');
        },
        statusClass() {
            const status = this.data.get('status');
            const color = this.data.get('color');
            let classArr = [];

            this.data.get('hasStatus') && classArr.push(`${prefixCls}-status-dot`);
            status && classArr.push(`${prefixCls}-status-${status}`);
            presetColorTypes.includes(color) && classArr.push(`${prefixCls}-status-${color}`);
            return classArr;
        },
        getNumberedDisplayCount() {
            const count = this.data.get('count');
            const overflowCount = this.data.get('overflowCount');

            return count > overflowCount ? overflowCount + '+' : count;
        },
        isZero() {
            const numberedDispayCount = this.data.get('getNumberedDisplayCount');
            return numberedDispayCount === '0' || numberedDispayCount === 0 || numberedDispayCount < 0;
        },
        isDot() {
            return (this.data.get('dot') && !this.data.get('isZero')) || this.data.get('hasStatus');
        },
        isHidden() {
            const showZero = this.data.get('showZero');
            const displayCount = this.data.get('isDot') ? '' : this.data.get('getNumberedDisplayCount');
            const isZero = this.data.get('isZero');
            const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
            return (isEmpty || (isZero && !showZero));
        }
    },

    styleWithOffset(offset, bodyStyle) {
        return offset
            ? {
                'right': -parseInt(offset[0], 10),
                'margin-top': offset[1],
                ...bodyStyle
            }
            : bodyStyle;
    },

    getScrollNumberTitle(title, count) {
        return title || typeof count === 'string' || typeof count === 'number' ? count : '';
    },

    statusStyle(color) {
        if (color && !presetColorTypes.includes(color)) {
            return {
                background: color
            };
        }
        return {};
    },

    template: `
        <span class="{{classes}}" style="{{!hasChild && hasStatus ? styleWithOffset(offset, bodyStyle) : ''}}">
            <slot />
            <span s-if="{{!hasChild && hasStatus}}" class="{{statusClass}}" style="{{statusStyle(color)}}"></span>
            <span
                style="{{{color: bodyStyle.color}}}"
                class="${prefixCls}-status-text"
                s-if="{{!hasChild && hasStatus}}"
            >{{text}}</span>
            <s-scrollnumber
                s-if="{{!isHidden || isDot && !hasStatus}}"
                prefixCls="${scrollNumberPrefixCls}"
                data-show="{{!isHidden}}"
                class="{{isDot ? '${prefixCls}-dot' : '${prefixCls}-count'}}"
                count="{{isDot ? '' : getNumberedDisplayCount}}"
                title="{{getScrollNumberTitle(title, count)}}"
                style="{{styleWithOffset(offset, bodyStyle)}}"
                key="{{scrollNumber}}"
            />
            <slot name="count" />
        </span>
    `
});
