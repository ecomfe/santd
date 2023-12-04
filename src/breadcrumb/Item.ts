/**
* @file 面包屑组件的每一项
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import {ItemState, ItemProps} from './interface'
const prefixCls = classCreator('breadcrumb')();

export default class Item extends Base<ItemState, ItemProps> {

    initData(): ItemState {
        return {
            separator: '/'
        };
    }

    inited(): void {
        this.dispatch('santd_breadcrumb_add', this);
    }

    static template = `
        <span>
            <a s-if="href" href="{{href}}" class="${prefixCls}-link"><slot/></a>
            <span s-else class="${prefixCls}-link"><slot/></span>
            <span class="${prefixCls}-separator">{{separator}}</span>
        </span>
    `
};
export type TItem = typeof Item;