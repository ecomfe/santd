/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import '../style/index.less';
import san from 'san';

export default san.defineComponent({
    handleClick() {
        const value = this.data.get('value');
        const dispatchData = value ? value : this.el.innerText;
        this.dispatch('santd_mention_itemSelect', dispatchData);
    },

    template: `<div class="san-dropdown-menu-item" on-click="handleClick">
            <slot></slot>
        </div>`
});
