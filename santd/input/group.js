/**
* @file inputGroup 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('input-group')();

export default san.defineComponent({
    dataTypes: {
        size: DataTypes.string,
        compact: DataTypes.bool
    },
    computed: {
        className() {
            const size = this.data.get('size');
            const compact = this.data.get('compact') || false;
            let classArr = [prefixCls];

            size === 'large' && classArr.push(`${prefixCls}-lg`);
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            compact && classArr.push(`${prefixCls}-compact`);

            return classArr;
        }
    },
    template: `
        <div class="{{className}}">
            <slot></slot>
        </div>
    `
});
