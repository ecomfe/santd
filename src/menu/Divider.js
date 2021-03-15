/**
* @file divider 分割线
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('menu')();

export default san.defineComponent({
    template: `
        <li class="${prefixCls}-item-divider"></li>
    `
});
