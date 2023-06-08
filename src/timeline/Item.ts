/**
 * @file 组件 timeline
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import {IItemProps} from './interface';

const prefixCls = classCreator('timeline')();

export default class Item extends Base<IItemProps> {
    initData(): IItemProps {
        return {
            color: 'blue',
            pending: false,
            label: ''
        };
    }
    inited(): void {
        this.data.set('hasDot', !!this.sourceSlots.named.dot);
        this.dispatch('santd_timeline_addItem', this);
    }
    getDotStyle(color: string) {
        if (!/blue|red|green|gray/.test(color)) {
            return {
                'border-color': color
            };
        }
    }
    static template = `
        <li class="${prefixCls}-item {{pending ? '${prefixCls}-item-pending' : ''}}">
            <div class="${prefixCls}-item-tail" />
            <div
                class="${prefixCls}-item-head ${prefixCls}-item-head-{{color}} {{hasDot ? '${prefixCls}-item-head-custom' : ''}}"
                style="{{getDotStyle(color)}}"
            >
                <slot name="dot" />
            </div>
            <div class="${prefixCls}-item-label">{{label}}</div>
            <div class="${prefixCls}-item-content"><slot /></div>
        </li>
    `;
};
