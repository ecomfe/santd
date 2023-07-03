/**
* @file select 头部selector部分
* @author fuqiangqiang@baidu.com
*/

import {classCreator} from '../core/util';
const prefixCls = classCreator('select')();
import Base from 'santd/base';

export default class SingleSelector extends Base {
    static template = `
        <div
            class="${prefixCls}-selection-selected-value"
            style="opacity: {{popupVisible && showSearch ? '0.4' : '1'}}"
        >
            <template s-if="!inputValue">
                <template s-if="value.length && value[0][treeNodeLabelProp]">
                    {{value[0][treeNodeLabelProp]}}
                </template>
                <slot s-else />
            </template>
        </div>
    `
};
