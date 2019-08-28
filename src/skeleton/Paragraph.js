/**
 * @file 组件 skeleton/Paragraph
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('skeleton')('paragraph');
const widthUnit = DataTypes.oneOfType([DataTypes.number, DataTypes.string]);

export const SkeletonParagraphProps = DataTypes.oneOfType([
    DataTypes.bool,
    DataTypes.shape({
        rows: DataTypes.number,
        width: DataTypes.oneOfType([widthUnit, DataTypes.arrayOf(widthUnit)])
    })
]);

export default san.defineComponent({
    template: `
        <ul class="${prefixCls}">
            <li s-for="row, index in rowList" style="{{index | getWidth(props)}}" />
        </ul>
    `,
    dataTypes: {
        props: SkeletonParagraphProps
    },
    computed: {
        rowList() {
            const rows = this.data.get('props.rows') || 0;
            return new Array(rows);
        }
    },
    filters: {
        getWidth(index, props) {
            const {width, rows = 2} = props;
            if (Array.isArray(width)) {
                return `width: ${width[index]};`;
            }
            // last paragraph
            if (rows - 1 === index) {
                return `width: ${width};`;
            }
            return undefined;
        }
    }
});
