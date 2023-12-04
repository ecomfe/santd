/**
 * @file 组件 card
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import Base from 'santd/base';
import {classCreator} from '../core/util';

const prefixCls = classCreator('card')();

export default class extends Base {
    static template = `
        <div class="${prefixCls}-grid"><slot /></div>
    `;
}
