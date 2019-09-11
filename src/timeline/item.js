/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('timeline')();

export default san.defineComponent({
    dataTypes: {
        color: DataTypes.string,
        pending: DataTypes.bool
    },
    initData() {
        return {
            color: 'blue',
            pending: false
        };
    },
    inited() {
        this.data.set('hasDot', !!this.sourceSlots.named.dot);
        this.dispatch('santd_timeline_addItem', this);
    },
    getDotStyle(color) {
        if (!/blue|red|green|gray/.test(color)) {
            return {
                'border-color': color
            };
        }
    },
    template: `
        <li class="${prefixCls}-item {{pending ? '${prefixCls}-item-pending' : ''}}">
            <div class="${prefixCls}-item-tail" />
            <div
                class="${prefixCls}-item-head ${prefixCls}-item-head-{{color}} {{hasDot ? '${prefixCls}-item-head-custom' : ''}}"
                style="{{getDotStyle(color)}}"
            >
                <slot name="dot" />
            </div>
            <div class="${prefixCls}-item-content"><slot /></div>
        </li>
    `
});
