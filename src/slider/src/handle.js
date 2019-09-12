/**
 * @file Santd slider handle file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        vertical: DataTypes.bool,
        offset: DataTypes.number,
        disabled: DataTypes.bool,
        max: DataTypes.number,
        min: DataTypes.number,
        value: DataTypes.number,
        tabIndex: DataTypes.number
    },
    computed: {
        index() {
            const tabIndex = this.data.get('tabIndex');
            const disabled = this.data.get('disabled');
            if (disabled || tabIndex === null) {
                return null;
            }
            return tabIndex || 0;
        },
        classes() {
            const className = this.data.get('className');
            const prefixCls = this.data.get('prefixCls');

            let classArr = [className];
            this.data.get('clickFocused') && classArr.push(`${prefixCls}-handle-click-focused`);
            return classArr;
        },
        bodyStyle() {
            const vertical = this.data.get('vertical');
            const offset = this.data.get('offset');
            const style = this.data.get('style');

            const positionStyle = vertical ? {bottom: `${offset}%`} : {left: `${offset}%`};

            return {
                ...style,
                ...positionStyle
            };
        }
    },
    initData() {
        return {
            clickFocused: false
        };
    },
    attached() {
        this.handleMouseUpListener = document.addEventListener('mouseup', this.handleMouseUp);
        this.dispatch('saveHandle', this);
    },
    detached() {
        if (this.handleMouseUpListener) {
            document.removeEventListener('mouseup', this.handleMouseUp);
        }
    },
    handleBlur() {
        this.setClickFocus(false);
    },
    handleKeyDown() {
        this.setClickFocus(false);
    },
    handleMouseDown() {
        this.focus();
    },
    handleMouseUp() {
        if (document.activeElement === this.el) {
            this.setClickFocus(true);
        }
    },
    setClickFocus(focused) {
        this.data.set('clickFocused', focused);
    },
    clickFocus() {
        this.setClickFocus(true);
        this.focus();
    },
    focus() {
        this.el.focus();
    },
    blur() {
        this.el.blur();
    },
    template: `<div
        tabIndex="{{index}}"
        class="{{classes}}"
        style="{{bodyStyle}}"
        on-blur="handleBlur"
        on-keydown="handleKeyDown"
        on-mousedown="handleMouseDown"
        role="slider"
        aria-valuemin="{{min}}"
        aria-valuemax="{{max}}"
        aria-valuenow="{{value}}"
        aria-disabled="{{!!disabled}}"
    />`
});
