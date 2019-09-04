/**
 * @file 组件 badge
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('badge')();
const scrollNumberPrefixCls = classCreator('scroll-number')();

const presetColorTypes = [
    'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue',
    'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'
];

let scrollNumberList = [];
for (let i = 0; i < 30; i++) {
    scrollNumberList.push(i % 10);
}

const ScrollNumber = san.defineComponent({
    dataTypes: {
        count: DataTypes.oneOfType([DataTypes.string, DataTypes.object, DataTypes.number]),
        title: DataTypes.oneOfType([DataTypes.string, DataTypes.object, DataTypes.number])
    },

    template: `
        <sup class="${scrollNumberPrefixCls}" title="{{title}}">
            <template s-if="isOverflow">
                {{count}}
            </template>
            <span
                s-elif="numberStyles.length"
                s-for="numStyle, idx in numberStyles trackBy idx"
                class="${scrollNumberPrefixCls}-only"
                style="{{numStyle}};"
            >
                <p s-for="item in scrollNumberList">{{item}}</p>
            </span>
        </sup>
    `,

    computed: {
        isOverflow() {
            let count = +this.data.get('count');
            return !count;
        },

        numberStyles() {
            let results = [];

            // 简单点，就不依赖 isOverflow 了
            let count = +this.data.get('count');
            if (count) {
                let nums = count.toString().split('');

                for (let i = 0; i < nums.length; i++) {
                    let num = +nums[i];
                    results.push('transform: translateY(' + ((10 + num) * -100) + '%);');
                }
            }
            
            return results;
        }
    },

    getStyleArr() {
        let numberArray = this.data.get('numberArray');
        let styleArr = [];

        if (numberArray) {
            for (let i = 0; i < numberArray.length; i++) {
                let num = numberArray[i];
                styleArr.push('transform: translateY(' + ((10 + num) * -100) + '%);');
            }
        }

        return styleArr;
    },

    initData() {
        return {
            scrollNumberList
        };
    }
});


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
        this.slot('count')[0].children.forEach(children => {
            if (children.nodeType === 5) {
                children.data.set('class', scrollNumberPrefixCls + '-custom-component');
            }
        });
    },

    inited() {
        if (this.sourceSlots.noname || this.sourceSlots.named.count) {
            this.data.set('hasChild', true);
        }
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
            <span s-if="{{!hasChild ? hasStatus : ''}}" class="{{statusClass}}" style="{{statusStyle(color)}}"></span>
            <span
                style="{{{color: bodyStyle.color}}}"
                class="${prefixCls}-status-text"
                s-if="{{!hasChild ? hasStatus : ''}}"
            >{{text}}</span>
            <s-scrollnumber
                s-if="{{!isHidden || isDot && !hasStatus}}"
                data-show="{{!isHidden}}"
                class="{{isDot ? '${prefixCls}-dot' : '${prefixCls}-count'}}"
                count="{{isDot ? '' : getNumberedDisplayCount}}"
                title="{{getScrollNumberTitle(title, count)}}"
                style="{{styleWithOffset(offset, bodyStyle)}}"
            />
            <slot name="count" />
        </span>
    `
});