/**
 * @file santd Table 表格组件
 * @author mayihui@baidu.com
 **/

import './style/index';
import Base from 'santd/base';
import debounce from 'lodash/debounce';
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
import * as I from './interface';

const prefixCls = classCreator('table')();

function getLeafCount(column: {children?: []}): number {
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
function dfsData<T extends []>(
    data: T,
    callback?: ({...args}, arg1: number, arg2: object[]) => {},
    result: object[] = [],
    level: number = -1,
    parentNode: object[] = []
): object[] {
    level++;
    data.forEach((item: {children?: []}) => {
        item = typeof callback === 'function'
            ? callback({...item}, level, parentNode)
            : {...item};
        item && result.push(item);
        // 获取父节点，回传给callback
        let parent: {}[] = Array.from(parentNode);
        if (item.children && item.children.length) {
            parent.unshift(item);
        }
        dfsData(item && item.children || [], callback, result, level, parent);
    });
    return result;
}

// 广度优先遍历，返回一个具有层级关系的二维数组
function bfsData<P extends {}>(
    data: P[],
    callback: ({...args}, arg1: number) => {},
    result: Array<P>[] = [],
    level: number = 0
): {data: Array<P>[]; level: number} {
    if (!result[level]) {
        result[level] = [];
    }
    let stack: P[] = [];
    data.forEach((item: any) => {
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

const colgroupTemplate = /* html */ `
    <colgroup>
        <col s-if="rowSelection" style="width: 62px; min-width: 62px;" />
        <col s-for="column in tdColumns" style="{{column.width ? 'width: ' + column.width + ';' : ''}}"/>
    </colgroup>
`;

const stickyHeaderTemplate = /* html */ `
    <div
        s-if="scroll.y"
        s-ref="tableHead"
        class="${prefixCls}-header ${prefixCls}-hide-scrollbar"
        style="margin-right: 16px;"
    >
        <table class="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="min-width: {{scroll.x || '100%'}};">
            ${colgroupTemplate}
            ${Thead.template}
        </table>
    </div>
    <div
        s-else
        s-ref="tableHead"
        class="${prefixCls}-header ${prefixCls}-hide-scrollbar"
    >
        <table class="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="min-width: {{scroll.x  || '100%'}};">
            <template s-if="!scroll.y">
                ${colgroupTemplate}
                ${Thead.template}
            </template>
        </table>
    </div>
`;

const tableInnerTemplate = /* html */ `
    <div s-if="scroll.y && !sticky" class="${prefixCls}-header ${prefixCls}-hide-scrollbar" s-ref="tableHead" on-scroll="handleTableScroll">
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
        <table class="{{scroll.x ? '${prefixCls}-fixed' : ''}}" style="width: {{scroll.x || '100%'}}">
            ${colgroupTemplate}
            <template s-if="!scroll.y && !sticky">
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

export default class Table extends Base<I.State, I.Props, I.Computed> {
    initData(): I.State {
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
            selectedKeys: [],
            indentSize: 20,
            expandedKeys: [],
            selectedRows: [],
            selectedRowKeys: [],
            scrollPosition: '',
            defaultExpandAllRows: false,
            defaultExpandedRowKeys: [],
            expandRowByClick: false,
            locale: {
                emptyText: '暂无数据',
                filterConfirm: '确定',
                filterReset: '重置'
            },
            ellipsis: false,
            sticky: false
        };
    };

    static computed: I.Computed = {
        classes(this: Table) {
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
        paginationTop(this: Table) {
            const pagination = this.data.get('pagination');
            if (pagination && pagination.position !== null && Array.isArray(pagination.position)) {
                let topPagination = pagination.position.find((p: string) => p.indexOf('top') !== -1);
                return topPagination && topPagination.toLowerCase().replace('top', '');
            }
            return '';
        },
        paginationBottom(this: Table) {
            const pagination = this.data.get('pagination');
            if (pagination) {
                if (pagination.position !== null && Array.isArray(pagination.position)) {
                    let bottomPagination = pagination.position.find((p: string) => p.indexOf('bottom') !== -1);
                    return bottomPagination && bottomPagination.toLowerCase().replace('bottom', '');
                }
                return 'right';
            }
            return '';
        }
    };

    rowSpanArr: {
        startIndex: number;
        rowSpan: number;
    }[] = [];
    debouncedResize!: () => void;
    resizeObserver!: ResizeObserver;
    scrollLeft!: number;
    clientWidth!: number;
    scrollWidth!: number;

    inited(): void {
        this.rowSpanArr = [];
        let data = this.data.get('data') ? this.data.get('data').concat() : [];

        this.data.set('expandedRowKeys', this.data.get('expandedRowKeys') || this.data.get('defaultExpandedRowKeys'));
        this.data.set('originalData', data);
        this.initRenderData(data);
        this.processColumns();
        this.data.set('hasTitle', !!this.sourceSlots.named.title || this.data.get('title'));
        this.data.set('hasFooter', !!this.sourceSlots.named.footer || this.data.get('footer'));
        this.data.set('hasExpandedRowRender', !!this.sourceSlots.named.expandedRowRender);
        this.data.set('hasExpandIcon', !!this.sourceSlots.named.expandIcon);

        this.debouncedResize = debounce(() => {
            const tableBody = this.ref('tableBody') as InstanceType<typeof Table>;
            tableBody && this.handleTableScroll({target: tableBody, currentTarget: tableBody});
        }, 200);
        this.resizeObserver = new ResizeObserver(this.debouncedResize);

        this.nextTick(() => {
            const tableBody = this.ref('tableBody');
            // @ts-ignore
            this.resizeObserver.observe(tableBody);
        });

        this.watch('columns', () => {
            this.processColumns();
            this.confirm();
            const sortColumn = this.data.get('sortColumn');
            sortColumn && this.runSorter(sortColumn);
        });

        this.watch('rowSelection', val => {
            let activeData = this.getActiveRows(this.data.get('renderData'));
            let selectedRowKeys = val.selectedRowKeys || [];
            this.data.set('selectedRowKeys', selectedRowKeys);
            this.data.set('selectedRows', activeData.filter(
                // @ts-ignore
                (item: object) => selectedRowKeys.includes(item.key))
            );
            this.initRenderData();
        });

        this.watch('data', val => {
            this.data.set('originalData', val);
            this.initRenderData(val);
        });

        this.watch('expandedRowKeys', () => {
            this.initRenderData();
        });
    };

    static components = {
        's-spin': Spin,
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        // @ts-ignore
        's-menu-item': Menu.Item,
        's-radio': Radio,
        's-button': Button,
        's-checkbox': Checkbox,
        's-pagination': Pagination,
        's-tooltip': Tooltip,
        's-empty': renderEmpty('Table')
    };

    // 针对columns中的各种配置项做处理
    processColumns() {
        let columns = this.data.get('columns');
        let sortColumn: {};
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
            thColumn.map((column: {[key: string]: JSONValue}, index: number) => {
                if (!column.children) {
                    column.rowspan = level + 1;
                }
                const key: any = column.key || column.dataIndex;
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
                    // @ts-ignore
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
        let tdColumns = dfsData(columns, (item) => item).filter((item: {children?: object}) => !item.children);

        // @ts-ignore
        if (sortColumn) {
            this.data.set('sortColumn', sortColumn);
            this.data.set('sortColumnIndex', sortColumnIndex);
            this.runSorter(sortColumn);
        }

        this.data.set('thColumns', thColumnsData);
        this.data.set('tdColumns', tdColumns);
    };

    initRenderData(value?: {[key: string]: JSONValue}[]) {
        const pagination = this.data.get('pagination');
        let data = value || this.data.get('filteredData');
        if (pagination) {
            data = this.getPaginationData(data);
        }
        data = this.getFlattenData(data);
        if (value) {
            this.data.set('filteredData', data);
        }
        this.data.set('renderData', data);
        this.data.set('isTree', data.some((item: {children: object}) => item.children));
    };

    // 获取当前分页的数据
    getPaginationData(data: object[]) {
        const pageSize = this.data.get('pagination.pageSize');
        const current = this.data.get('pagination.current');

        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            // @ts-ignore
            data = data.filter((item, i: number) => i >= (current - 1) * pageSize && i < current * pageSize);
        }

        return data;
    };

    rowExpandable(item: boolean): boolean {
        const rowExpandable = this.data.get('rowExpandable');
        if (rowExpandable) {
            return rowExpandable(item);
        }
        // 用户没有传入 rowExpandable 函数的情况下，默认显示展开子表格的按钮
        return true;
    };

    // 获取当前column的rolspan和rowspan
    getColumns(columns: I.Column[], item: object[], dataIndex: number) {
        let colSpan: number;
        let colSpanIndex: number = 0;
        let result: I.Column[] = [];

        columns.forEach((column, i) => {
            let render = column.render;
            let newColumn: I.Column = {
                ...column
            };
            if (render && typeof render === 'function') {
                // @ts-ignore
                let itemAttrs: I.Column = render(item[column.key || column.dataIndex], item, dataIndex);
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
        result = result.filter((column: I.Column, index) => {
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
    };

    // 获取th和td的样式
    getThClass(column: I.Column) {
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
    };

    getThStyle(column: I.Column) {
        const {left, right} = column;
        const width = column.width || '100%';

        if (left) {
            return `left: ${left}; min-width: ${width}`;
        }
        else if (right) {
            return `right: ${right}; min-width: ${width}`;
        }
    };

    getBodyStyle(scroll: Record<string, unknown>) {
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
    };

    // 设置filter中输入的值
    setSelectedKeys(keys: object[], column: I.Column) {
        const key = column.key || column.dataIndex;
        let selectedKeys = this.data.get('selectedKeys');
        if (keys && keys.length) {
            selectedKeys[key] = keys;
        }
        else {
            delete selectedKeys[key];
        }
        this.data.set('selectedKeys', {...selectedKeys});
    };

    // 执行onFilter方法，渲染过滤后的数据
    confirm() {
        const selectedKeys = this.data.get('selectedKeys');
        const thColumns = this.data.get('thColumns');
        let data = this.data.get('originalData');
        let filteredData: object[] = [];

        thColumns.forEach((thColumn: I.Column[], thIndex: number) => {
            thColumn.forEach((column, index) => {
                // 如果有onFilter，对数据进行过滤
                const key = column.key || column.dataIndex;
                if (column.onFilter && !isEmpty(selectedKeys) && selectedKeys[key]) {
                    let filterValue = selectedKeys[key];
                    if (!filteredData.length) {
                        filterValue.forEach((value: object) => {
                            filteredData = filteredData.concat(data.filter((item: object) => column.onFilter(value, item)));
                        });
                    }
                    else {
                        let tmpFilteredData: object[] = [];
                        filterValue.forEach((value: object) => {
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
    };

    handleRowClick(record: any) {
        let onRowClick = this.data.get('onRowClick');
        if (onRowClick && typeof onRowClick === 'function') {
            onRowClick && onRowClick(record);
        }
        if (!this.data.get('expandRowByClick')) {
            return;
        }
        this.data.get('hasExpandedRowRender') && this.handleExpandRow(record);
        'collapsed' in record && this.handleTreeExpand(record);
    };

    // 执行复选框选中时候的操作
    handleSelections({key}: {key: string}) {
        let rowSelection = this.data.get('rowSelection');
        let selections = rowSelection.selections || [];
        let selection = selections.filter((selection: Record<string, unknown>) => selection.key === key)[0];

        if (selection && selection.handleSelect) {
            let activeRows = this.getActiveRows(this.data.get('renderData'));
            // @ts-ignore
            selection.handleSelect(activeRows.map((item: {key: string}) => item.key));
        }
        this.handleRowSelectionVisible(false);
    };

    // sticky的时候滚动数据时body和head的联动
    handleTableScroll({target, currentTarget}: {
        target: InstanceType<typeof Table>;
        currentTarget: InstanceType<typeof Table>;
    }) {
        if (target !== currentTarget) {
            return;
        }

        let tableBody = this.ref('tableBody') as InstanceType<typeof Table>;
        let tableHead = this.ref('tableHead') as InstanceType<typeof Table>;
        let scrollPosition;

        if (target === tableBody && tableHead) {
            tableHead.scrollLeft = target.scrollLeft;
        }
        else if (target === tableHead && tableBody) {
            tableBody.scrollLeft = target.scrollLeft;
        }

        if (tableBody.scrollWidth === tableBody.clientWidth && tableBody.scrollWidth !== 0) {
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
    };

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
    };

    handleRowSelectionVisible(visible: boolean) {
        this.data.set('rowSelection.visible', visible);
    };

    // @ts-ignore
    handleFilterVisibleChange(visible: boolean, column: I.Column ,index: number, thIndex: number) {
        this.data.set(`thColumns.${thIndex}.${index}.filterVisible`, visible);
    };

    // 清除所有的filter
    clearFilter(column: I.Column) {
        this.setSelectedKeys([], column);
        this.confirm();
    };

    // 打平数据，用于data有children时候的展示
    getFlattenData(data: []): object[] {
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
    };

    // 展开有children的数据
    handleTreeExpand(expandItem: {
        children: {
            key: string;
        }[];
        key?: string;
    }) {
        let data = this.data.get('renderData');
        let children = expandItem.children.map((item: {key: string}) => item.key);
        let onExpandedRowsChange = this.data.get('onExpandedRowsChange');
        data = data.map((item: { key: any; collapsed: boolean; expanded: boolean; }) => {
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
    };

    // 展开当前行
    handleExpandRow(expandItem: object) {
        let data = this.data.get('renderData');
        let onExpandedRowsChange = this.data.get('onExpandedRowsChange');
        data = data.map((item: {key: object; expanded: boolean}) => {
            // @ts-ignore
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
    };

    hasSorterIcon(column: {sortDirections: string[]}, name: string) {
        const sortDirections = column.sortDirections || [];
        if (!sortDirections.length) {
            return true;
        }
        return sortDirections.includes(name);
    };

    runSorter(column: Record<string, unknown>) {
        let filteredData = this.data.get('filteredData');

        let data = column.sortOrder
            ? this.recursiveSort(filteredData, this.getSorterFn(column))
            : filteredData;

        this.data.set('renderData', data);
    };

    // 点击排序时候的处理
    handleSorter(column: Record<string, unknown>, columnIndex: number, thIndex: number) {
        let sortColumn = this.data.get('sortColumn');
        let sortColumnIndex = this.data.get('sortColumnIndex');
        // @ts-ignore
        const sortDirections: string[] = column.sortDirections || ['ascend', 'descend'];
        // @ts-ignore
        const sortIndex: number = sortDirections.indexOf(column.sortOrder);

        // 如果当前点击的是之前已经排序的组件
        if (column === sortColumn) {
            column.sortOrder = sortDirections[sortIndex + 1];
            this.data.set('sortColumn', column);
            this.data.set(`thColumns.${thIndex}.${columnIndex}`, {...column});
        }
        else {
            column.sortOrder = sortDirections[sortIndex + 1];
            sortColumn && (sortColumn.sortOrder = undefined);
            this.data.set(`thColumns.${thIndex}.${sortColumnIndex}`, {...sortColumn});
            this.data.set(`thColumns.${thIndex}.${columnIndex}`, {...column});
            this.data.set('sortColumn', column);
            this.data.set('sortColumnIndex', columnIndex);
        }

        this.runSorter(column);
        this.handleChange();
    };

    getSorterFn(column: Record<string, any>) {
        if (!column || !column.sortOrder || typeof column.sorter !== 'function') {
            return;
        }

        return (a: object, b: object) => {
            const result = column.sorter(a, b, column.sortOrder);
            if (result !== 0) {
                return column.sortOrder === 'descend' ? -result : result;
            }
            return 0;
        };
    };

    recursiveSort(data: object[], sorterFn: ((a: object, b: object) => number) | undefined): object {
        const childrenColumnName = this.data.get('childrenColumnName') || 'children';
        return data.sort(sorterFn).map((item: {[x: string]: any}) =>
            item[childrenColumnName]
                ? {
                    ...item,
                    [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn)
                }
                : item,
        );
    };

    getFilterChecked(selectedKeys: number[] = [], value: {toString: () => number}) {
        return selectedKeys.indexOf(value.toString()) > -1;
    };

    getCheckboxProps(item: object, name: string) {
        let rowSelection = this.data.get('rowSelection');
        if (rowSelection && typeof rowSelection.getCheckboxProps === 'function') {
            return rowSelection.getCheckboxProps(item)[name];
        }
    };

    getActiveRows(data: object[]) {
        // 过滤出不是disabled状态的row
        return data.filter((item: object) => !this.getCheckboxProps(item, 'disabled'));
    };

    getAllChecked<T extends object[]>(data: T, selectedRowKeys: string | number[]): T | boolean {
        let activeRows = this.getActiveRows(data);
        if (!activeRows.length) {
            return false;
        }
        // @ts-ignore
        return activeRows.every((item: any) => selectedRowKeys.includes(item.key));
    };

    getAllDisabled(data: object[]): boolean {
        let activeRows = this.getActiveRows(data);
        return !activeRows.length;
    };

    handleSelectionChange(selectedRowKeys: string | any[], selectedRows: string | any[]) {
        let rowSelection = this.data.get('rowSelection');
        rowSelection.handleChange && rowSelection.handleChange(
            selectedRowKeys,
            selectedRows
        );
    };

    getItemChecked(item: {key: string}, selectedRowKeys: string | any[]) {
        return selectedRowKeys.includes(item.key);
    };

    getIndeterminate(selectedRowKeys: string | any[], data: any[]) {
        return !this.getAllChecked(data, selectedRowKeys)
            && data.some((item: any) => selectedRowKeys.includes(item.key));
    };

    // selection全选时候的操作
    handleSelectionAll(e: {target: {checked: any}}) {
        const checked = e.target.checked;
        let handleSelectAll = this.data.get('rowSelection.handleSelectAll');
        let activeRows = this.getActiveRows(this.data.get('renderData'));
        let selectedRows = checked ? activeRows : [];
        let selectedRowKeys = selectedRows.map((item: any) => item.key);

        this.data.set('selectedRowKeys', selectedRowKeys);
        this.data.set('selectedRows', selectedRows);
        if (typeof handleSelectAll === 'function') {
            handleSelectAll(selectedRows, checked);
        }
        this.handleSelectionChange(selectedRowKeys, selectedRows);
    };

    // 获取关联父/子节点
    getCheckedList(checkedNode: { key: any; }, type: string) {
        let renderData = this.data.get('renderData');
        let result: any[] = [];
        for (let i = 0; i < renderData.length; i++) {
            if (renderData[i].key === checkedNode.key && renderData[i][type]) {
                let filterNode = type === 'parent'
                    ? renderData[i].parent : dfsData(renderData[i].children);
                filterNode.forEach((item: any) => {
                    result.push(item);
                });
            }
        }
        return result;
    };

    // 复选框单选时候的操作
    handleSelection(e: { target: { checked: any; }; }, item: { key: any; }) {
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

        this.data.set('selectedRowKeys', [...selectedRowKeys]);
        this.data.set('selectedRows', selectedRows);
    };

    // 点击分页时候的操作
    handlePaginationChange(payload: {page: string}) {
        this.data.set('pagination.current', payload.page);
        this.initRenderData();
        this.handleChange();
    };

    getRowClassName(record: object, index: number) {
        const rowClassName = this.data.get('rowClassName');
        return rowClassName && rowClassName(record, index) || '';
    };

    static template = /* html */ `
        <div>
            <s-spin spinning="{{loading}}" delay="{{loadingDelay}}">
                <template slot="content">
                    <s-pagination
                        s-if="{{paginationTop}}"
                        s-bind="{{pagination}}"
                        class="${prefixCls}-pagination ${prefixCls}-{{paginationTop}}-pagination"
                        total="{{pagination.total || filteredData.length}}"
                        on-change="handlePaginationChange"
                    />
                    <div class="{{classes}}">
                    <div class="${prefixCls}-title" s-if="hasTitle">
                        <slot name="title" s-if="!title" />
                        <template s-else>{{title}}</template>
                    </div>
                    <div
                        s-if="!!sticky"
                        class="${prefixCls}-sticky-holder"
                    >
                        ${stickyHeaderTemplate}
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
                        s-bind="{{pagination}}"
                        class="${prefixCls}-pagination ${prefixCls}-{{paginationBottom}}-pagination"
                        total="{{pagination.total || filteredData.length}}"
                        on-change="handlePaginationChange"
                    />
                </template>
            </s-spin>
        </div>
    `;
};
