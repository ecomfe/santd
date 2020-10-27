/**
 * @file santd Table 表格组件 td 模板
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../core/util';
const prefixCls = classCreator('table')();

const contentTemplate = `
    <!--配置展开图标-->
    <template s-if="isTree && columnIndex === 0">
        <span class="${prefixCls}-row-indent indent-level-{{item.level}}" style="padding-left: {{item.level * indentSize}}px;"></span>
        <span on-click="handleTreeExpand(item)" s-if="hasExpandIcon && item.collapsed !== undefined">
            <slot name="expandIcon" var-record="{{item}}"/>
        </span>
        <span
            s-else
            class="${prefixCls}-row-expand-icon ${prefixCls}-row-{{item.collapsed !== undefined ? item.collapsed ? 'collapsed' : 'expanded' : 'spaced'}}"
            on-click="handleTreeExpand(item)"
        ></span>
    </template>
    <!--配置scoped slot-->
    <slot
        s-if="column.scopedSlots.render"
        name="{{column.scopedSlots.render}}"
        var-text="{{column.scopedSlots.render === 'render' ? item[column.dataIndex] : item[column.scopedSlots.render]}}"
        var-record="{{item}}"
        var-index="{{index}}"
        var-column="{{column}}"
    />
    <s-tooltip s-elif="column.ellipsis" placement="topLeft" title="{{column.children || item[column.dataIndex] | raw}}">
        <div class="${prefixCls}-row-item">{{column.children || item[column.dataIndex] | raw}}</div>
    </s-tooltip>
    <template s-else>
       <div class="${prefixCls}-row-item">{{column.children || item[column.dataIndex] | raw}}</div>
    </template>
`;

export default {
    template: `
        <td s-if="rowSelection" class="${prefixCls}-selection-column">
            <s-radio s-if="rowSelection.type === 'radio'"
                autoFocus="{{getCheckboxProps(item, 'autoFocus')}}"
                checked="{{getItemChecked(item, selectedRowKeys)}}"
                defaultChecked="{{getCheckboxProps(item, 'defaultChecked')}}"
                name="{{getCheckboxProps(item, 'name')}}"
                disabled="{{getCheckboxProps(item, 'disabled')}}"
                on-click="handleSelection($event, item, index)"
            ></s-radio>
            <s-checkbox
                s-else
                autoFocus="{{getCheckboxProps(item, 'autoFocus')}}"
                checked="{{getItemChecked(item, selectedRowKeys)}}"
                defaultChecked="{{getCheckboxProps(item, 'defaultChecked')}}"
                name="{{getCheckboxProps(item, 'name')}}"
                disabled="{{getCheckboxProps(item, 'disabled')}}"
                on-change="handleSelection($event, item, index)"
            />
        </td>
        <template s-for="column, columnIndex in getColumns(tdColumns, item, index)">
            <td s-if="hasExpandedRowRender && columnIndex === 0" class="${prefixCls}-row-expand-icon-cell">
                <template s-if="rowExpandable(item, columnIndex)">
                    <span on-click="handleExpandRow(item)" s-if="hasExpandIcon">
                        <slot name="expandIcon" var-record="{{item}}"/>
                    </span>
                    <span class="${prefixCls}-row-expand-icon ${prefixCls}-row-{{item.expanded ? 'expanded' : 'collapsed'}}" on-click="handleExpandRow(item)" s-else></span>
                </template>
            </td>
            <td s-if="column.attrs.colSpan" colspan="{{column.attrs.colSpan}}" class="{{getThClass(column)}} {{column.ellipsis ? '${prefixCls}-cell-ellipsis' : ''}}" style="{{getThStyle(column)}}">${contentTemplate}</td>
            <td s-else-if="column.attrs.rowSpan" rowspan="{{column.attrs.rowSpan}}" class="{{getThClass(column)}} {{column.ellipsis ? '${prefixCls}-cell-ellipsis' : ''}}" style="{{getThStyle(column)}}">${contentTemplate}</td>
            <td
                s-else-if="column.attrs.colSpan && column.attrs.rowSpan"
                colspan="{{column.attrs.colSpan}}"
                rowspan="{{column.attrs.rowSpan}}"
                class="{{getThClass(column)}} {{column.ellipsis ? '${prefixCls}-cell-ellipsis' : ''}}"
                style="{{getThStyle(column)}}"
            >${contentTemplate}</td>
            <td s-else class="{{getThClass(column)}} {{column.ellipsis ? '${prefixCls}-cell-ellipsis' : ''}}" style="{{getThStyle(column)}}">${contentTemplate}</td>
        </template>
    `
};
