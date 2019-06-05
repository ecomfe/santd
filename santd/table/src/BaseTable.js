/**
 * @file santd Table BaseTable
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import toStyle from 'to-style';
import ColGroup from './ColGroup';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default san.defineComponent({
    dataTypes: {
        fixed: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.bool
        ]),
        columns: DataTypes.array,
        tableClassName: DataTypes.string,
        ancestorKeys: DataTypes.array
    },
    initData() {
        return {
            ancestorKeys: [],
            expandedRowKeys: null,
            index: 0
        };
    },
    created() {
        const rows = this.data.get('rows');
        const defaultExpandAllRows = this.data.get('defaultExpandAllRows');
        const expandedRowKeys = this.data.get('expandedRowKeys');
        const defaultExpandedRowKeys = this.data.get('defaultExpandedRowKeys');
        if (defaultExpandAllRows) {
            rows.forEach(row => {
                if (row.rowKey) {
                    expandedRowKeys.push(row.rowKey);
                }
            });
            this.data.set('expandedRowKeys', expandedRowKeys);
        }
        else {
            this.data.set('expandedRowKeys', expandedRowKeys || defaultExpandedRowKeys || []);
        }
    },
    computed: {
        prefixCls() {
            const table = this.data.get('table');
            return table.data.get('prefixCls');
        },
        tableStyle() {
            const fixed = this.data.get('fixed');
            const scroll = this.data.get('scroll');
            const tableStyle = {};
            if (!fixed && scroll && scroll.x) {
                if (scroll.x === true) {
                    tableStyle.tableLayout = 'fixed';
                }
                else {
                    tableStyle.width = scroll.x;
                }
            }
            return toStyle.string(tableStyle);
        },
        rows() {
            const table = this.data.get('table');
            const fixed = this.data.get('fixed');
            const columnManager = table.data.get('columnManager');
            const rowClassName = table.data.get('rowClassName');
            const renderData = this.data.get('data');
            const expandIconAsCell = this.data.get('expandIconAsCell');
            const expandedRowRender = this.data.get('expandedRowRender');
            const ancestorKeys = this.data.get('ancestorKeys') || [];

            const rows = [];
            let colCount;
            if (fixed === 'left') {
                colCount = columnManager.leftLeafColumns().length;
            }
            else if (fixed === 'right') {
                colCount = columnManager.rightLeafColumns().length;
            }
            else {
                colCount = columnManager.leafColumns().length;
            }

            renderData && renderData.forEach((data, index) => {
                const key = table.getRowKey(data, index);
                const rowKey = key + '-extra-row';
                let leafColumns;
                if (fixed === 'left') {
                    leafColumns = columnManager.leftLeafColumns();
                }
                else if (fixed === 'right') {
                    leafColumns = columnManager.rightLeafColumns();
                }
                else {
                    leafColumns = columnManager.leafColumns();
                }
                rows.push({
                    record: {...data},
                    key: key,
                    rowKey: key,
                    className: typeof rowClassName === 'string'
                        ? rowClassName
                        : rowClassName(data, index),
                    leafColumns: leafColumns,
                    expandedRowRender: expandedRowRender,
                    ancestorKeys: ancestorKeys
                });
                if (expandIconAsCell) {
                    const columns = [{
                        key: 'extra-row',
                        props: {
                            colSpan: colCount
                        },
                        render: expandedRowRender
                    }];
                    if (fixed !== 'right') {
                        columns.unshift({
                            key: 'expand-icon-placeholder'
                        });
                    }
                    rows.push({
                        key: key,
                        rowKey: rowKey,
                        record: data,
                        leafColumns: columns,
                        ancestorKeys: [...ancestorKeys, key],
                        visible: !!expandIconAsCell
                    });
                }
            });
            return rows;
        }
    },
    handleExpandedChange(payload) {
        const rowKey = payload.rowKey;
        const expandedRowKeys = this.data.get('expandedRowKeys');
        const index = expandedRowKeys.indexOf(rowKey);
        if (~index) {
            this.data.removeAt('expandedRowKeys', index);
        }
        else {
            this.data.push('expandedRowKeys', rowKey);
        }
        this.dispatch('onExpand', {
            record: payload.record,
            expanded: !~index
        });
    },
    components: {
        colgroup: ColGroup,
        tableheader: TableHeader,
        tablerow: TableRow
    },
    template: `
        <table class="{{tableClassName}}" style="{{tableStyle}}" key="table">
            <colgroup table="{{table}}" columns="{{columns}}" fixed="{{fixed}}"></colgroup>
            <tableheader
                columns="{{columns}}"
                table="{{table}}"
                s-if="hasHead && showHeader !== false"
                selectedRowKeys="{{selectedRowKeys}}"
                selectionDirty="{{selectionDirty}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                expandIconAsCell="{{expandIconAsCell}}"
                scroll="{{scroll}}"
                isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                fixed="{{fixed}}"
                bodyRowHeight="{{bodyRowHeight}}"
                headRowHeight="{{headRowHeight}}"
                expandedRowRender="{{expandedRowRender}}"
            ></tableheader>
            <tbody s-if="hasBody" class="{{prefixCls + '-tbody'}}">
                <tablerow
                    s-for="row, index in rows"
                    s-if="row.visible !== false"
                    prefixCls="{{prefixCls}}-row"
                    table="{{table}}"
                    record="{{row.record}}"
                    columns="{{row.leafColumns}}"
                    index="{{index}}"
                    key="{{row.key}}"
                    rowKey="{{row.rowKey}}"
                    selectedRowKeys="{{selectedRowKeys}}"
                    selectionDirty="{{selectionDirty}}"
                    sortOrder="{{sortOrder}}"
                    sortColumn="{{sortColumn}}"
                    fixed="{{fixed}}"
                    expandedRowRender="{{row.expandedRowRender}}"
                    expandIconColumnIndex="{{expandIconColumnIndex}}"
                    expandIconAsCell="{{expandIconAsCell}}"
                    ancestorKeys="{{row.ancestorKeys}}"
                    expandedRowKeys="{{expandedRowKeys}}"
                    on-handleExpandedChange="handleExpandedChange"
                    scroll="{{scroll}}"
                    isAnyColumnsFixed="{{isAnyColumnsFixed}}"
                    bodyRowHeight="{{bodyRowHeight}}"
                    headRowHeight="{{headRowHeight}}"
                ></tablerow>
            </tbody>
        </table>
    `
});
