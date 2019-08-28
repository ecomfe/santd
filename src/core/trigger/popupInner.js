/**
 * @file Santd trigger popup inner file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        hiddenClassName: DataTypes.string,
        visible: DataTypes.bool,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        prefixCls: DataTypes.string
    },
    computed: {
        classes() {
            const visible = this.data.get('visible');
            const className = this.data.get('className');
            const hiddenClassName = this.data.get('hiddenClassName');
            let classArr = [className];
            !visible && classArr.push(hiddenClassName);
            return classArr;
        }
    },
    handleMouseEnter(e) {
        this.fire('mouseenter', e);
    },
    handleMouseLeave(e) {
        this.fire('mouseleave', e);
    },
    handleMouseDown(e) {
        this.fire('mousedown', e);
    },
    handleTouchStart(e) {
        this.fire('touchstart', e);
    },
    template: `
        <div style="position: absolute;" class="{{classes}}">
        <div
            class="{{prefixCls}}-content"
            on-mouseenter="handleMouseEnter"
            on-mouseleave="handleMouseLeave"
            on-mousedown="handleMouseDown"
            on-touchstart="handleTouchStart"
        >
            <slot></slot>
        </div>
        </div>
    `
});
