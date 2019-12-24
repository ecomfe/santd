/**
 * @file santd Table 表格组件 td 模板
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../core/util';
const prefixCls = classCreator('table')();

const titleTemplate = `
    <!--配置title slot-->
    <slot s-if="column.slots.title" name="{{column.slots.title}}" />
    <template s-else>{{column.title}}</template>
`;

export default {
    template: `
        <!--配置sorter-->
        <span class="${prefixCls}-header-column">
            <div class="${prefixCls}-column-sorters" s-if="column.sorter" on-click="handleSorter(column, columnIndex, thIndex)">
                <span class="${prefixCls}-column-title">${titleTemplate}</span>
                <span class="${prefixCls}-column-sorter">
                    <div class="${prefixCls}-column-sorter-inner {{hasSorterIcon(column, 'ascend') && hasSorterIcon(column, 'descend') ? '${prefixCls}-column-sorter-inner-full' : ''}}">
                        <s-icon type="caret-up" class="${prefixCls}-column-sorter-up {{column.sortOrder === 'ascend' ? 'on' : 'off'}}" s-if="hasSorterIcon(column, 'ascend')"/>
                        <s-icon type="caret-down" class="${prefixCls}-column-sorter-down {{column.sortOrder === 'descend' ? 'on' : 'off'}}" s-if="hasSorterIcon(column, 'descend')"/>
                    </div>
                </span>
            </div>
            <template s-else>${titleTemplate}</template>
        </span>
        <!--配置filterIcon slot-->
        <s-dropdown
            dropdownClassName="${prefixCls}-filter-icon"
            placement="bottomRight"
            trigger="click"
            overlayClassName="${prefixCls}-filter-dropdown"
            visible="{{column.filterVisible}}"
            on-visibleChange="handleFilterVisibleChange($event, column, columnIndex, thIndex)"
            s-if="column.scopedSlots.filterIcon || column.filters"
            useDomNodeForce="{{true}}"
        >
            <slot name="{{column.scopedSlots.filterIcon}}"/>
            <slot
                slot="overlay"
                name="{{column.scopedSlots.filterDropdown}}"
                var-selectedKeys="{{selectedKeys[column.key || column.dataIndex] || []}}"
                var-column="{{column}}"
                s-if="column.scopedSlots.filterIcon"
            />
            <s-icon type="filter" s-if="column.filters"/>
            <template slot="overlay">
                <s-menu
                    prefixCls="{{prefixCls}}"
                    s-if="column.filters"
                    multiple="{{column.filterMultiple !== false ? true : false}}"
                    selectedKeys="{{selectedKeys[column.key || column.dataIndex] || []}}"
                    on-select="setSelectedKeys($event.selectedKeys, column)"
                    on-deselect="setSelectedKeys($event.selectedKeys, column)"
                >
                    <s-menu-item s-for="filter in column.filters" key="{{filter.value}}">
                        <s-checkbox checked="{{getFilterChecked(selectedKeys[column.key || column.dataIndex], filter.value)}}" s-if="column.filterMultiple !== false" />
                        <s-radio checked="{{getFilterChecked(selectedKeys[column.key || column.dataIndex], filter.value)}}" s-else/>
                        {{filter.text}}
                    </s-menu-item>
                </s-menu>
                <div class="${prefixCls}-filter-dropdown-btns" s-if="column.filters">
                    <a class="${prefixCls}-filter-dropdown-link confirm" on-click="confirm">确定</a>
                    <a class="${prefixCls}-filter-dropdown-link clear" on-click="clearFilter(column)">取消</a>
                </div>
            </template>
        </s-dropdown>
    `
};
