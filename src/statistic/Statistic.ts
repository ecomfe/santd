/**
 * @file 组件 statistic
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import * as I from './interface';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import {TCountdown} from './countdown';

const prefixCls = classCreator('statistic')();

function padEnd(string: string, length: number, chars: string) {
    let strLength = length ? string.length : 0;
    let l = length - strLength;
    let padding = '';

    while (l--) {
        padding += chars;
    }

    return (length && strLength < length)
        ? (string + padding)
        : string;
}


export default class Statistic extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <div class="${prefixCls}">
            <div class="${prefixCls}-title" s-if="title">{{title}}</div>
            <div class="${prefixCls}-content" style="{{valueStyle}}">
                <span s-if="hasPrefix" class="${prefixCls}-content-prefix">
                    <slot name="prefix" />{{prefix}}
                </span>
                <span class="${prefixCls}-content-value">
                    <span class="${prefixCls}-content-value-int">{{showValue.int}}</span>
                    <span class="${prefixCls}-content-value-decimal"
                        s-if="{{showValue.decimal}}"
                    >{{showValue.decimal}}</span>
                </span>
                <span s-if="hasSuffix" class="${prefixCls}-content-suffix">
                    <slot name="suffix" />{{suffix}}
                </span>
            </div>
        </div>
    `;

    initData(): I.State {
        return {
            groupSeparator: ',',
            value: 0,
            decimalSeparator: '.',
        };
    }

    inited(): void {
        this.data.set('hasPrefix', this.data.get('prefix') || !!this.sourceSlots.named.prefix);
        this.data.set('hasSuffix', this.data.get('suffix') || !!this.sourceSlots.named.suffix);
    }

    static Countdown: TCountdown;

    static computed: I.Computed = {
        showValue(this: Statistic) {
            let value = this.data.get('value');
            let formatter = this.data.get('formatter');
            let groupSeparator = this.data.get('groupSeparator');
            let precision = this.data.get('precision');
            let decimalSeparator = this.data.get('decimalSeparator');

            if (formatter && typeof formatter === 'function') {
                return {
                    int: formatter(value)
                };
            }

            value = String(value);
            const cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);

            if (!cells) {
                return {int: value};
            }

            const negative = cells[1];
            let int = cells[2] || '0';
            let decimal = cells[4] || '';
            int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

            if (typeof precision === 'number') {
                decimal = padEnd(decimal, precision, '0').slice(0, precision);
            }
            if (decimal) {
                decimal = `${decimalSeparator}${decimal}`;
            }

            return {
                int: negative + int,
                decimal
            };
        }
    }
};
