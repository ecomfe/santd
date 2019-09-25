/**
 * @file 组件 popover
 * @author mayihui@baidu.com
 */

import './style/index';
import san from 'san';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';

const prefixCls = classCreator('popover')();

export default san.defineComponent({
    initData() {
        return {
            ...Tooltip.prototype.initData(),
            prefixCls,
            transitionName: 'zoom-big'
        };
    }
}, Tooltip);
