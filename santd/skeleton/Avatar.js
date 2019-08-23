/**
 * @file 组件 skeleton/Avatar
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('skeleton')('avatar');

export const SkeletonAvatarProps = DataTypes.oneOfType([
    DataTypes.bool,
    DataTypes.shape({
        size: DataTypes.oneOf(['large', 'small', 'default']),
        shape: DataTypes.oneOf(['circle', 'square'])
    })
]);

export default san.defineComponent({
    template: `
        <span class="{{className}}" />
    `,
    dataTypes: {
        props: SkeletonAvatarProps
    },
    computed: {
        className() {
            const {size, shape} = this.data.get('props');
            let classArr = [prefixCls];
            size === 'large' && classArr.push(`${prefixCls}-lg`);
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            shape === 'circle' && classArr.push(`${prefixCls}-circle`);
            shape === 'square' && classArr.push(`${prefixCls}-square`);
            return classArr;
        }
    }
});
