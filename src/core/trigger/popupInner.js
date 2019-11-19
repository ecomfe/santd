/**
 * @file Santd trigger popup inner file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {alignElement, alignPoint} from 'dom-align';
import {buffer, restoreFocus} from './util';
import Animate from '../util/animate';

export default san.defineComponent({
    dataTypes: {
        hiddenClassName: DataTypes.string,
        visible: DataTypes.bool,
        prefixCls: DataTypes.string
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

    initData() {
        return {
            ...Animate.prototype.initData(),
            monitorBufferTime: 50,
            monitorWindowResize: false,
            disabled: false
        };
    },

    attached() {
        const disabled = this.data.get('disabled');
        const monitorWindowResize = this.data.get('monitorWindowResize');

        if (!disabled && monitorWindowResize) {
            this.startMonitorWindowResize();
        }
        Animate.prototype.attached.bind(this)();
    },

    updated() {
        const visible = this.data.get('visible');
        const target = this.data.get('target');

        if (!target) {
            return;
        }
        if (visible) {
            this.forceAlign();
        }
        Animate.prototype.updated.bind(this)();
    },

    detached() {
        this.stopMonitorWindowResize();
    },

    startMonitorWindowResize() {
        if (!this.bufferMonitor) {
            this.bufferMonitor = buffer(
                this.forceAlign.bind(this),
                this.data.get('monitorBufferTime')
            );
            window.addEventListener('resize', this.bufferMonitor, false);
        }
    },

    stopMonitorWindowResize() {
        if (this.bufferMonitor) {
            this.bufferMonitor.clear();
            window.removeEventListener('resize', this.bufferMonitor, false);
        }
    },

    forceAlign() {
        const {
            disabled,
            target,
            align
        } = this.data.get();

        if (!disabled && target) {
            if (target instanceof window.HTMLElement) {
                alignElement(this.el, target, align);
            }
            else if (target && typeof target === 'object') {
                alignPoint(this.el, target, align);
            }

            restoreFocus(document.activeElement, this.el);
        }
    },

    template: `
        <div style="position: absolute; z-index: 1000; {{popupStyle}}" class="{{visible ? '' : hiddenClassName}}">
            <div
                class="{{popupClassName}} {{prefixCls}}-content"
                on-mouseenter="handleMouseEnter"
                on-mouseleave="handleMouseLeave"
                on-mousedown="handleMouseDown"
                on-touchstart="handleTouchStart"
            >
                <slot />
            </div>
       </div>
    `
}, Animate);
