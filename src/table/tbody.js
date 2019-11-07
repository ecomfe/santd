/**
 * @file santd Table 表格组件 td 模板
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../core/util';
import Td from './td';
const prefixCls = classCreator('table')();

export default {
    template: `
        <tbody class="${prefixCls}-tbody">
            <template s-for="item, index in renderData" s-if="renderData.length">
            <tr
                class="${prefixCls}-row"
                style="display: {{item.level === 0 || item.expanded ? '' : 'none;'}}"
                on-click="handleRowClick(item)"
            >
                ${Td.template}
            </tr>
            <tr
                s-if="hasExpandedRowRender"
                class="${prefixCls}-expanded-row"
                style="display: {{item.expanded ? '' : 'none'}}"
            >
                <td></td>
                <td colspan="{{tdColumns.length}}" >
                    <slot name="expandedRowRender" var-record="{{item}}"/>
                </td>
            </tr>
            </template>
        </tbody>
    `
};
