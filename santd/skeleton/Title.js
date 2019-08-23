/**
 * @file 组件 skeleton/Title
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('skeleton')();
const widthUnit = DataTypes.oneOfType([DataTypes.number, DataTypes.string]);

export const SkeletonTitleProps = DataTypes.oneOfType([
    DataTypes.bool,
    DataTypes.shape({
        width: widthUnit
    })
]);

export default san.defineComponent({
    template: `
        <h3 class="${prefixCls}-title" style="width: {{props.width}}" />
    `,
    dataTypes: {
        props: SkeletonTitleProps
    }
});
