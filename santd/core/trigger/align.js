/**
 * @file Santd trigger popup align file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import {alignElement, alignPoint} from 'dom-align';
import {buffer, restoreFocus} from './utils/index';

function getElement(target) {
    if (!(target instanceof window.HTMLElement)) {
        return null;
    }
    return target;
}

function getPoint(point) {
    if (typeof point !== 'object' || !point) {
        return null;
    }
    return point;
}

export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        visible: DataTypes.bool,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        prefixCls: DataTypes.string
    },
    created() {
        this.data.set('monitorBufferTime', 50);
        this.data.set('monitorWindowResize', false);
        this.data.set('disabled', false);
    },
    attached() {
        const disabled = this.data.get('disabled');
        const monitorWindowResize = this.data.get('monitorWindowResize');

        if (!disabled && monitorWindowResize) {
            this.startMonitorWindowResize();
        }
        this.forceAlign();
    },
    updated() {
        // 暂时每次都同步
        const visible = this.data.get('visible');
        if (visible) {
            this.forceAlign();
        }
    },
    detached() {
        this.stopMonitorWindowResize();
    },
    startMonitorWindowResize() {
        if (!this.resizeHandler) {
            this.bufferMonitor = buffer(this.forceAlign.bind(this), this.data.get('monitorBufferTime'));
            window.addEventListener('resize', this.bufferMonitor, false);
        }
    },
    stopMonitorWindowResize() {
        if (this.resizeHandler) {
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
            const source = this.el;

            let result;
            const element = getElement(target);
            const point = getPoint(target);

            const activeElement = document.activeElement;

            if (element) {
                result = alignElement(source, element, align);
            }
            else if (point) {
                result = alignPoint(source, point, align);
            }

            restoreFocus(activeElement, source);

            // this.fire('align', {source, result});
        }
    }
    /*template: `
        <div style="position: absolute;" class="{{className}}">
            <slot></slot>
        </div>
    `*/
});
