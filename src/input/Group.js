/**
* @file inputGroup 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('input-group')();

export default san.defineComponent({
    dataTypes: {
        size: DataTypes.string,
        compact: DataTypes.bool
    },
    initData() {
        return {
            size: 'default'
        };
    },
    template: `
        <div class="${prefixCls} ${prefixCls}-{{size}} {{compact ? '${prefixCls}-compact' : ''}}">
            <slot />
        </div>
    `
});
