/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('select')();

export default san.defineComponent({
    dataTypes: {
        value: DataTypes.array,
        inputValue: DataTypes.string,
        showSearch: DataTypes.bool,
        popupVisible: DataTypes.bool
    },
    template: `
        <div
            class="${prefixCls}-selection-selected-value"
            style="opacity: {{popupVisible && showSearch ? '0.4' : '1'}}"
        >
            <template s-if="!inputValue">
                <template s-if="value.length && value[0].title">
                    {{value[0].title}}
                </template>
                <slot s-else />
            </template>
        </div>
    `
});
