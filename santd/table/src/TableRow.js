/**
 * @file santd Table TableRow
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import TableCell from './TableCell';

export default san.defineComponent({
    dataTypes: {
        fixed: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.bool
        ]),
        columns: DataTypes.array,
        bodyRowHeight: DataTypes.object
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            return classNames({
                [`${prefixCls}-thead`]: true
            });
        },
        cells() {
            const columns = this.data.get('columns');
            const index = this.data.get('index');
            const expandedRowRender = this.data.get('expandedRowRender');
            return columns.map(column => {
                if (column.render) {
                    const component = column.render(null, {}, index);
                    if (component && component.props) {
                        column.props = component.props;
                    }
                }
                if (column.props && typeof column.props.rowSpan === 'undefined') {
                    column.props.rowSpan = 1;
                }
                if (column.props && typeof column.props.colSpan === 'undefined') {
                    column.props.colSpan = 1;
                }
                return column;
            }).filter(column => {
                return (column.props && column.props.colSpan !== 0)
                    && (column.props && column.props.rowSpan !== 0)
                    || !column.props;
            });
        },
        expandable() {
            const childrenColumnName = this.data.get('childrenColumnName') || 'children';
            const record = this.data.get('record');
            const childrenData = record && record[childrenColumnName];
            const expandedRowRender = this.data.get('expandedRowRender');
            return !!(childrenData || expandedRowRender);
        },
        visible() {
            const ancestorKeys = this.data.get('ancestorKeys');
            const expandedRowKeys = this.data.get('expandedRowKeys') || [];
            return ancestorKeys.length === 0 || ancestorKeys.every(item => ~expandedRowKeys.indexOf(item));
        },
        height() {
            const bodyRowHeight = this.data.get('bodyRowHeight') || {};
            const rowKey = this.data.get('rowKey');
            return bodyRowHeight[rowKey];
        }
    },
    handleExpandChange(e) {
        const record = this.data.get('record');
        const expandable = this.data.get('expandable');
        const rowKey = this.data.get('rowKey');
        if (expandable) {
            this.fire('handleExpandedChange', {
                record,
                rowKey,
                e
            });
        }
    },
    attached() {
        const fixed = this.data.get('fixed');
        const rowKey = this.data.get('rowKey');
        const ancestorKeys = this.data.get('ancestorKeys');

        if (!fixed && ancestorKeys.length >= 0 && rowKey) {
            this.setRowHeight();
        }
    },
    setRowHeight() {
        const key = this.data.get('key');

        setTimeout(() => {
            const height = this.el.getBoundingClientRect().height;
            this.dispatch('setBodyRowHeight', {
                key,
                height
            });
        }, 0);
    },
    components: {
        tablecell: TableCell
    },
    template: `
        <tr class="{{classes}}" style="{{visible ? '' : 'display:none;'}} {{height ? 'height:' + height + 'px;' : ''}}">
            <td
                s-if="expandable"
                class="{{prefixCls + '-expand-icon-cell'}}"
                key="{{prefixCls + '-expand-icon-cell'}}"
            >
                <span s-if="expandable"
                    on-click="handleExpandChange"
                    class="{{prefixCls + '-expand-icon'}} {{prefixCls + (expanded ? '-expanded' : '-collapsed')}}"
                ></span>
                <span s-else-if="needIndentSpaced"
                    class="{{prefixCls + '-expand-icon'}} {{prefixCls + '-spaced'}}"
                ></span>
            </td>
            <tablecell
                s-for="cell in cells"
                prefixCls="{{prefixCls}}"
                record="{{record}}"
                column="{{cell}}"
                index="{{index}}"
                selectedRowKeys="{{selectedRowKeys}}"
                selectionDirty="{{selectionDirty}}"
            >
            </tablecell>
        </tr>
    `
});
