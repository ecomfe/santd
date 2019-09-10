/**
* @file checkableTag.js 可选择标签
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('tag')();

export default san.defineComponent({
    dataTypes: {
        checked: DataTypes.bool
    },

    initData() {
        return {
            checked: false
        };
    },

    handleClick() {
        const check = this.data.get('checked');
        this.fire('change', !check);
        this.data.set('checked', !check);
    },

    template: `
        <div class="${prefixCls} ${prefixCls}-checkable{{checked ? ' ${prefixCls}-checkable-checked' : ''}}" on-click="handleClick">
           <slot/>
        </div>
    `
});