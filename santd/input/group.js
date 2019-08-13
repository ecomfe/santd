/**
* @file inputGroup 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const pagin = classCreator('input-group');
const prefixCls = pagin();

export default san.defineComponent({
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
