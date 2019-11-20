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
        isTipVisible() {
            const tooltipVisible = this.data.get('tooltipVisible');
            const tipFormatter = this.data.get('tipFormatter');
            const dragging = this.data.get('dragging');

            return tooltipVisible || tipFormatter && dragging;
        },

        title() {
            const tipFormatter = this.data.get('tipFormatter');
            const value = this.data.get('value');
            return tipFormatter ? tipFormatter(value) : '';
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

        this.data.set('rootDomNode', this. ref('handle'));
        document.addEventListener('mouseup', this._mouseUpHandler);
        this.dispatch('santd_slider_handle_save', this);

        this.watch('offset', val => {
            this.nextTick(() => {
                let tooltip = this.ref('tooltip');
                tooltip.refresh();
            });
        });
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

    template: `
        <span>
            <s-tooltip
                rootDomNode="{{rootDomNode}}"
                useDomNodeForce="{{true}}"
                transitionName="zoom-down"
                title="{{title}}"
                s-ref="tooltip"
                visible="{{isTipVisible}}"
            >
                <div
                    s-ref="handle"
                    tabIndex="{{(disabled || tabIndex == null) ? '' : tabIndex}}"
                    class="${prefixCls}{{index ? ' ${prefixCls}-' + index : ''}}{{clickFocused ? ' ${prefixCls}-click-focused' : ''}}"
                    style="{{vertical ? 'bottom' : 'left'}}:{{offset}}%;"
                    on-blur="handleBlur"
                    on-keydown="handleKeyDown"
                    on-mousedown="handleMouseDown"
                    role="slider"
                    aria-valuemin="{{min}}"
                    aria-valuemax="{{max}}"
                    aria-valuenow="{{value}}"
                    aria-disabled="{{!!disabled}}"
                />
            </s-tooltip>
        </span>`
});
