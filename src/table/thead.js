/**
 * @file santd Table 表格组件 thead 模板
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../core/util';
import Th from './th';
const prefixCls = classCreator('table')();
const dropdownPrefixCls = classCreator('dropdown')();

export default {
    template: `
        <thead class="${prefixCls}-thead">
            <tr class="${prefixCls}-row" s-for="columns, thIndex in thColumns">
                <th s-if="rowSelection" class="${prefixCls}-selection-column {{rowSelection.selections ? '${prefixCls}-selection-column-custom': ''}}">
                    <div class="${prefixCls}-selection">
                        <s-checkbox
                            checked="{{getAllChecked(renderData, selectedRowKeys)}}"
                            disabled="{{getAllDisabled(renderData, selectedRowKeys)}}"
                            indeterminate="{{getIndeterminate(selectedRowKeys, renderData)}}"
                            on-change="handleSelectionAll($event)"
                        />
                        <s-dropdown
                            s-if="rowSelection.selections"
                            style="padding:0;"
                            trigger="hover"
                            placement="bottomLeft"
                            visible="{{rowSelection.visible}}"
                            on-visibleChange="handleRowSelectionVisible"
                            dropdownClassName="${prefixCls}-selection-down ${dropdownPrefixCls}-trigger"
                        >
                            <s-menu prefixCls="{{prefixCls}}" slot="overlay" on-select="handleSelections">
                                <s-menu-item s-for="selection in rowSelection.selections" key="{{selection.key}}">
                                    {{selection.text}}
                                </s-menu-item>
                            </s-menu>
                            <s-icon type="down" />
                         </s-dropdown>
                    </div>
                </th>
                <th s-if="hasExpandedRowRender" class="${prefixCls}-expand-icon-th"></th>
                <template s-for="column, columnIndex in columns">
                    <th class="{{getThClass(column)}}" style="{{getThStyle(column)}}" s-if="column.rowspan" rowspan="{{column.rowspan}}">${Th.template}</th>
                    <th class="{{getThClass(column)}}" style="{{getThStyle(column)}}" s-if="column.colspan" colspan="{{column.colspan}}">${Th.template}</th>
                </template>
            </tr>
        </thead>
    `
};
