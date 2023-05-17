/**
 * @file Santd trigger popup inner file
 * @author mayihui@baidu.com
 **/
import {alignElement, alignPoint} from 'dom-align';
import {buffer, restoreFocus} from './util';
import Animate, {State as AnimateState} from '../util/animate';

interface Props {
    hiddenClassName?: string;
    visible?: boolean;
    prefixCls?: string;
}

interface State extends AnimateState {
    monitorBufferTime: number;
    monitorWindowResize: boolean;
    disabled: boolean;
}

type WindowEventListenerOrEventListenerObject = Parameters<Window['addEventListener']>[1];

type BufferMonitor =  WindowEventListenerOrEventListenerObject & {
    clear: () => void;
}

export default class PopupInner extends Animate {

    bufferMonitor!: BufferMonitor

    handleMouseEnter(e: MouseEvent) {
        this.fire('mouseenter', e);
    }

    handleMouseLeave(e: MouseEvent) {
        this.fire('mouseleave', e);
    }

    handleMouseDown(e: MouseEvent) {
        this.fire('mousedown', e);
    }

    handleTouchStart(e: TouchEvent) {
        this.fire('touchstart', e);
    }

    initData(): State & Props {
        return {
            ...Animate.prototype.initData(),
            monitorBufferTime: 50,
            monitorWindowResize: false,
            disabled: false
        };
    }

    attached() {
        const disabled: boolean = this.data.get('disabled');
        const monitorWindowResize: number = this.data.get('monitorWindowResize');

        if (!disabled && monitorWindowResize) {
            this.startMonitorWindowResize();
        }
        Animate.prototype.attached.bind(this)();
    }

    updated() {
        const visible: boolean = this.data.get('visible');
        const target: HTMLElement = this.data.get('target');

        if (!target) {
            return;
        }
        if (visible) {
            this.forceAlign();
        }
        Animate.prototype.updated.bind(this)();
    }

    detached() {
        this.stopMonitorWindowResize();
    }

    startMonitorWindowResize() {
        if (!this.bufferMonitor) {
            this.bufferMonitor = buffer(
                this.forceAlign.bind(this),
                this.data.get('monitorBufferTime')
            );
            window.addEventListener('resize', this.bufferMonitor, false);
        }
    }

    stopMonitorWindowResize() {
        if (this.bufferMonitor) {
            this.bufferMonitor.clear();
            window.removeEventListener('resize', this.bufferMonitor, false);
        }
    }

    forceAlign() {
        const {
            disabled,
            target,
            align
        }: {disabled: boolean, target: HTMLElement, align: Record<string, any>} = this.data.get('');

        if (!disabled && target) {
            if (target instanceof window.HTMLElement) {
                alignElement(this.el, target, align);
            }
            else if (target && typeof target === 'object') {
                alignPoint(this.el, target, align);
            }

            restoreFocus(document.activeElement as HTMLElement, this.el as Element);
        }
    }

    static template = /* html */ `
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
};
