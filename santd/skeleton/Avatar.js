/**
 * @file 组件 skeleton/Avatar
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/skeleton-cn/
 */

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {classCreator} from 'santd/core/util';

const cc = classCreator('skeleton');
const prefixCls = cc('avatar');

export const SkeletonAvatarProps = DataTypes.oneOfType([
    DataTypes.bool,
    DataTypes.shape({
        size: DataTypes.oneOf(['large', 'small', 'default']),
        shape: DataTypes.oneOf(['circle', 'square'])
    })
]);

export default san.defineComponent({
    template: `
        <span class="{{className}}"/>
    `,
    dataTypes: {
        props: SkeletonAvatarProps
    },
    computed: {
        className() {
            const {size, shape} = this.data.get('props');

            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-lg`]: size === 'large',
                [`${prefixCls}-sm`]: size === 'small',
                [`${prefixCls}-circle`]: shape === 'circle',
                [`${prefixCls}-square`]: shape === 'square'
            });
        }
    }
});
