/**
 * @file santd Table HeadTable
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import BaseTable from './BaseTable';

export default san.defineComponent({
    dataTypes: {
        fixed: DataTypes.oneOfType([
            DataTypes.string,
            DataTypes.bool
        ]),
        columns: DataTypes.array,
        tableClassName: DataTypes.string
    },
    computed: {
        classes() {
            const table = this.data.get('table');
            const prefixCls = table.data.get('prefixCls');
            return classNames({
                [`${prefixCls}-header`]: true
            });
        }
    },
    components: {
        basetable: BaseTable
    },
    handleBodyScrollLeft(e) {
        this.fire('handleBodyScrollLeft', e);
    },
    template: `
        <div
            key="headTable"
            class="{{classes}}"
            on-scroll="handleBodyScrollLeft"
        >
            <basetable
                table="{{table}}"
                tableClassName="{{tableClassName}}"
                hasBody="{{false}}"
                hasHead="{{true}}"
                data="{{data}}"
                fixed="{{fixed}}"
                columns="{{columns}}"
                sortOrder="{{sortOrder}}"
                sortColumn="{{sortColumn}}"
                bodyRowHeight="{{bodyRowHeight}}"
                headRowHeight="{{headRowHeight}}"
                scroll="{{scroll}}"
                showHeader="{{showHeader}}"
                defaultExpandAllRows="{{defaultExpandAllRows}}"
                defaultExpandedRowKeys="{{defaultExpandedRowKeys}}"
                expandedRowKeys="{{expandedRowKeys}}"
            ></basetable>
        </div>
    `
});
