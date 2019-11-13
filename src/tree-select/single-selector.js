/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('select')();

export default san.defineComponent({
    dataTypes: {
        title: DataTypes.any
    },
    template: `
        <div class="${prefixCls}-selection-selected-value">
            <template s-if="value.length && value[0].title">
                {{value[0].title}}
            </template>
            <slot s-else />
        </div>
    `
});
