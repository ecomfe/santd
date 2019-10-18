/**
 * @file Santd slider handle file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Tooltip from '../../tooltip';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('slider-handle')();


export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        vertical: DataTypes.bool,
        offset: DataTypes.number,
        disabled: DataTypes.bool,
        max: DataTypes.number,
        min: DataTypes.number,
        value: DataTypes.number,
        tabIndex: DataTypes.number
    },

    components: {
        's-tooltip': Tooltip
    },

    computed: {
        isTipFormatter() {
            const tipFormatter = this.data.get('tipFormatter');
            const visibles = this.data.get('visibles');
            const dragging = this.data.get('dragging');
            const index = this.data.get('index');

            return tipFormatter ? visibles[index] || dragging : false;
        },

        title() {
            const tipFormatter = this.data.get('tipFormatter');
            const value = this.data.get('value');
            return tipFormatter ? tipFormatter(value) : '';
        }
    },

    initData() {
        return {
            clickFocused: false,
            visibles: []
        };
    },

    attached() {
        if (!this._mouseUpHandler) {
            this._mouseUpHandler = this.handleMouseUp.bind(this);
        }

        this.data.set('rootDomNode', this. ref('handle'));
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

    handleMouseEnter() {
        const index = this.data.get('index');
        this.data.set('visibles[' + index + ']', true);
    },

    handleMouseLeave() {
        const index = this.data.get('index');
        this.data.set('visibles[' + index + ']', false);
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

    template: `
        <span>
            <s-tooltip
                rootDomNode="{{rootDomNode}}"
                title="{{title}}"
                s-ref="tooltip"
                visible="{{tooltipVisible || tooltipVisible === undefined && isTipFormatter)}}"
            >
                <div
                    s-ref="handle"
                    tabIndex="{{(disabled || tabIndex == null) ? '' : tabIndex}}"
                    class="${prefixCls}{{index ? ' ${prefixCls}-' + index : ''}}{{clickFocused ? ' ${prefixCls}-click-focused' : ''}}"
                    style="{{vertical ? 'bottom' : 'left'}}:{{offset}}%;"
                    on-blur="handleBlur"
                    on-keydown="handleKeyDown"
                    on-mousedown="handleMouseDown"
                    on-mouseenter="handleMouseEnter"
                    on-mouseleave="handleMouseLeave"
                    role="slider"
                    aria-valuemin="{{min}}"
                    aria-valuemax="{{max}}"
                    aria-valuenow="{{value}}"
                    aria-disabled="{{!!disabled}}"
                />
            </s-tooltip>
        </span>`
});