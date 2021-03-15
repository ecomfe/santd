/**
 * @file 组件 statistic
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('statistic')();

function padEnd(string, length, chars) {
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

export default san.defineComponent({
    dataTypes: {
        decimalSeparator: DataTypes.string,
        formatter: DataTypes.func,
        groupSeparator: DataTypes.string,
        precision: DataTypes.number,
        prefix: DataTypes.string,
        suffix: DataTypes.string,
        title: DataTypes.string,
        value: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },
    template: `
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
    `,

    initData() {
        return {
            groupSeparator: ',',
            value: 0,
            decimalSeparator: '.'
        };
    },

    inited() {
        this.data.set('hasPrefix', this.data.get('prefix') || !!this.sourceSlots.named.prefix);
        this.data.set('hasSuffix', this.data.get('suffix') || !!this.sourceSlots.named.suffix);
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
});
