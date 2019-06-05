/**
 * @file santd Table TableHeader
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import TableHeaderRow from './TableHeaderRow';

function getHeaderRows(columns, currentRow = 0, rows) {
    rows = rows || [];
    rows[currentRow] = rows[currentRow] || [];

    columns.forEach(column => {
        if (column.rowSpan && rows.length < column.rowSpan) {
            while (rows.length < column.rowSpan) {
                rows.push([]);
            }
        }
        const cell = {
            key: column.key,
            className: column.className || '',
            children: column.title,
            column
        };
        if (column.children) {
            getHeaderRows(column.children, currentRow + 1, rows);
        }
        if ('colSpan' in column) {
            cell.colSpan = column.colSpan;
        }
        if ('rowSpan' in column) {
            cell.rowSpan = column.rowSpan;
        }
        if (cell.colSpan !== 0) {
            rows[currentRow].push(cell);
        }
    });
    return rows.filter(row => row.length > 0);
}

export default san.defineComponent({
    dataTypes: {
        fixed: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.bool
        ]),
        columns: DataTypes.array
    },
    computed: {
        prefixCls() {
            const table = this.data.get('table');
            return table && table.data.get('prefixCls');
        },
        classes() {
            const prefixCls = this.data.get('prefixCls');
            return classNames({
                [`${prefixCls}-thead`]: true
            });
        },
        rows() {
            const columns = this.data.get('columns');
            const expandIconAsCell = this.data.get('expandIconAsCell');
            const fixed = this.data.get('fixed');
            const rows = getHeaderRows(columns);
            const prefixCls = this.data.get('prefixCls');
            if (fixed !== 'right' && rows.length) {
                const iconColumn = {
                    key: 'san-table-expand-icon-cell',
                    className: prefixCls + '-expand-icon-th',
                    title: '',
                    rowSpan: rows.length,
                    visible: !!expandIconAsCell
                };
                rows[0].unshift({...iconColumn, column: iconColumn});
            }
            return rows;
        }
    },
    components: {
        tableheaderrow: TableHeaderRow
    },
    template: `
        <thead class="{{classes}}">
            <tableheaderrow
                s-for="row in rows"
                prefix="{{prefix}}"
                key="{{index}}"
                index="{{index}}"
                fixed="{{fixed}}"
                columns="{{columns}}"
                rows="{{rows}}"
                row="{{row}}"
                selectedRowKeys="{{selectedRowKeys}}"
                selectionDirty="{{selectionDirty}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                headRowHeight="{{headRowHeight}}"
            ></tableheaderrow>
        </thead>
    `
});
