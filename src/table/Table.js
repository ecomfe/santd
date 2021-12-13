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
import Tbody from './Tbody';
import Thead from './Thead';
import Tooltip from '../tooltip';
import './style/index';

const prefixCls = classCreator('table')();

function getLeafCount(column) {
    if (!column.children || !column.children.length) {
        return 1;
    }
    let leafCount = 0;
    column.children.forEach(item => {
        leafCount += getLeafCount(item);
    });
    return leafCount;
}

// 深度遍历数据，并返回所有经过处理的数据
function dfsData(data, callback, result = [], level = -1, parentNode = []) {
    level++;
    data.forEach(item => {
        item = typeof callback === 'function'
            ? callback({...item}, level, parentNode)
            : {...item};
        item && result.push(item);
        // 获取父节点，回传给callback
        let parent = Array.from(parentNode);
        if (item.children && item.children.length) {
            parent.unshift(item);
        }
        dfsData(item && item.children || [], callback, result, level, parent);
    });
    return result;
}

// 广度优先遍历，返回一个具有层级关系的二维数组
function bfsData(data, callback, result = [], level = 0) {
    if (!result[level]) {
        result[level] = [];
    }
    let stack = [];
    data.forEach(item => {
        item = typeof callback === 'function'
            ? callback({...item}, level)
            : {...item};
        item && result[level].push(item);
        if (item && item.children) {
            stack = stack.concat(item.children);
        }
    });
    if (stack.length) {
        level++;
        level = bfsData(stack, callback, result, level).level;
    }
    return {
        data: result,
        level
    };
}

const colgroupTemplate = `
    <colgroup>
        <col s-if="rowSelection" style="width: 62px; min-width: 62px;" />
        <col s-for="column in tdColumns" style="{{column.width ? 'width: ' + column.width + ';' : ''}}"/>
    </colgroup>
`;

const tableInnerTemplate = `
    <div s-if="scroll.y" class="${prefixCls}-header ${prefixCls}-hide-scrollbar" s-ref="tableHead" on-scroll="handleTableScroll">
        <table class="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="width: {{scroll.x || '100%'}}">
            ${colgroupTemplate}
            ${Thead.template}
        </table>
    </div>
    <div
        class="${prefixCls}-body"
        style="{{getBodyStyle(scroll)}}"
        on-scroll="handleTableScroll"
        s-ref="tableBody"
    >
        <table classs="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="width: {{scroll.x}}">
            ${colgroupTemplate}
            <template s-if="!scroll.y">
                ${Thead.template}
            </template>
            ${Tbody.template}
        </table>
        <div class="${prefixCls}-placeholder" s-if="!renderData.length && !loading">
            <s-empty  description="{{locale.emptyText}}"/>
        </div>
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
        pagination: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        locale: DataTypes.object,
        rowClassName: DataTypes.func,
        rowExpandable: DataTypes.func
    },
    initData() {
        return {
            loading: false,
            scroll: {},
            size: 'default',
            data: [],
            pagination: {
                current: 1,
                pageSize: 10,
                position: ['bottomRight']
            },
            selectedKeys: {},
            indentSize: 20,
            expandedKeys: [],
            selectedRows: [],
            selectedRowKeys: [],
            scrollPosition: 'left',
            defaultExpandAllRows: false,
            defaultExpandedRowKeys: [],
            expandRowByClick: false,
            locale: {
                emptyText: '暂无数据',
                filterConfirm: '确定',
                filterReset: '重置'
            },
            ellipsis: false
        };
    },
    computed: {
        classes() {
            const scroll = this.data.get('scroll');
            const size = this.data.get('size');
            const bordered = this.data.get('bordered');
            const scrollPosition = this.data.get('scrollPosition');
            let classArr = [prefixCls];

            (scroll.x || scroll.y) && classArr.push(`${prefixCls}-fixed-header`);
            bordered && classArr.push(`${prefixCls}-bordered`);
            size && classArr.push(`${prefixCls}-${size}`);
            scrollPosition && classArr.push(`${prefixCls}-scroll-position-${scrollPosition}`);

            return classArr;
        },
        paginationTop() {
            const pagination = this.data.get('pagination');
            if (pagination.position !== null && Array.isArray(pagination.position)) {
                let topPagination = pagination.position.find(p => p.indexOf('top') !== -1);
                return topPagination && topPagination.toLowerCase().replace('top', '');
            }
            return '';
        },
        paginationBottom() {
            const pagination = this.data.get('pagination');
            if (pagination !== false) {
                if (pagination.position !== null && Array.isArray(pagination.position)) {
                    let bottomPagination = pagination.position.find(p => p.indexOf('bottom') !== -1);
                    return bottomPagination && bottomPagination.toLowerCase().replace('bottom', '');
                }
                return 'right';
            }
            return '';
        }
    },
    inited() {
        this.rowSpanArr = {};
        let data = this.data.get('data') ? this.data.get('data').concat() : [];

        this.data.set('expandedRowKeys', this.data.get('expandedRowKeys') || this.data.get('defaultExpandedRowKeys'));
        this.data.set('originalData', data);
        this.initRenderData(data);
        this.processColumns();
        this.data.set('hasTitle', !!this.sourceSlots.named.title || this.data.get('title'));
        this.data.set('hasFooter', !!this.sourceSlots.named.footer || this.data.get('footer'));
        this.data.set('hasExpandedRowRender', !!this.sourceSlots.named.expandedRowRender);
        this.data.set('hasExpandIcon', !!this.sourceSlots.named.expandIcon);

        this.watch('columns', val => {
            this.processColumns(val);
            this.confirm();
            const sortColumn = this.data.get('sortColumn');
            sortColumn && this.runSorter(sortColumn);
        });

        this.watch('rowSelection', val => {
            let activeData = this.getActiveRows(this.data.get('renderData'));
            let selectedRowKeys = val.selectedRowKeys || [];
            this.data.set('selectedRowKeys', selectedRowKeys);
            this.data.set('selectedRows', activeData.filter(item => selectedRowKeys.includes(item.key)));
            this.initRenderData();
        });

        this.watch('data', val => {
            this.data.set('originalData', val);
            this.initRenderData(val);
        });

        this.watch('expandedRowKeys', val => {
            this.initRenderData();
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
        's-checkbox': Checkbox,
        's-pagination': Pagination,
        's-tooltip': Tooltip,
        's-empty': renderEmpty('Table')
    },
    // 针对columns中的各种配置项做处理
    processColumns() {
        let columns = this.data.get('columns');
        let sortColumn;
        let sortColumnIndex;
        const selectedKeys = this.data.get('selectedKeys');

        let thColumns = bfsData(columns, column => {
            let leafCount = getLeafCount(column);
            leafCount !== 1 && (column.colspan = leafCount);
            column.filterVisible = false;
            return column;
        });

        // 设置th的rowspan
        let level = thColumns.level;
        let thColumnsData = thColumns.data.map(thColumn => {
            thColumn.map((column, index) => {
                if (!column.children) {
                    column.rowspan = level + 1;
                }
                const key = column.key || column.dataIndex;
                // 获取默认的sortColumn
                if ((!sortColumn && (column.defaultSortOrder || column.sorter === true)) || column.sortOrder) {
                    column.sortOrder = column.sortOrder || column.defaultSortOrder;
                    sortColumn = column;
                    sortColumnIndex = index;
                }
                if (column.ellipsis) {
                    this.data.set('ellipsis', true);
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
                return column;
            });
            level--;
            return thColumn;
        });

        // 深度遍历columns，把children打平供显示数据使用
        let tdColumns = dfsData(columns, item => item).filter(item => !item.children);

        if (sortColumn) {
            this.data.set('sortColumn', sortColumn);
            this.data.set('sortColumnIndex', sortColumnIndex);
            this.runSorter(sortColumn, sortColumnIndex);
        }

        this.data.set('thColumns', thColumnsData);
        this.data.set('tdColumns', tdColumns);
    },
    initRenderData(value) {
        const pagination = this.data.get('pagination');
        let data = value || this.data.get('filteredData');
        if (pagination !== false) {
            data = this.getPaginationData(data);
        }
        data = this.getFlattenData(data);
        if (value) {
            this.data.set('filteredData', data);
        }
        this.data.set('renderData', data);
        this.data.set('isTree', data.some(item => item.children));
    },
    // 获取当前分页的数据
    getPaginationData(data) {
        const pageSize = this.data.get('pagination.pageSize');
        const current = this.data.get('pagination.current');

        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            data = data.filter((item, i) => i >= (current - 1) * pageSize && i < current * pageSize);
        }

        return data;
    },
    rowExpandable(item) {
        const rowExpandable = this.data.get('rowExpandable');
        if (rowExpandable) {
            return rowExpandable(item);
        }
        // 用户没有传入 rowExpandable 函数的情况下，默认显示展开子表格的按钮
        return true;
    },
    // 获取当前column的rolspan和rowspan
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
    // 获取th和td的样式
    getThClass(column) {
        let classArr = [];
        const filterIcon = column.scopedSlots && column.scopedSlots.filterIcon;
        const {
            sorter,
            filters,
            left,
            right
        } = column;

        (filterIcon || sorter || filters) && classArr.push(`${prefixCls}-column-has-actions`);
        (filterIcon || filters) && classArr.push(`${prefixCls}-column-has-filters`);
        sorter && classArr.push(`${prefixCls}-column-has-sorters`);
        left && classArr.push(`${prefixCls}-left-sticky`);
        right && classArr.push(`${prefixCls}-right-sticky`);
        column.className && classArr.push(column.className);
        return classArr;
    },
    getThStyle(column) {
        const {left, right} = column;
        const width = column.width || '100%';

        if (left) {
            return `left: ${left}; min-width: ${width}`;
        }
        else if (right) {
            return `right: ${right}; min-width: ${width}`;
        }
    },
    getBodyStyle(scroll) {
        if (!scroll) {
            return '';
        }

        let style = '';
        if (scroll.y) {
            style += `max-height: ${scroll.y}; overflow-y: scroll;`;
        }
        if (scroll.x) {
            style += 'overflow-x: auto;';
        }
        return style;
    },
    // 设置filter中输入的值
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
    // 执行onFilter方法，渲染过滤后的数据
    confirm() {
        const selectedKeys = this.data.get('selectedKeys');
        const thColumns = this.data.get('thColumns');
        let data = this.data.get('originalData');
        let filteredData = [];

        thColumns.forEach((thColumn, thIndex) => {
            thColumn.forEach((column, index) => {
                // 如果有onFilter，对数据进行过滤
                const key = column.key || column.dataIndex;
                if (column.onFilter && !isEmpty(selectedKeys) && selectedKeys[key]) {
                    let filterValue = selectedKeys[key];
                    if (!filteredData.length) {
                        filterValue.forEach(value => {
                            filteredData = filteredData.concat(data.filter(item => column.onFilter(value, item)));
                        });
                    }
                    else {
                        let tmpFilteredData = [];
                        filterValue.forEach(value => {
                            tmpFilteredData = [...tmpFilteredData, ...filteredData.filter(item => column.onFilter(value, item))];
                        });
                        filteredData = tmpFilteredData;
                    }
                }
                this.handleFilterVisibleChange(false, column, index, thIndex);
            });
        });

        data = isEmpty(selectedKeys) ? data : filteredData;

        this.data.set('filteredData', data);
        this.initRenderData();
        this.handleChange();
    },
    handleRowClick(record) {
        let onRowClick = this.data.get('onRowClick');
        if (onRowClick && typeof onRowClick === 'function') {
            onRowClick && onRowClick(record);
        }
        if (!this.data.get('expandRowByClick')) {
            return;
        }
        this.data.get('hasExpandedRowRender') && this.handleExpandRow(record);
        'collapsed' in record && this.handleTreeExpand(record);
    },
    // 执行复选框选中时候的操作
    handleSelections({key, selectedKeys}) {
        let rowSelection = this.data.get('rowSelection');
        let selections = rowSelection.selections || [];
        let selection = selections.filter(selection => selection.key === key)[0];

        if (selection && selection.handleSelect) {
            let activeRows = this.getActiveRows(this.data.get('renderData'));
            selection.handleSelect(activeRows.map(item => item.key));
        }
        this.handleRowSelectionVisible(false);
    },
    // sticky的时候滚动数据时body和head的联动
    handleTableScroll(e) {
        if (e.currentTarget === e.target) {
            let tableBody = this.ref('tableBody');
            let tableHead = this.ref('tableHead');
            let target = e.target;
            let scrollPosition;

            if (target === tableBody && tableHead) {
                tableHead.scrollLeft = target.scrollLeft;
            }
            else if (target === tableHead && tableBody) {
                tableBody.scrollLeft = target.scrollLeft;
            }

            if (tableBody.scrollWith === tableBody.clientWidth && tableBody.scrollWidth !== 0) {
                scrollPosition = '';
            }
            else if (tableBody.scrollLeft === 0) {
                scrollPosition = 'left';
            }
            else if (tableBody.scrollWidth === target.scrollLeft + tableBody.clientWidth) {
                scrollPosition = 'right';
            }
            else {
                scrollPosition = 'middle';
            }

            this.data.set('scrollPosition', scrollPosition);
        }
    },
    // on-change的回调方法
    handleChange() {
        let sortColumn = this.data.get('sortColumn');
        let sorter = sortColumn && {
            column: sortColumn,
            columnKey: sortColumn.key,
            field: sortColumn.key || sortColumn.dataIndex,
            order: sortColumn.sortOrder
        };
        this.fire('change', {
            pagination: this.data.get('pagination'),
            filters: this.data.get('selectedKeys'),
            sorter
        });
    },
    handleRowSelectionVisible(visible) {
        this.data.set('rowSelection.visible', visible, {force: true});
    },
    handleFilterVisibleChange(visible, column, index, thIndex) {
        this.data.set(`thColumns.${thIndex}.${index}.filterVisible`, visible);
    },
    // 清除所有的filter
    clearFilter(column) {
        this.setSelectedKeys([], column);
        this.confirm();
    },
    // 打平数据，用于data有children时候的展示
    getFlattenData(data) {
        if (!data) {
            return [];
        }
        const expandedRowKeys = this.data.get('expandedRowKeys');
        const defaultExpandAllRows = this.data.get('defaultExpandAllRows');
        let result = dfsData(data, (item, level, parentNode) => {
            item.level = level;
            item.children && (item.collapsed = true);
            if (defaultExpandAllRows || expandedRowKeys.includes(item.key)) {
                item.expanded = true;
                item.children && (item.collapsed = false);
            }
            if (parentNode.length) {
                item.parent = parentNode;
            }
            return item;
        });

        return result;
    },
    // 展开有children的数据
    handleTreeExpand(expandItem) {
        let data = this.data.get('renderData');
        let children = expandItem.children.map(item => item.key);
        let onExpandedRowsChange = this.data.get('onExpandedRowsChange');
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
        this.data.set('renderData', data);
        if (onExpandedRowsChange) {
            onExpandedRowsChange(expandItem);
        }
    },
    // 展开当前行
    handleExpandRow(expandItem) {
        let data = this.data.get('renderData');
        let onExpandedRowsChange = this.data.get('onExpandedRowsChange');
        data = data.map(item => {
            if (expandItem.key === item.key) {
                item.expanded = !item.expanded;
            }
            return {
                ...item
            };
        });
        this.data.set('renderData', data);
        if (onExpandedRowsChange) {
            onExpandedRowsChange(expandItem);
        }
    },
    hasSorterIcon(column, name) {
        const sortDirections = column.sortDirections || [];
        if (!sortDirections.length) {
            return true;
        }
        return sortDirections.includes(name);
    },
    runSorter(column, sortColumn) {
        let filteredData = this.data.get('filteredData');

        let data = column.sortOrder
            ? this.recursiveSort(filteredData, this.getSorterFn(column))
            : filteredData;

        this.data.set('renderData', data);
    },
    // 点击排序时候的处理
    handleSorter(column, columnIndex, thIndex) {
        let sortColumn = this.data.get('sortColumn');
        let sortColumnIndex = this.data.get('sortColumnIndex');
        const sortDirections = column.sortDirections || ['ascend', 'descend'];
        const sortIndex = sortDirections.indexOf(column.sortOrder);

        // 如果当前点击的是之前已经排序的组件
        if (column === sortColumn) {
            column.sortOrder = sortDirections[sortIndex + 1];
            this.data.set('sortColumn', column);
            this.data.set(`thColumns.${thIndex}.${columnIndex}`, column, {force: true});
        }
        else {
            column.sortOrder = sortDirections[sortIndex + 1];
            sortColumn && (sortColumn.sortOrder = undefined);
            this.data.set(`thColumns.${thIndex}.${sortColumnIndex}`, sortColumn, {force: true});
            this.data.set(`thColumns.${thIndex}.${columnIndex}`, column, {force: true});
            this.data.set('sortColumn', column);
            this.data.set('sortColumnIndex', columnIndex);
        }

        this.runSorter(column);
        this.handleChange();
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
    getCheckboxProps(item, name) {
        let rowSelection = this.data.get('rowSelection');
        if (rowSelection && typeof rowSelection.getCheckboxProps === 'function') {
            return rowSelection.getCheckboxProps(item)[name];
        }
    },
    getActiveRows(data) {
        // 过滤出不是disabled状态的row
        return data.filter(item => !this.getCheckboxProps(item, 'disabled'));
    },
    getAllChecked(data, selectedRowKeys) {
        let activeRows = this.getActiveRows(data);
        if (!activeRows.length) {
            return false;
        }
        return activeRows.every(item => selectedRowKeys.includes(item.key));
    },
    getAllDisabled(data, selectedRowKeys) {
        let activeRows = this.getActiveRows(data);
        return !activeRows.length;
    },
    handleSelectionChange(selectedRowKeys, selectedRows) {
        let rowSelection = this.data.get('rowSelection');
        rowSelection.handleChange && rowSelection.handleChange(
            selectedRowKeys,
            selectedRows
        );
    },
    getItemChecked(item, selectedRowKeys) {
        return selectedRowKeys.includes(item.key);
    },
    getIndeterminate(selectedRowKeys, data) {
        return !this.getAllChecked(data, selectedRowKeys)
            && data.some(item => selectedRowKeys.includes(item.key));
    },
    // selection全选时候的操作
    handleSelectionAll(e) {
        const checked = e.target.checked;
        let handleSelectAll = this.data.get('rowSelection.handleSelectAll');
        let activeRows = this.getActiveRows(this.data.get('renderData'));
        let selectedRows = checked ? activeRows : [];
        let selectedRowKeys = selectedRows.map(item => item.key);

        this.data.set('selectedRowKeys', selectedRowKeys, {force: true});
        this.data.set('selectedRows', selectedRows);
        if (typeof handleSelectAll === 'function') {
            handleSelectAll(selectedRows, checked);
        }
        this.handleSelectionChange(selectedRowKeys, selectedRows);
    },
    // 获取关联父/子节点
    getCheckedList(checkedNode, type) {
        let renderData = this.data.get('renderData');
        let result = [];
        for (let i = 0; i < renderData.length; i++) {
            if (renderData[i].key === checkedNode.key && renderData[i][type]) {
                let filterNode = type === 'parent'
                    ? renderData[i].parent : dfsData(renderData[i].children);
                filterNode.forEach(item => {
                    result.push(item);
                });
            }
        }
        return result;
    },

    // 复选框单选时候的操作
    handleSelection(e, item) {
        const checked = e.target.checked;
        let selectedRows = this.data.get('selectedRows');
        let type = this.data.get('rowSelection.type');
        let checkStrictly = !this.data.get('rowSelection.checkStrictly');
        let selectedRowKeys = this.data.get('selectedRowKeys');
        let handleSelect = this.data.get('rowSelection.handleSelect');
        let getCheckedParentList = checkStrictly ? [] : this.getCheckedList(item, 'parent');
        let getCheckedChildList = checkStrictly ? [] : this.getCheckedList(item, 'children');
        if (e.target.checked) {
            if (type === 'radio') {
                selectedRowKeys = [item.key];
                selectedRows = [item];
            } else {
                // 父节点&&当前节点&&子节点
                [...getCheckedParentList, item, ...getCheckedChildList].forEach(checkedNode => {
                    let index  = selectedRowKeys.indexOf(checkedNode.key);
                    if (index === -1) {
                        selectedRowKeys.push(checkedNode.key);
                        selectedRows.push(checkedNode);
                    }
                });
            }
        } else {
            // 子节点&&当前节点
            [...getCheckedChildList, item].forEach(checkedNode => {
                let index  = selectedRowKeys.indexOf(checkedNode.key);
                if (index > -1) {
                    selectedRowKeys.splice(index, 1);
                    selectedRows.splice(index, 1);
                }
            });
            // 父节点判断是否还有子节点
            getCheckedParentList.forEach(checkedNode => {
                let isDelete = true;
                if (checkedNode.children) {
                    for (let i = 0; i < checkedNode.children.length; i++) {
                        if (selectedRowKeys.indexOf(checkedNode.children[i].key) > -1) {
                            isDelete = false;
                            break;
                        }
                    }
                }
                let index  = selectedRowKeys.indexOf(checkedNode.key);
                if (index > -1 && isDelete) {
                    selectedRowKeys.splice(index, 1);
                    selectedRows.splice(index, 1);
                }
            });
        }
        if (typeof handleSelect === 'function') {
            handleSelect(item, checked, selectedRows, e);
        }

        this.handleSelectionChange(selectedRowKeys, selectedRows);

        this.data.set('selectedRowKeys', selectedRowKeys, {force: true});
        this.data.set('selectedRows', selectedRows);
    },
    // 点击分页时候的操作
    handlePaginationChange(payload) {
        this.data.set('pagination.current', payload.page);
        this.initRenderData();
        this.handleChange();
    },
    getRowClassName(record, index) {
        const rowClassName = this.data.get('rowClassName');
        return rowClassName && rowClassName(record, index) || '';
    },

    template: `<div>
        <s-spin spinning="{{loading}}" delay="{{loadingDelay}}">
            <template slot="content">
                <s-pagination
                    s-if="{{paginationTop}}"
                    class="${prefixCls}-pagination ${prefixCls}-{{paginationTop}}-pagination"
                    current="{{pagination.current}}"
                    pageSize="{{pagination.pageSize}}"
                    total="{{pagination.total || filteredData.length}}"
                    on-change="handlePaginationChange"
                />
                <div class="{{classes}}">
                <div class="${prefixCls}-title" s-if="hasTitle">
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                </div>
                <div class="${prefixCls}-content  {{ellipsis ? '${prefixCls}-layout-fixed' : ''}}">
                    <div class="${prefixCls}-scroll" s-if="scroll.x || scroll.y">
                        ${tableInnerTemplate}
                    </div>
                    <template s-else>${tableInnerTemplate}</template>
                </div>
                </div>
                <s-pagination
                    s-if="{{paginationBottom}}"
                    class="${prefixCls}-pagination ${prefixCls}-{{paginationBottom}}-pagination"
                    current="{{pagination.current}}"
                    pageSize="{{pagination.pageSize}}"
                    total="{{pagination.total || filteredData.length}}"
                    on-change="handlePaginationChange"
                />
            </template>
        </s-spin>
    </div> `
});
