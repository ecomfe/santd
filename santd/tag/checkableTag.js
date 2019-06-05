/**
* @file checkableTag.js 可选择标签
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
const pagin = classCreator('tag');
const prefixCls = pagin();
export default san.defineComponent({
    dataTypes: {
        checked: DataTypes.bool
    },
    computed: {
        classes() {
            const checked = this.data.get('checked');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-checkable`]: true,
                [`${prefixCls}-checkable-checked`]: checked
            });
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
