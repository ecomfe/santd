/**
 * @file Santd slider handle file
 * @author mayihui@baidu.com
 **/

import Tooltip from '../../tooltip';
import {classCreator} from '../../core/util';
import Base from 'santd/base';

const prefixCls = classCreator('slider-handle')();


export default class Handle extends Base {
    _mouseUpHandler!: () => void
    static template = `
        <span>
            <s-tooltip
                rootDomNode="{{rootDomNode}}"
                useDomNodeForce="{{true}}"
                placement="{{tooltipPlacement}}"
                getPopupContainer="{{getTooltipPopupContainer}}"
                transitionName="zoom-down"
                title="{{title}}"
                s-ref="tooltip"
                visible="{{isTipVisible}}"
            >
                <div
                    s-ref="handle"
                    tabIndex="{{(disabled || tabIndex == null) ? '' : tabIndex}}"
                    class="${prefixCls}{{index ? ' ${prefixCls}-' + index : ''}}{{clickFocused ? ' ${prefixCls}-click-focused' : ''}}"
                    style="{{direction}}:{{offset}}%;"
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
    
    static components = {
        's-tooltip': Tooltip
    }

    static computed = {
        isTipVisible(this: Handle) {
            const tooltipVisible = this.data.get('tooltipVisible');
            const tipFormatter = this.data.get('tipFormatter');
            const dragging = this.data.get('dragging');

            return tooltipVisible || tipFormatter && dragging;
        },

        title(this: Handle) {
            const tipFormatter = this.data.get('tipFormatter');
            const value = this.data.get('value');
            return tipFormatter ? tipFormatter(value) : '';
        }
    }

    initData() {
        return {
            clickFocused: false
        };
    }

    attached() {
        if (!this._mouseUpHandler) {
            this._mouseUpHandler = this.handleMouseUp.bind(this);
        }

        this.data.set('rootDomNode', this. ref('handle'));
        document.addEventListener('mouseup', this._mouseUpHandler);
        this.dispatch('santd_slider_handle_save', this);

        this.watch('offset', () => {
            this.nextTick(() => {
                let tooltip = this.ref('tooltip') as unknown as Tooltip;
                tooltip.refresh();
            });
        });
    }

    detached() {
        document.removeEventListener('mouseup', this._mouseUpHandler);
    }

    handleBlur() {
        this.setClickFocus(false);
    }

    handleKeyDown() {
        this.setClickFocus(false);
    }

    handleMouseDown() {
        this.focus();
    }

    handleMouseUp() {
        if (document.activeElement === this.el) {
            this.setClickFocus(true);
        }
    }

    setClickFocus(focused: boolean) {
        this.data.set('clickFocused', focused);
    }

    clickFocus() {
        this.setClickFocus(true);
        this.focus();
    }

    focus() {
        (this.el as unknown as Handle).focus();
    }

    blur() {
        (this.el as unknown as Handle).blur();
    }

};
