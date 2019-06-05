/**
 * @file santd Table ColumnManager
 * @author mayihui@baidu.com
 **/

export default class ColumnManager {
    constructor(columns, nodes) {
        this.cached = {};
        this.columns = columns || this.normalize(nodes);
    }

    isAnyColumnsFixed() {
        return this.cache('isAnyColumnsFixed', () => this.columns.some(column => !!column.fixed));
    }

    isAnyColumnsLeftFixed() {
        return this.cache('isAnyColumnsLeftFixed', () => {
            return this.columns.some(column => column.fixed === 'left' || column.fixed === true);
        });
    }

    isAnyColumnsRightFixed() {
        return this.cache('isAnyColumnsRightFixed', () => {
            return this.columns.some(column => column.fixed === 'right');
        });
    }

    groupedColumns() {
        return this.cache('groupedColumns', () => {
            const groupColumns = (columns, currentRow = 0, parentColumn = {}, rows = []) => {
                rows[currentRow] = rows[currentRow] || [];
                const grouped = [];
                const setRowSpan = column => {
                    const rowSpan = rows.length - currentRow;
                    if (column && !column.children && rowSpan > 1
                        && (!column.rowSpan || column.rowSpan < rowSpan)) {
                        column.rowSpan = rowSpan;
                    }
                };
                columns.forEach((column, index) => {
                    const newColumn = {...column};
                    rows[currentRow].push(newColumn);
                    parentColumn.colSpan = parentColumn.colSpan || 0;
                    if (newColumn.children && newColumn.children.length > 0) {
                        newColumn.children = groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
                        parentColumn.colSpan += newColumn.colSpan;
                    }
                    else {
                        parentColumn.colSpan++;
                    }
                    // update rowspan to all same row columns
                    for (let i = 0; i < rows[currentRow].length - 1; ++i) {
                        setRowSpan(rows[currentRow][i]);
                    }
                    // last column, update rowspan immediately
                    if (index + 1 === columns.length) {
                        setRowSpan(newColumn);
                    }
                    grouped.push(newColumn);
                });
                return grouped;
            };
            return groupColumns(this.columns);
        });
    }

    leftColumns() {
        return this.cache('leftColumns', () => {
            return this.groupedColumns().filter(
                column => column.fixed === 'left' || column.fixed === true,
            );
        });
    }

    rightColumns() {
        return this.cache('rightColumns', () => {
            return this.groupedColumns().filter(column => column.fixed === 'right');
        });
    }

    leafColumns() {
        return this.cache('leafColumns', () => this.travelLeafColumns(this.columns));
    }

    leftLeafColumns() {
        return this.cache('leftLeafColumns', () => this.travelLeafColumns(this.leftColumns()));
    }

    rightLeafColumns() {
        return this.cache('rightLeafColumns', () => this.travelLeafColumns(this.rightColumns()));
    }


    travelLeafColumns(columns) {
        const leafColumns = [];

        columns.forEach(column => {
            if (!column.children) {
                leafColumns.push(column);
            }
            else {
                leafColumns.push(...this.travelLeafColumns(column.children));
            }
        });
        return leafColumns;
    }

    normalize(nodes) {
        console.log(nodes);
    }

    cache(name, fn) {
        if (this.cached[name]) {
            return this.cached[name];
        }
        this.cached[name] = fn();
        return this.cached[name];
    }
}
