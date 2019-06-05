/**
 * @file santd Table ColGroup
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
    computed: {
        prefixCls() {
            const table = this.data.get('table');
            return table && table.data.get('prefixCls');
        },
        cols() {
            const table = this.data.get('table');
            const columnManager = table.data.get('columnManager');
            const leafColumns = columnManager.leafColumns();
            return leafColumns.map(column => {
                if (column.width) {
                    column.style = toStyle.string({
                        width: column.width,
                        minWidth: column.width
                    });
                }
                return column;
            });
        }
    },
    template: `
        <colgroup>
            <col
                s-for="col in cols"
                style="{{col.style}}"
            />
        </colgroup>
    `
});
