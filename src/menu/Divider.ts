/**
* @file divider 分割线
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
const prefixCls = classCreator('menu')();

export default class Divider extends Base {
    static template = /* html */ `
        <li class="${prefixCls}-item-divider"></li>
    `
};

export type TDivider = typeof Divider;
