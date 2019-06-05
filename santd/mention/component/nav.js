/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import '../style/index.less';
import san from 'san';

export default san.defineComponent({
    handleClick() {
        this.dispatch('itemSelect', this.el.innerText);
    },
    // attached() {
    //     console.log(this.data.get('classes'));
    // },
    template: `<div className="{{classes}}" on-click="handleClick">
            <slot></slot>
        </div>`
});
