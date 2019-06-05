/**
 * @file 组件 skeleton/Title
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';

const cc = classCreator('skeleton');
const prefixCls = cc();
const widthUnit = DataTypes.oneOfType([DataTypes.number, DataTypes.string]);

export const SkeletonTitleProps = DataTypes.oneOfType([
    DataTypes.bool,
    DataTypes.shape({
        width: widthUnit
    })
]);

export default san.defineComponent({
    template: `
        <h3 class="${prefixCls}-title" style="{{style}}"/>
    `,
    dataTypes: {
        props: SkeletonTitleProps
    },
    computed: {
        style() {
            const width = this.data.get('props.width');
            return `width: ${width}`;
        }
    }
});
