/**
 * @file 组件 statistic
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';

const cc = classCreator('statistic');
const prefix = cc();

const padEnd = (string, length, chars) => {
    string = string.toString();
    length = parseInt(length, 0);

    let strLength = length ? string.length : 0;
    let l = length - strLength;
    let padding = '';
    while (l-- > 0) {
        padding += chars;
    }
    return (length && strLength < length)
        ? (string + padding)
        : string;
};
export default san.defineComponent({
    template: `
    	<div class="${prefix}">
            <div class="${prefix}-title" s-if="title">{{title}}</div>
            <div class="${prefix}-content" style="{{valueStyle}}">
                <span s-if="showPrefix" class="${prefix}-content-prefix">
                    <slot name="prefix"/>
                </span>
                <span class="${prefix}-content-value">
                    <span class="${prefix}-content-value-int">{{showValue.int}}</span>
                    <span class="${prefix}-content-value-decimal"
                        s-if="{{showValue.decimal}}">{{showValue.decimal}}</span>
                </span>
                <span s-if="showSuffix" class="${prefix}-content-suffix">
                    <slot name="suffix"/>
                </span>
            </div>
        </div>
    `,
    initData()  {
        return {
            groupSeparator: ',',
            value: 0,
            decimalSeparator: '.'
        };
    },
    computed: {
        showValue() {
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
            value = value.toString();
            const cells = value.match(/^(-?)(\d*)(\.(\d+))?$/);
            if (!cells) {
                return {int: value};
            } else {
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
    },
    inited() {
        this.data.set('showPrefix', !!this.sourceSlots.named.prefix);
        this.data.set('showSuffix', !!this.sourceSlots.named.suffix);
    }
});
