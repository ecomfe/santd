/**
 * @file santd Table TableCell
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import get from 'lodash/get';

export default san.defineComponent({
    dataTypes: {
        record: DataTypes.object,
        prefixCls: DataTypes.string,
        index: DataTypes.number,
        indent: DataTypes.number,
        indentSize: DataTypes.number,
        column: DataTypes.object,
        expandIcon: DataTypes.object
    },
    computed: {
        data() {
            const record = this.data.get('record');
            const indentSize = this.data.get('indentSize');
            const prefixCls = this.data.get('prefixCls');
            const indent = this.data.get('indent');
            const index = this.data.get('index');
            const expandIcon = this.data.get('expandIcon');
            const column = this.data.get('column');

            let text;
            if (typeof column.dataIndex === 'number') {
                text = get(record, column.dataIndex);
            }
            else if (!column.dataIndex || column.dataIndex.length === 0) {
                text = record;
            }
            else {
                text = get(record, column.dataIndex);
            }

            let tdProps = {};

            if (column.onCell) {
                tdProps = {...tdProps, ...column.onCell(record, index)};
            }

            if (column.align) {
                tdProps.style = {...tdProps.style, textAlign: column.align};
            }

            return {
                text,
                displayText: typeof text === 'object' ? '' : text,
                index,
                tdProps,
                paddingLeft: indentSize * indent
            };
        }
    },
    attached() {
        const column = this.data.get('column');
        const text = this.data.get('data.text');
        const record = this.data.get('record');
        const index = this.data.get('index');
        if (column.render) {
            let Component = column.render(text, record, index);
            if (Component.children) {
                // Component.props && this.data.set('column.props', Component.props);
                Component = Component.children;
            }
            if (typeof Component !== 'function') {
                this.data.set('isSanComponent', false);
                return;
            }
            const instance = new Component({
                data: {
                    text,
                    record,
                    index: this.data.get('data.index')
                }
            });
            instance.attach(this.el);
            instance.parentComponent = this;
            this.data.set('instance', instance);
            this.data.set('isSanComponent', true);
        }
        const instance = this.data.get('instance');

        this.watch('selectedRowKeys', val => {
            instance && instance.data.set('selectionDirty', this.data.get('selectionDirty'));
            instance && instance.data.set('selectedRowKeys', val);
            instance && instance.data.set('refresh', Math.random());
        });

        this.watch('data.text', val => {
            instance && instance.data.set('text', val);
        });

        this.watch('record', val => {
            instance && instance.data.set('record', val);
        });
    },
    template: `
        <td class="{{classes}}"
            colspan="{{column.props.colSpan}}"
            rowspan="{{column.props.rowSpan ? column.props.rowSpan : 1}}"
        >
            <span
                s-if="expandIcon"
                style="padding-left: {{data.paddingLeft}}px"
                class="{{prefixCls + '-indent'}} {{'indent-level-' + indent}}"
            ></span>
            <span s-if="!column.render || !isSanComponent">{{data.displayText}}</span>
        </td>
    `
});
