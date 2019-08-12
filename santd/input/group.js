/**
* @file inputGroup 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
const pagin = classCreator('input-group');
const prefixCls = pagin();

export default san.defineComponent({
    computed: {
        className() {
            const size = this.data.get('size');
            const compact = this.data.get('compact') || false;
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-lg`]: size === 'large',
                [`${prefixCls}-sm`]: size === 'small',
                [`${prefixCls}-compact`]: compact
            });
        }
    },
    template: `
        <div class="{{className}}">
            <slot></slot>
        </div>
    `
});
