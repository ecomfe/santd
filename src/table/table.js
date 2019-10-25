/**
 * @file santd Table 表格组件
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import isEmpty from 'lodash/isEmpty';
import Icon from '../icon';
import Spin from '../spin';
import Pagination from '../pagination';
import {classCreator} from '../core/util';
import renderEmpty from '../core/util/renderEmpty';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Radio from '../radio';
import Checkbox from '../checkbox';
import Button from '../button';
import './style/index';

const prefixCls = classCreator('table')();

const renderTemplate = `
    <!--配置展开图标-->
    <template s-if="isTree && columnIndex === 0">
        <span class="${prefixCls}-row-indent indent-level-{{item.level}}" style="padding-left: {{item.level * indentSize}}px;"></span>
        <span
            class="${prefixCls}-row-expand-icon ${prefixCls}-row-{{item.children ? item.collapsed ? 'collapsed' : 'expanded' : 'spaced'}}"
            on-click="handleTreeExpand(item)"
        ></span>
    </template>
    <!--配置scoped slot-->
    <slot
        s-if="column.scopedSlots.render && !column.children"
        name="{{column.scopedSlots.render}}"
        var-text="{{column.scopedSlots.render === 'render' ? item[column.key || column.dataIndex] : item[column.scopedSlots.render]}}"
        var-record="{{item}}"
        var-index="{{index}}"
        var-column="{{column}}"
    />
    <template s-else>{{column.children || item[column.key || column.dataIndex] | raw}}</template>
`;

const titleTemplate = `
                        <!--配置title slot-->
                        <slot s-if="column.slots.title" name="{{column.slots.title}}" />
                        <template s-else>{{column.title}}</template>
`;

const tableInnerTemplate = `
    <div s-if="scroll.y" class="${prefixCls}-header ${prefixCls}-hide-scrollbar">
        <table class="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="width: {{scroll.x || '100%'}}">
        </table>
    </div>
    <div
        s-if="!virtualScroll"
        class="${prefixCls}-body"
    >
        <table classs="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="width: {{scroll.x}}">
            <thead class="${prefixCls}-thead">
                <tr class="${prefixCls}-row">
                    <th s-if="hasExpandedRowRender" class="${prefixCls}-expand-icon-th"></th>
                    <th s-for="column, columnIndex in processedColumns" class="{{getThClass(column)}}">
                        <!--配置sorter-->
                        <span class="${prefixCls}-header-column">
                            <div class="${prefixCls}-column-sorters" s-if="column.sorter" on-click="handleSorter(column, columnIndex)">
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
                            on-visibleChange="handleFilterVisibleChange($event, column, columnIndex)"
                            s-if="column.scopedSlots.filterIcon || column.filters"
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
                    </th>
                </tr>
            </thead>
            <tbody class="${prefixCls}-tbody">
                <template s-for="item, index in data">
                <tr class="${prefixCls}-row" style="display: {{item.level === 0 || item.expanded ? '' : 'none;'}}">
                    <template s-for="column, columnIndex in getColumns(processedColumns, item, index)">
                        <td s-if="hasExpandedRowRender && columnIndex === 0" class="${prefixCls}-row-expand-icon-cell">
                            <span class="${prefixCls}-row-expand-icon ${prefixCls}-row-{{item.expandedRow ? 'expanded' : 'collapsed'}}" on-click="handleExpandRow(item)"></span>
                        </td>
                        <td s-if="column.attrs.colSpan" colspan="{{column.attrs.colSpan}}" class="{{getThClass(column)}}">${renderTemplate}</td>
                        <td s-else-if="column.attrs.rowSpan" rowspan="{{column.attrs.rowSpan}}" class="{{getThClass(column)}}">${renderTemplate}</td>
                        <td
                            s-else-if="column.attrs.colSpan && column.attrs.rowSpan"
                            colspan="{{column.attrs.colSpan}}"
                            rowspan="{{column.attrs.rowSpan}}"
                            class="{{getThClass(column)}}"
                        >${renderTemplate}</td>
                        <td s-else class="{{getThClass(column)}}">${renderTemplate}</td>
                    </template>
                </tr>
                <tr
                    s-if="hasExpandedRowRender"
                    class="${prefixCls}-expanded-row"
                    style="display: {{item.expandedRow ? '' : 'none'}}"
                >
                    <td></td>
                    <td colspan="{{processedColumns.length}}" >
                        <slot name="expandedRowRender" var-record="{{item}}"/>
                    </td>
                </tr>
                </template>
            </tbody>
        </table>
    </div>
    <div class="${prefixCls}-footer" s-if="hasFooter">
        <slot name="footer" s-if="!footer" />
        <template s-else>{{footer}}</template>
    </div>
`;

export default san.defineComponent({
    dataTypes: {
        loading: DataTypes.bool,
        scroll: DataTypes.object,
        size: DataTypes.string,
        title: DataTypes.string,
        data: DataTypes.array,
        // pagination: DataTypes.object
    },
    initData() {
        return {
            loading: false,
            scroll: {},
            size: 'default',
            data: [],
            pagination: {
                current: 1,
                pageSize: 10
            },
            selectedKeys: {},
            indentSize: 20,
            expandedKeys: []
        };
    },
    computed: {
        classes() {
            const scroll = this.data.get('scroll');
            const size = this.data.get('size');
            const bordered = this.data.get('bordered');
            let classArr = [prefixCls];

            (scroll.x || scroll.y) && classArr.push(`${prefixCls}-fixed-header`);
            bordered && classArr.push(`${prefixCls}-bordered`);
            size && classArr.push(`${prefixCls}-${size}`);

            return classArr;
        }
    },
    inited() {
        this.rowSpanArr = {};
        let data = this.prepareRenderData(this.data.get('data') || []);

        this.data.set('data', data);
        this.data.set('originalData', data.concat());
        this.data.set('filteredData', data.concat());
        this.data.set('processedColumns', this.processColumns(this.data.get('columns')));
        this.data.set('hasTitle', !!this.sourceSlots.named.title || this.data.get('title'));
        this.data.set('hasFooter', !!this.sourceSlots.named.footer || this.data.get('footer'));
        this.data.set('hasExpandedRowRender', !!this.sourceSlots.named.expandedRowRender);

        this.watch('columns', val => {
            this.data.set('processedColumns', this.processColumns(val));
            this.confirm();
            const sortColumn = this.data.get('sortColumn') || {};
            const sortColumnIndex = this.data.get('sortColumnIndex');
            let sortDirections = sortColumn.sortDirections || ['ascend', 'descend'];
            const sortOrderIndex = sortDirections.indexOf(sortColumn.sortOrder);
            if (sortOrderIndex !== -1 && sortColumn.sortOrder) {
                sortColumn.sortOrder = sortDirections[sortOrderIndex - 1];
            }
            else {
                sortColumn.sortOrder = sortDirections[sortDirections.length - 1];
            }
            this.handleSorter(sortColumn, sortColumnIndex);
        });
    },
    components: {
        's-spin': Spin,
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-radio': Radio,
        's-button': Button,
        's-checkbox': Checkbox
    },
    // 针对columns中的各种配置项做预处理
    processColumns(columns) {
        /*let sortColumn = this.data.get('sortColumn');
        let sortColumnIndex = this.data.get('sortColumnIndex');*/
        let sortColumn;
        let sortColumnIndex;
        const selectedKeys = this.data.get('selectedKeys');
        columns = columns.map((column, index) => {
            const key = column.key || column.dataIndex;
            if (!sortColumn && column.defaultSortOrder || column.sortOrder) {
                column.sortOrder = column.sortOrder || column.defaultSortOrder;
                sortColumn = column;
                sortColumnIndex = index;
            }
            // 处理有filteredValue的情况，如果有，扔到selectedKeys里面
            if (column.filteredValue && Array.isArray(column.filteredValue)) {
                let selectedKey = selectedKeys[key] || [];
                this.data.set(`selectedKeys.${key}`, selectedKey.concat(column.filteredValue));
            }
            else if (column.filteredValue === null && selectedKeys[key]) {
                delete selectedKeys[key];
                this.data.set('selectedKeys', selectedKeys);
            }
            column.filteredValue = [];
            column.filterVisible = false;
            return column;
        });
        if (sortColumn) {
            this.data.set('sortColumn', sortColumn);
            this.data.set('sortColumnIndex', sortColumnIndex);
        }
        return columns;
    },
    // 这里对原始数据针对column中的配置进行处理
    prepareRenderData(data) {
        data = this.flattenData(data);
        console.log(data);
        return data;
    },
    getColumns(columns, item, dataIndex) {
        let colSpanIndex = 0;
        let colSpan;
        let result = [];

        columns.forEach((column, i) => {
            let render = column.render;
            let newColumn = {
                ...column
            };
            if (render && typeof render === 'function') {
                let itemAttrs = render(item[column.key || column.dataIndex], item, dataIndex);
                newColumn.children = itemAttrs.children || itemAttrs;
                newColumn.attrs = itemAttrs.attrs || {};
            }
            // 把rowspan的数据存起来，方便后面filter column，把不展示的值过滤出去
            if (newColumn.attrs && newColumn.attrs.rowSpan) {
                this.rowSpanArr[i] = {
                    startIndex: dataIndex,
                    rowSpan: newColumn.attrs && newColumn.attrs.rowSpan
                };
            }
            result.push(newColumn);
        });
        result = result.filter((column, index) => {
            // 过滤rowspan对应的column,rowspan需要跨行过滤
            if (this.rowSpanArr[index]) {
                if (this.rowSpanArr[index].startIndex === dataIndex) {
                    this.rowSpanArr[index].rowSpan = this.rowSpanArr[index].rowSpan - 1;
                    return true;
                }
                else if (this.rowSpanArr[index].startIndex < dataIndex && this.rowSpanArr[index].rowSpan !== 0) {
                    this.rowSpanArr[index].rowSpan = this.rowSpanArr[index].rowSpan - 1;
                    return false;
                }
            }
            // 过滤colspan对应的column,colspan只需要对行前行进行过滤
            if (column.attrs && !!column.attrs.colSpan) {
                colSpan = column.attrs.colSpan;
                colSpanIndex++;
                return true;
            }
            else if (colSpanIndex < colSpan) {
                colSpanIndex++;
                return false;
            }
            return true;
        });
        return result;
    },
    getThClass(column) {
        let classArr = [];
        const filterIcon = column.scopedSlots && column.scopedSlots.filterIcon;
        const sorter = column.sorter;
        const filters = column.filters;

        (filterIcon || sorter || filters) && classArr.push(`${prefixCls}-column-has-actions`);
        (filterIcon || filters) && classArr.push(`${prefixCls}-column-has-filters`);
        sorter && classArr.push(`${prefixCls}-column-has-sorters`);
        return classArr;
    },
    setSelectedKeys(keys, column) {
        const key = column.key || column.dataIndex;
        let selectedKeys = this.data.get('selectedKeys');
        if (keys && keys.length) {
            selectedKeys[key] = keys;
        }
        else {
            delete selectedKeys[key];
        }
        this.data.set('selectedKeys', selectedKeys, {force: true});
    },
    filterColumn(column) {

    },
    confirm() {
        const selectedKeys = this.data.get('selectedKeys');
        const columns = this.data.get('processedColumns');
        let data = this.data.get('originalData');

        columns.forEach((column, index) => {
            const key = column.key || column.dataIndex;

            // 如果有onFilter，对数据进行过滤
            if (column.onFilter && !isEmpty(selectedKeys) && selectedKeys[key]) {
                let filterData = selectedKeys[key];
                filterData.forEach(value => {
                    data = data.filter(item => column.onFilter(value, item));
                });
            }
            this.handleFilterVisibleChange(false, column, index);
        });

        this.data.set('data', data);
        this.data.set('filteredData', data);
        this.handleChange();
    },
    handleChange() {
        this.fire('change', {
            filters: this.data.get('selectedKeys')
        });
    },
    handleFilterVisibleChange(visible, column, index) {
        this.data.set(`processedColumns.${index}.filterVisible`, visible);
    },
    clearFilter(column) {
        this.setSelectedKeys([], column);
        this.confirm();
    },
    flattenData(data = []) {
        if (!data.length) {
            return;
        }
        let result = [];
        let isTree = false;

        function loop(data, level) {
            ++level;
            data.forEach((item, index) => {
                item.level = level;
                !!item.children && (isTree = true);
                item.children && (item.collapsed = true);
                result.push(item);
                loop(item.children || [], level);
            });
        }

        loop(data, -1);
        this.data.set('isTree', isTree);
        return result;
    },
    getExpandStyle(item) {
        return (item.level === 0 || item.expanded) ? '' : 'display: none;';
    },
    handleTreeExpand(expandItem) {
        let data = this.data.get('data');
        let children = expandItem.children.map(item => item.key);
        data = data.map(item => {
            if (expandItem.key === item.key) {
                item.collapsed = !item.collapsed;
            }
            if (children.includes(item.key)) {
                item.expanded = !item.expanded;
            }
            return {
                ...item
            };
        });
        this.data.set('data', data);
    },
    handleExpandRow(expandItem) {
        let data = this.data.get('data');
        data = data.map(item => {
            if (expandItem.key === item.key) {
                item.expandedRow = !item.expandedRow;
            }
            return {
                ...item
            };
        });
        this.data.set('data', data);
    },
    hasSorterIcon(column, name) {
        const sortDirections = column.sortDirections || [];
        if (!sortDirections.length) {
            return true;
        }
        return sortDirections.includes(name);
    },
    handleSorter(column, columnIndex) {
        let sortColumn = this.data.get('sortColumn');
        let sortColumnIndex = this.data.get('sortColumnIndex');
        const sortDirections = column.sortDirections || ['ascend', 'descend'];
        const sortIndex = sortDirections.indexOf(column.sortOrder);

        // 如果当前点击的是之前已经排序的组件
        if (column === sortColumn) {
            column.sortOrder = sortDirections[sortIndex + 1];
            this.data.set(`processedColumns.${columnIndex}`, {...column});
            this.data.set('sortColumn', column);
        }
        else {
            (column.sortOrder = sortDirections[sortIndex + 1]);
            sortColumn && (sortColumn.sortOrder = undefined);
            this.data.set(`processedColumns.${sortColumnIndex}`, {...sortColumn});
            this.data.set(`processedColumns.${columnIndex}`, {...column});
            this.data.set('sortColumn', column);
            this.data.set('sortColumnIndex', columnIndex);
        }
        let data = this.data.get('filteredData').concat();

        if (column.sortOrder) {
            const sortFn = this.getSorterFn(column);
            data = this.recursiveSort(data, sortFn);
        }
        else {
            data = this.data.get('filteredData');
        }
        this.data.set('data', data);
    },
    getSorterFn(column) {
        if (!column || !column.sortOrder || typeof column.sorter !== 'function') {
            return;
        }

        return (a, b) => {
            const result = column.sorter(a, b, column.sortOrder);
            if (result !== 0) {
                return column.sortOrder === 'descend' ? -result : result;
            }
            return 0;
        };
    },
    recursiveSort(data, sorterFn) {
        const childrenColumnName = this.data.get('childrenColumnName') || 'children';
        return data.sort(sorterFn).map(item =>
            item[childrenColumnName]
                ? {
                    ...item,
                    [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn)
                }
                : item,
        );
    },
    getFilterChecked(selectedKeys = [], value) {
        return selectedKeys.indexOf(value.toString()) > -1;
    },
    template: `<div class="{{classes}}">
        <s-spin spinning="{{loading}}" delay="{{loadingDelay}}">
            <template slot="content">
                <div class="${prefixCls}-title" s-if="hasTitle">
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                </div>
                <div class="${prefixCls}-content">
                    <div class="${prefixCls}-scroll" s-if="scroll.x || scroll.y">
                        ${tableInnerTemplate}
                    </div>
                    <template s-else>${tableInnerTemplate}</template>
                </div>
            </template>
        </s-spin>
    </div> `
});

/*const flatArray = (data = [], childrenName = 'children') => {
    const result = [];
    const loop = array => {
        array.forEach(item => {
            if (item[childrenName]) {
                const newItem = {...item};
                delete newItem[childrenName];
                result.push(newItem);
                if (item[childrenName].length > 0) {
                    loop(item[childrenName]);
                }
            }
            else {
                result.push(item);
            }
        });
    };
    loop(data);
    return result;
};

const treeMap = (tree = [], mapper, childrenName = 'children') => {
    return tree.map((node, index) => {
        const extra = {};
        if (node[childrenName]) {
            extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
        }
        return {
            ...mapper(node, index),
            ...extra
        };
    });
};

const flatFilter = (tree, callback) => {
    return tree.reduce((acc, node) => {
        if (callback(node)) {
            acc.push(node);
        }
        if (node.children) {
            const children = flatFilter(node.children, callback);
            acc.push(...children);
        }
        return acc;
    }, []);
};

export default san.defineComponent({
    dataTypes: {
        dataSource: DataTypes.array,
        columns: DataTypes.array,
        prefixCls: DataTypes.string,
        useFixedHeader: DataTypes.bool,
        rowSelection: DataTypes.object,
        className: DataTypes.string,
        size: DataTypes.string,
        loading: DataTypes.bool,
        bordered: DataTypes.bool,
        locale: DataTypes.object,
        dropdownPrefixCls: DataTypes.string,
        sortDirections: DataTypes.array,
        pagination: DataTypes.object
    },
    initData() {
        return {
            dataSource: [],
            prefixCls: prefixCls,
            useFixedHeader: false,
            className: '',
            size: 'default',
            loading: false,
            bordered: false,
            indentSize: 20,
            locale: {},
            rowKey: 'key',
            showHeader: true,
            sortDirections: ['ascend', 'descend'],
            selectionDirty: false,
            selectedRowKeys: [],
            pagination: {
                current: 1,
                pageSize: 10
            },
            notFoundContent: renderEmpty('Table')
        };
    },
    created() {
        this.CheckboxPropsCache = {};
        const columns = this.data.get('columns');
        const defaultSortOrder = this.getDefaultSortOrder(columns);
        const filters = this.getFiltersFromColumns(columns);
        this.data.set('sortOrder', defaultSortOrder.sortOrder);
        this.data.set('sortColumn', defaultSortOrder.sortColumn);
        this.data.set('filters', filters);
        this.data.set('instance', this);
    },
    computed: {
        classes() {
            const size = this.data.get('size');
            const bordered = this.data.get('bordered');
            const data = this.data.get('data');
            const showHeader = this.data.get('showHeader');
            let classArr = [`${prefixCls}-${size}`];
            bordered && classArr.push(`${prefixCls}-bordered`);
            !data.length && classArr.push(`${prefixCls}-empty`);
            !showHeader && classArr.push(`${prefixCls}-without-column-header`);
            return classArr;
        },
        data() {
            const instance = this.data.get('instance');
            const sortOrder = this.data.get('sortOrder');
            const sortColumn = this.data.get('sortColumn.dataIndex');
            const dataSource = this.data.get('dataSource');
            const pagination = this.data.get('pagination');
            return instance && instance.getCurrentPageData() || [];
        },
        expandIconAsCell() {
            return this.data.get('expandedRowRender')
                && this.data.get('expandIconAsCell') !== false;
        },
        expandIconColumnIndex() {
            const columns = this.data.get('renderColumns');
            return columns[0] && columns[0].key === 'selection-column' ? 1 : 0;
        },
        renderColumns() {
            const prefixCls = this.data.get('prefixCls');
            const rowSelection = this.data.get('rowSelection');
            const childrenColumnName = this.data.get('childrenColumnName') || 'children';
            const columns = this.data.get('columns');
            const instance = this.data.get('instance');

            if (rowSelection && instance) {
                const data = instance.getFlatCurrentPageData(childrenColumnName).filter((item, index) => {
                    if (rowSelection.getCheckboxProps) {
                        return !instance.getCheckboxPropsByItem(item, index).disabled;
                    }
                    return true;
                });
                let classArr = [`${prefixCls}-selection-column`];
                rowSelection.selections && classArr.push(`${prefixCls}-selection-column-custom`);
                const selectionColumnClass = classArr.join(' ');

                const selectionColumn = {
                    key: 'selection-column',
                    render() {
                        return san.defineComponent({
                            components: {
                                's-selectionbox': SelectionBox
                            },
                            initData() {
                                return {
                                    type: rowSelection.type,
                                    selectedRowKeys: instance.data.get('selectedRowKeys')
                                };
                            },
                            computed: {
                                rowKey() {
                                    const index = this.data.get('index');
                                    const record = this.data.get('record');
                                    return instance.getRecordKey(record, index);
                                },
                                props() {
                                    const index = this.data.get('index');
                                    const record = this.data.get('record');
                                    return instance.getCheckboxPropsByItem(record, index);
                                },
                                defaultSelection() {
                                    return instance.getDefaultSelection();
                                }
                            },
                            handleChange(e) {
                                const type = this.data.get('type');
                                const index = this.data.get('index');
                                const record = this.data.get('record');
                                type === 'radio'
                                    ? instance.handleRadioSelect(record, index, e)
                                    : instance.handleSelect(record, index, e);
                            },
                            template: `
                                <span>
                                    <s-selectionbox
                                        type="{{type}}"
                                        rowIndex="{{rowKey}}"
                                        on-change="handleChange"
                                        defaultSelection="{{defaultSelection}}"
                                        disabled="{{props.disabled}}"
                                        name="{{props.name}}"
                                        selectionDirty="{{selectionDirty}}"
                                        selectedRowKeys="{{selectedRowKeys}}"
                                        refresh="{{refresh}}"
                                    >
                                    </s-selectionbox>
                                </span>
                            `
                        });
                    },
                    className: selectionColumnClass,
                    fixed: rowSelection.fixed,
                    width: rowSelection.columnWidth || '65px',
                    title: rowSelection.columnTitle
                };
                if (rowSelection.type !== 'radio') {
                    const checkboxAllDisabled = data.every((item, index) => {
                        return instance.getCheckboxPropsByItem(item, index).disabled;
                    });

                    selectionColumn.title = selectionColumn.title || function () {
                        return san.defineComponent({
                            initData() {
                                return {
                                    prefixCls: prefixCls,
                                    data: data,
                                    disabled: checkboxAllDisabled,
                                    selections: rowSelection.selections,
                                    hideDefaultSelections: rowSelection.hideDefaultSelections,
                                    instance: instance,
                                    selectionDirty: false
                                };
                            },
                            handleSelectRow(payload) {
                                instance.handleSelectRow(payload.selectionKey, payload.index, payload.onSelectFunc);
                            },
                            components: {
                                's-selectioncheckboxall': SelectionCheckboxAll
                            },
                            template: `<div>
                                <s-selectioncheckboxall
                                    data="{{data}}"
                                    prefixCls="{{prefixCls}}"
                                    disabled="{{disabled}}"
                                    selections="{{selections}}"
                                    hideDefaultSelections="{{hideDefaultSelections}}"
                                    parent="{{instance}}"
                                    selectionDirty="{{selectionDirty}}"
                                    refresh="{{refresh}}"
                                    on-select="handleSelectRow"
                                >
                                </s-selectioncheckboxall>
                            </div>`
                        });
                    };
                }
                if ('fixed' in rowSelection) {
                    selectionColumn.fixed = rowSelection.fixed;
                }
                else if (columns.some(column => column.fixed === 'left' || column.fixed === true)) {
                    selectionColumn.fixed = 'left';
                }
                if (columns[0] && columns[0].key === 'selection-column') {
                    columns[0] = selectionColumn;
                }
                else {
                    columns.unshift(selectionColumn);
                }
            }

            // 处理sorter和filter的情况
            const sortOrder = this.data.get('sortOrder');
            const filters = this.data.get('filters');
            const locale = this.data.get('locale');
            return treeMap(columns, (column, index) => {
                const key = instance && instance.getColumnKey(column, index);
                let onHeaderCell = column.onHeaderCell;
                const filterDropdown = (column.filters && column.filters.length > 0) || column.filterDropdown;
                const isSortColumn = instance && instance.isSortColumn(column);
                const sortDirections = column.sortDirections || this.data.get('sortDirections');
                let classArr = [column.className];
                (column.sorter || filterDropdown) && classArr.push(`${prefixCls}-column-has-actions`);
                filterDropdown && classArr.push(`${prefixCls}-column-has-filters`);
                column.sorter && classArr.push(`${prefixCls}-column-has-sorters`);
                isSortColumn && sortOrder && classArr.push(`${prefixCls}-column-sort`);
                let resClass = classArr.join(' ');
                return {
                    ...column,
                    className: resClass,
                    title: (column.title && !column.sorter ? column.title : function () {
                        return san.defineComponent({
                            initData() {
                                return {
                                    instance: instance,
                                    sorter: column.sorter,
                                    columnTitle: column.title,
                                    prefixCls: prefixCls,
                                    filters: filters,
                                    sortOrder: sortOrder,
                                    locale: locale,
                                    column: column,
                                    sortDirections: sortDirections,
                                    filterDropdown: filterDropdown,
                                    colFilters: key in filters ? filters[key] : []
                                };
                            },
                            components: {
                                's-icon': Icon,
                                's-filterdropdown': FilterDropdown
                            },
                            computed: {
                                isAscend() {
                                    const instance = this.data.get('instance');
                                    const column = this.data.get('column');
                                    const sortOrder = this.data.get('sortOrder');
                                    const sortColumn = this.data.get('sortColumn');
                                    const isSortColumn = instance.isSortColumn(column);
                                    return isSortColumn && sortOrder === 'ascend';
                                },
                                isDescend() {
                                    const instance = this.data.get('instance');
                                    const column = this.data.get('column');
                                    const sortOrder = this.data.get('sortOrder');
                                    const sortColumn = this.data.get('sortColumn');
                                    const isSortColumn = instance.isSortColumn(column);
                                    return isSortColumn && sortOrder === 'descend';
                                },
                                ascend() {
                                    return sortDirections.indexOf('ascend') !== -1 && this.data.get('sorter');
                                },
                                descend() {
                                    return sortDirections.indexOf('descend') !== -1 && this.data.get('sorter');
                                },
                                title() {
                                    const title = this.data.get('columnTitle');
                                    if (title instanceof Function) {
                                        return title(filters, sortOrder);
                                    }
                                    return title;
                                }
                            },
                            handleConfirm(payload) {
                                // console.log(payload);
                            },
                            template: `<div>
                                <div key="title" class="{{sorter ? prefixCls + '-column-sorters' : ''}}">
                                    {{title}}
                                    <div
                                        title="{{locale.sortTitle}}"
                                        class="{{prefixCls + '-column-sorter'}}"
                                        key="sorter"
                                    >
                                        <s-icon
                                            class="{{prefixCls + '-column-sorter-up'}} {{isAscend ? 'on' : 'off'}}"
                                            type="caret-up"
                                            s-if="ascend"
                                        ></s-icon>
                                        <s-icon
                                            s-if="descend"
                                            class="{{prefixCls + '-column-sorter-down'}} {{isDescend ? 'on' : 'off'}}"
                                            type="caret-down"
                                        ></s-icon>
                                    </div>
                                </div>
                                <s-filterdropdown
                                    s-if="filterDropdown"
                                    locale="{{locale}}"
                                    column="{{column}}"
                                    selectedKeys="{{colFilters}}"
                                    prefixCls="{{prefixCls + '-filter'}}"
                                    dropdownPrefixCls="{{dropdownPrefixCls || 'san-dropdown'}}"
                                    key="filter-dropdown"
                                    on-confirm="handleConfirm"
                                >
                                </s-filterdropdown>
                            </div>
                            `
                        });
                    }),
                    onHeaderCell(col) {
                        let colProps = {};
                        if (column.onHeaderCell) {
                            colProps = {
                                ...column.onHeaderCell(col)
                            };
                        }
                        const onHeaderCellClick = colProps.onClick;
                        colProps.onClick = (...args) => {
                            instance.toggleSortOrder(column);
                            onHeaderCellClick && onHeaderCellClick(...args);
                        };

                        return colProps;
                    }
                };
            });
        },
        hasPagination() {
            return this.data.get('pagination') !== false;
        },
        total() {
            const pagination = this.data.get('pagination');
            const instance = this.data.get('instance');
            const dataSource = this.data.get('dataSource');
            const total = instance && instance.getLocalData().length;
            return pagination.total || total;
        },
        current() {
            const pagination = this.data.get('pagination');
            const total = this.data.get('total');
            if ((pagination.current - 1) * pagination.pageSize >= total) {
                return Math.floor((total - 1) / pagination.pageSize) + 1;
            }
            return pagination.current;
        }
    },
    handleSelect(record, rowIndex, e) {
        const checked = e.target.checked;
        const {
            selectionDirty,
            pivot,
            childrenColumnName,
            expandedRowRender
        } = this.data.get();
        const defaultSelection = selectionDirty ? [] : this.getDefaultSelection();
        let selectedRowKeys = this.data.get('selectedRowKeys').concat(defaultSelection);
        const key = this.getRecordKey(record, rowIndex);
        const rows = this.getFlatCurrentPageData(childrenColumnName);
        let realIndex = rowIndex;
        if (expandedRowRender) {
            realIndex = rows.findIndex(row => this.getRecordKey(row, rowIndex) === key);
        }

        if (e.shiftKey && pivot !== undefined && realIndex !== pivot) {
            // console.log(e.shiftKey); // 多选模式
        }
        else {
            if (checked) {
                selectedRowKeys.push(this.getRecordKey(record, realIndex));
            }
            else {
                selectedRowKeys = selectedRowKeys.filter(i => key !== i);
            }

            this.data.set('pivot', realIndex);
            this.data.set('selectionDirty', true);
            this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record,
                checked,
                changeRowKeys: undefined,
                nativeEvent: e
            });
        }
    },
    handleSelectRow(selectionKey, index, onSelectFunc) {
        const {
            childrenColumnName,
            rowSelection
        } = this.data.get();
        let selectionDirty = this.data.get('selectionDirty');

        const data = this.getFlatCurrentPageData(childrenColumnName);
        const defaultSelection = selectionDirty ? [] : this.getDefaultSelection();
        const selectedRowKeys = this.data.get('selectedRowKeys').concat(defaultSelection);
        const changeableRowKeys = data
            .filter((item, i) => !this.getCheckboxPropsByItem(item, i).disabled)
            .map((item, i) => this.getRecordKey(item, i));

        const changeRowKeys = [];
        let selectWay = 'onSelectAll';
        let checked;
        switch (selectionKey) {
            case 'all':
                changeableRowKeys.forEach(key => {
                    if (selectedRowKeys.indexOf(key) < 0) {
                        selectedRowKeys.push(key);
                        changeRowKeys.push(key);
                    }
                });
                selectWay = 'onSelectAll';
                checked = true;
                break;
            case 'removeAll':
                changeableRowKeys.forEach(key => {
                    if (selectedRowKeys.indexOf(key) >= 0) {
                        selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                        changeRowKeys.push(key);
                    }
                });
                selectWay = 'onSelectAll';
                checked = false;
                break;
            case 'invert':
                changeableRowKeys.forEach(key => {
                    if (selectedRowKeys.indexOf(key) < 0) {
                        selectedRowKeys.push(key);
                    } else {
                        selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                    }
                    changeRowKeys.push(key);
                    selectWay = 'onSelectInvert';
                });
                break;
            default:
                break;
        }
        this.data.set('selectionDirty', true);

        let customSelectionStartIndex = 2;
        if (rowSelection && rowSelection.hideDefaultSelections) {
            customSelectionStartIndex = 0;
        }
        if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
            return onSelectFunc(changeableRowKeys);
        }
        this.setSelectedRowKeys(selectedRowKeys, {
            selectWay,
            checked,
            changeRowKeys
        });
    },
    getColumnKey(column, index) {
        return column.key || column.dataIndex || index;
    },
    getFiltersFromColumns(columns) {
        const filters = {};
        this.getFilteredValueColumns(columns).forEach(col => {
            const colKey = this.getColumnKey(col);
            filters[colKey] = col.filteredValue;
        });
        return filters;
    },
    getFilteredValueColumns(columns) {
        return flatFilter(
            columns || this.columns || [],
            column => typeof column.filteredValue !== 'undefined'
        );
    },
    getDefaultSortOrder(columns) {
        const definedSortState = this.getSortStateFromColumns(columns);

        const defaultSortedColumn = flatFilter(
            columns || [],
            column => column.defaultSortOrder != null,
        )[0];

        if (defaultSortedColumn && !definedSortState.sortColumn) {
            return {
                sortColumn: defaultSortedColumn,
                sortOrder: defaultSortedColumn.defaultSortOrder
            };
        }

        return definedSortState;
    },
    getSortStateFromColumns(columns) {
        const sortedColumn = this.getSortOrderColumns(columns).filter(
            col => col.sortOrder
        )[0];

        if (sortedColumn) {
            return {
                sortColumn: sortedColumn,
                sortOrder: sortedColumn.sortOrder
            };
        }

        return {
            sortColumn: null,
            sortOrder: null
        };
    },
    getSortOrderColumns(columns) {
        const renderColumns = this.data.get('renderColumns');
        return flatFilter(
            columns || renderColumns || [],
            column => 'sortOrder' in column
        );
    },
    isSameColumn(a, b) {
        if (a && b && a.key && a.key === b.key) {
            return true;
        }
        return (
            a === b
            || shallowEqual(a, b, (value, other) => {
                if (typeof value === 'function' && typeof other === 'function') {
                    return value === other || value.toString() === other.toString();
                }
            })
        );
    },
    toggleSortOrder(column) {
        if (!column.sorter) {
            return;
        }
        const sortDirections = column.sortDirections || this.data.get('sortDirections');
        const {
            sortOrder,
            sortColumn
        } = this.data.get();
        let newSortOrder = null;
        if (this.isSameColumn(sortColumn, column) && sortOrder !== undefined) {
            // 按照sortDirections的内容依次切换排序状态
            const methodIndex = sortDirections.indexOf(sortOrder) + 1;
            newSortOrder = methodIndex === sortDirections.length ? undefined : sortDirections[methodIndex];
        }
        else {
            newSortOrder = sortDirections[0];
        }

        const newState = {
            sortOrder: newSortOrder,
            sortColumn: newSortOrder ? column : null
        };

        if (this.getSortOrderColumns().length === 0) {
            this.data.set('sortOrder', newState.sortOrder);
            this.data.set('sortColumn', newState.sortColumn);
        }

        const params = this.prepareParamsArguments();
        this.fire('change', params);
    },
    prepareParamsArguments() {
        const {
            pagination,
            filters,
            sortColumn,
            sortOrder
        } = this.data.get();
        const sorter = {};
        if (sortColumn && sortOrder) {
            sorter.column = sortColumn;
            sorter.order = sortOrder;
            sorter.field = sortColumn.dataIndex;
            sorter.columnKey = this.getColumnKey(sortColumn);
        }

        const extra = {
            currentDataSource: this.getLocalData()
        };

        return {
            pagination,
            filters,
            sorter,
            extra
        };
    },
    isSortColumn(column) {
        const sortColumn = this.data.get('sortColumn');
        if (!column || !sortColumn) {
            return false;
        }
        return this.getColumnKey(sortColumn) === this.getColumnKey(column);
    },
    setSelectedRowKeys(selectedRowKeys, selectionInfo) {
        const {
            selectWay,
            record,
            checked,
            changeRowKeys,
            nativeEvent
        } = selectionInfo;
        const rowSelection = this.data.get('rowSelection');
        this.data.set('selectedRowKeys', selectedRowKeys);
        const data = this.getFlatData();
        if (!rowSelection.onChange && !rowSelection[selectWay]) {
            return;
        }
        const selectedRows = data.filter((row, i) => selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
        if (rowSelection.onChange) {
            rowSelection.onChange(selectedRowKeys, selectedRows);
        }
        if (selectWay === 'onSelect' && rowSelection.onSelect) {
            rowSelection.onSelect(record, checked, selectedRows, nativeEvent);
        }
        else if (selectWay === 'onSelectMultiple' && rowSelection.onSelectMultiple) {
            const changeRows = data.filter((row, i) => changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
            rowSelection.onSelectMultiple(checked, selectedRows, changeRows);
        }
        else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
            const changeRows = data.filter((row, i) => changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
            rowSelection.onSelectAll(checked, selectedRows, changeRows);
        }
        else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
            rowSelection.onSelectInvert(selectedRowKeys);
        }
    },
    getDefaultSelection() {
        const rowSelection = this.data.get('rowSelection');
        if (!rowSelection.getCheckboxProps) {
            return [];
        }
        return this.getFlatData().filter((item, index) => {
            return this.getCheckboxPropsByItem(item, index).defaultChecked;
        }).map((item, index) => {
            return this.getRecordKey(item, index);
        });
    },
    getFlatData() {
        return flatArray(this.getLocalData(null, false));
    },
    getSorterFn() {
        const {
            sortOrder,
            sortColumn
        } = this.data.get();
        if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
            return;
        }

        return (a, b) => {
            const result = sortColumn.sorter(a, b, sortOrder);
            if (result !== 0) {
                return sortOrder === 'descend' ? -result : result;
            }
            return 0;
        };
    },
    recursiveSort(data, sorterFn) {
        const childrenColumnName = this.data.get('childrenColumnName') || 'children';
        return data.sort(sorterFn).map(item =>
            item[childrenColumnName]
                ? {
                    ...item,
                    [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn)
                }
                : item,
        );
    },
    getLocalData(filter) {
        const dataSource = this.data.get('dataSource');
        const filters = this.data.get('filters');
        let data = dataSource || [];
        // 优化本地排序
        data = data.slice(0);
        const sorterFn = this.getSorterFn();
        if (sorterFn) {
            data = this.recursiveSort(data, sorterFn);
        }
        // 筛选
        if (filter && filters) {
            Object.keys(filters).forEach(columnKey => {
                const col = this.findColumn(columnKey);
                if (!col) {
                    return;
                }
                const values = filters[columnKey] || [];
                if (values.length === 0) {
                    return;
                }
                const onFilter = col.onFilter;
                data = onFilter
                    ? data.filter(record => {
                        return values.some(v => onFilter(v, record));
                    })
                    : data;
            });
        }
        return data;
    },
    getCheckboxPropsByItem(item, index) {
        const rowSelection = this.data.get('rowSelection');
        if (!rowSelection.getCheckboxProps) {
            return {};
        }
        const key = this.getRecordKey(item, index);
        if (!this.CheckboxPropsCache[key]) {
            const checkboxProps = (this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item));
        }
        return this.CheckboxPropsCache[key];
    },
    getRecordKey(record, index) {
        const rowKey = this.data.get('rowKey');
        const recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
        return recordKey === undefined ? index : recordKey;
    },
    getCurrentPageData() {
        let data = this.getLocalData();
        let current;
        let pageSize;
        // 如果没有分页的话，默认全部展示
        if (!this.data.get('hasPagination')) {
            pageSize = Number.MAX_VALUE;
            current = 1;
        }
        else {
            pageSize = this.data.get('pagination').pageSize;
            current = this.data.get('pagination.current');
        }

        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            data = data.filter((item, i) => {
                return i >= (current - 1) * pageSize && i < current * pageSize;
            });
        }
        return data;
    },
    getFlatCurrentPageData(childrenColumnName) {
        return flatArray(this.getCurrentPageData(), childrenColumnName);
    },
    attached() {
        this.watch('rowSelection', val => {
            if (val && val.selectedRowKeys) {
                this.data.set('selectedRowKeys', val.selectedRowKeys);
            }
        });
    },
    handlePageChange(payload) {
        const pagination = {
            ...this.data.get('pagination')
        };

        const current = payload.page;
        if (current) {
            pagination.current = current;
        }
        else {
            pagination.current = pagination.current || 1;
        }

        pagination.onChange && pagination.onChange(pagination.current);

        this.data.set('pagination', pagination);

        const params = this.prepareParamsArguments();
        this.fire('change', params);
    },
    messages: {
        onExpand(payload) {
            this.fire('expand', payload);
        }
    },
    components: {
        's-table': Table,
        's-spin': Spin,
        's-pagination': Pagination
    },
    template: `
        <div>
            <s-spin spinning="{{loading}}">
                <div slot="content">
                <s-pagination
                    s-if="hasPagination && total > 0 && position === 'top' || position === 'both'"
                    key="pagination-top"
                    class="san-pagination {{prefixCls}}-pagination"
                    size="small"
                    total="{{total}}"
                    current="{{current}}"
                    on-change="handlePageChange"
                ></s-pagination>
                <s-table
                    key="table"
                    data="{{data}}"
                    class="{{classes}}"
                    title="{{title || function () {}}}"
                    footer="{{footer || function () {}}}"
                    columns="{{renderColumns}}"
                    expandIconColumnIndex="{{expandIconColumnIndex}}"
                    expandIconAsCell="{{expandIconAsCell}}"
                    expandedRowRender= "{{expandedRowRender}}"
                    selectedRowKeys="{{selectedRowKeys}}"
                    selectionDirty="{{selectionDirty}}"
                    sortOrder="{{sortOrder}}"
                    sortColumn="{{sortColumn}}"
                    scroll="{{scroll}}"
                    showHeader="{{showHeader}}"
                    defaultExpandAllRows="{{defaultExpandAllRows}}"
                    defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                    expandedRowKeys="{{expandedRowKeys}}"
                    notFoundContent="{{notFoundContent}}"
                ></s-table>
                <s-pagination
                    s-if="hasPagination"
                    key="pagination-bottom"
                    class="san-pagination {{prefixCls}}-pagination"
                    total="{{total}}"
                    current="{{current}}"
                    on-change="handlePageChange"
                ></s-pagination>
                </div>
            </s-spin>
        </div>
    `
});*/
