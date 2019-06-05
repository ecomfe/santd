/**
 * @file santd Table TableHeaderRow
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import toStyle from 'to-style';

export default san.defineComponent({
    dataTypes: {
        fixed: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.bool
        ]),
        columns: DataTypes.array
    },
    created() {
        this.data.set('instances', []);
    },
    computed: {
        prefixCls() {
            const table = this.data.get('table');
            return table && table.data.get('prefixCls');
        },
        cells() {
            const row = this.data.get('row');
            const prefixCls = this.data.get('prefixCls');
            const headRowHeight = this.data.get('headRowHeight');
            return row.map(cell => {
                cell.customProps = (cell.column && cell.column.onHeaderCell)
                    ? cell.column.onHeaderCell(cell.column)
                    : {};
                cell.customProps.style = {
                    ...cell.column.style
                };
                if (cell.column && cell.column.align) {
                    cell.customProps.style.textAlign = cell.column.align;
                    cell.customProps.className = classNames(cell.column.className, {
                        [`${prefixCls}-align-${cell.column.align}`]: !!cell.column.align
                    });
                }
                else if (cell.column && headRowHeight && headRowHeight[0]) {
                    cell.customProps.style.height = headRowHeight[0];

                }
                else if (cell.column) {
                    cell.customProps.className = cell.column.className;
                    const colSpan = cell.column.colSpan;
                    const rowSpan = cell.column.rowSpan;
                    if (typeof colSpan !== 'undefined') {
                        cell.customProps.colspan = colSpan;
                    }
                    if (typeof rowSpan !== 'undefined') {
                        cell.customProps.rowspan = rowSpan;
                    }
                }
                cell.isComponent = !(typeof cell.children === 'string');
                cell.customProps.style = toStyle.string(cell.customProps.style);
                cell.props = {
                    ...cell.customProps
                };
                delete cell.props.onClick;
                return {
                    ...cell
                };
            }).filter(cell => cell.visible !== false);
        }
    },
    attached() {
        let nodes = [].slice.call(this.el.children);
        const row = this.data.get('row');
        row.filter(item => item.visible !== false).forEach((item, index) => {
            let children = item.children;
            if (typeof children === 'function') {
                const Component = children();
                const instance = new Component();
                instance.attach(nodes[index]);
                instance.parentComponent = children[index];
                this.data.push('instances', instance);
            }
        });

        const instances = this.data.get('instances');
        this.watch('selectedRowKeys', val => {
            instances.forEach(instance => {
                instance.data.set('selectionDirty', this.data.get('selectionDirty'));
                instance.data.set('selectedRowKeys', val);
                instance.data.set('refresh', Math.random());
            });
        });

        this.watch('sortOrder', val => {
            const sortColumn = this.data.get('sortColumn');
            instances.forEach(instance => {
                instance.data.set('sortOrder', val);
                instance.data.set('sortColumn', sortColumn);
            });
        });

        this.watch('sortColumn', val => {
            const sortOrder = this.data.get('sortOrder');
            instances.forEach(instance => {
                instance.data.set('sortOrder', sortOrder);
                instance.data.set('sortColumn', val);
            });
        });
    },
    handleClick(cell) {
        cell.customProps && cell.customProps.onClick(cell.column);
    },
    filters: {
        json(a) {
            return JSON.stringify(a);
        }
    },
    template: `
        <tr>
            <template s-for="cell, index in cells">
            <th
                s-bind="{{cell.props}}"
                key="{{cell.column.key || cell.column.dataIndex || index}}"
                on-click="handleClick(cell)"
            ><span s-if="!cell.isComponent">{{cell.children}}</span></th>
            </template>
        </tr>
    `
});
