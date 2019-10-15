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
        }
    },

    initData() {
        return {
            clickFocused: false
        };
    },

    attached() {
        if (!this._mouseUpHandler) {
            this._mouseUpHandler = this.handleMouseUp.bind(this);
        }

        document.addEventListener('mouseup', this._mouseUpHandler);
        this.dispatch('santd_slider_handle_save', this);
    },

    detached() {
        document.removeEventListener('mouseup', this._mouseUpHandler);
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
        class="{{clickFocused ？ '{{prefixCls}}-handle-click-focused' : ''}}"
        style="{{vertical ? 'bottom' : 'left'}}:{{offset}}%;"
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