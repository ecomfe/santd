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
    computed: {
        classes() {
            const checked = this.data.get('checked');
            let classArr = [prefixCls, `${prefixCls}-checkable`];
            checked && classArr.push(`${prefixCls}-checkable-checked`);
            return classArr;
        }
    },
    initData() {
        return {
            checked: false
        };
    },
    inited() {
        const checked = this.data.get('checked') && this.data.get('checked').toString() === 'true'
            ? true : false;
        this.data.set('checked', checked);
    },
    handleClick() {
        const check = this.data.get('checked');
        this.fire('change', !check);
        this.data.set('checked', !check);
    },
    template: `
        <div class="{{classes}}" on-click="handleClick">
           <slot></slot>
        </div>
    `
});
