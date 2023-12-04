/**
 * @file 组件 badge
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('badge')();
const scrollNumberPrefixCls = classCreator('scroll-number')();
import Base from 'santd/base';
import {IBadageProps, IPresetColorTypes, SlotNode} from './interface';
const presetColorTypes: IPresetColorTypes = {
    pink: 1,
    red: 1,
    yellow: 1,
    orange: 1,
    cyan: 1,
    green: 1,
    blue: 1,
    purple: 1,
    geekblue: 1,
    magenta: 1,
    volcano: 1,
    gold: 1,
    lime: 1
};

let scrollNumberList: number[] = [];
for (let i = 0; i < 30; i++) {
    scrollNumberList.push(i % 10);
}
class ScrollNumber extends Base {
    static template = `
        <sup class="${scrollNumberPrefixCls}" title="{{title || ''}}" style="{{offsetStyle}}">
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
    `;

    static computed = {
        isOverflow(this: ScrollNumber) {
            let count = +this.data.get('count');
            return !count;
        },
        numberStyles(this: ScrollNumber) {
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
    }
    getStyleArr(this: ScrollNumber) {
        let numberArray = this.data.get('numberArray');
        let styleArr = [];

        if (numberArray) {
            for (let i = 0; i < numberArray.length; i++) {
                let num = numberArray[i];
                styleArr.push('transform: translateY(' + ((10 + num) * -100) + '%);');
            }
        }

        return styleArr;
    }

    initData() {
        return {
            scrollNumberList
        };
    }
}

export default class Badge extends Base<IBadageProps> {
    autoFillStyleAndId!:false;
    _hasChild?: boolean | undefined;

    static components = {
        's-scrollnumber': ScrollNumber
    }

    initData(): IBadageProps {
        return {
            showZero: false,
            dot: false,
            overflowCount: 99,
            hasChild: this._hasChild,
        };
    }


    attached() {
        (this.slot('count')as SlotNode[])[0].children.forEach(children => {
            if (children instanceof san.Component) {
                children.data.set('class', scrollNumberPrefixCls + '-custom-component');
            }
        });
    }

    compiled() {
        if (this.sourceSlots.noname || this.sourceSlots.named.count) {
            this._hasChild = true;
        }
    }

    static computed = {
        classes(this: Badge) {
            let classArr = [];

            this.data.get('hasStatus') && classArr.push(`${prefixCls}-status`);
            !this.data.get('hasChild') && classArr.push(`${prefixCls}-not-a-wrapper`);
            return classArr;
        },

        mainStyles(this: Badge) {
            let offset = this.data.get('offset');            
            let style = this.data.get('style');
            let hasChild = this.data.get('hasChild');
            let hasStatus = this.data.get('hasStatus');

            if (!hasChild && hasStatus) {
                return offset
                    ? {
                        'right': -offset[0],
                        'margin-top': offset[1],
                        ...style
                    }
                    : style;
            }

            return '';
        },

        hasStatus(this: Badge) {
            return this.data.get('status') || this.data.get('color');
        },

        statusClass(this: Badge) {
            const status = this.data.get('status');
            const color = this.data.get('color') as keyof IPresetColorTypes;
            let classArr = [];

            (status || color) && classArr.push(`${prefixCls}-status-dot`);
            status && classArr.push(`${prefixCls}-status-${status}`);
            presetColorTypes[color] && classArr.push(`${prefixCls}-status-${color}`);
            return classArr;
        },

        displayCount(this: Badge) {
            const count = +(this.data.get('count') as string | number);
            const overflowCount = this.data.get('overflowCount');

            return count > overflowCount ? overflowCount + '+' : count;
        },

        isZero(this: Badge) {
            const count = +(this.data.get('count') as string | number);
            return count === 0;
        }
    }

    static template = `
        <span class="${prefixCls} {{classes}}" style="{{mainStyles}}">
            <slot />
            <span s-if="!hasChild && hasStatus" class="{{statusClass}}" style="{{color ? 'background:' + color : ''}}">
            </span>
            <span
                style="{{style && style.color ? 'color:' + color : ''}}"
                class="${prefixCls}-status-text"
                s-if="!hasChild && hasStatus"
            >{{text}}</span>
            <s-scrollnumber
                s-if="isZero ? showZero : (count || dot)"
                class="${prefixCls}-{{count || isZero && showZero ? 'count' : 'dot'}}"
                count="{{dot && count || hasStatus ? '' : displayCount}}"
                title="{{title || count}}"
                style="{{style}}"
            />
            <slot name="count" />
        </span>
    `
};
