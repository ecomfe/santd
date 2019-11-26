/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import san from 'san';
import {classCreator} from '../core/util';
import './style/index.less';

const prefixCls = classCreator('dropdown')();

export default san.defineComponent({
    handleClick() {
        const value = this.data.get('value');
        const dispatchData = value ? value : this.el.innerText;
        this.dispatch('santd_mention_itemSelect', dispatchData);
    },

    template: `<div class="${prefixCls}-menu-item" on-click="handleClick">
            <slot></slot>
        </div>`
});
