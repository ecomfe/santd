/**
 * @file 组件 slider
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import Handle from './src/handle';
import Steps from './src/steps';
import Marks from './src/marks';
import {classCreator} from '../core/util';

const prefixCls = classCreator('slider')();

function tipFormatter(value) {
    return String(value);
}

function ensureValueInRange(val, min, max) {
    if (val < min) {
        return min;
    }

    if (val > max) {
        return max;
    }

    return val;
}


function ensureValuePrecision(val, step, marks, min, max) {
    const points = Object.keys(marks).map(parseFloat);

    if (step !== null) {
        const maxSteps = Math.floor((max - min) / step);
        const steps = Math.min((val - min) / step, maxSteps);

        points.push(Math.round(steps) * step + min);
    }
    const diffs = points.map(point => Math.abs(val - point));

    let closestPoint = points[diffs.indexOf(Math.min(...diffs))];
    if (!isFinite(closestPoint)) {
        closestPoint = 0;
    }

    return step === null ? closestPoint : closestPoint.toFixed(getPrecision(step)) - 0;
}

function getPrecision(step) {
    let stepString = String(step);
    let precision = 0;
    let dotIndex = stepString.indexOf('.');

    if (dotIndex >= 0) {
        precision = stepString.length - dotIndex - 1;
    }

    return precision;
}

function isEventFromHandle(eventTarget, handles) {
    for (let key in handles) {
        if (!handles.hasOwnProperty[key]) {
            let handle = handles[key];
            if (handle && handle.el  === eventTarget) {
                return true;
            }
        }
    }

    return false;
}

function getHandleCenterPosition(vertical, eventTarget) {
    const coords = eventTarget.getBoundingClientRect();
    return vertical
        ? coords.top + (coords.height * 0.5)
        : window.pageXOffset + coords.left + (coords.width * 0.5);
}

export default san.defineComponent({
    template: `<div
        style="{{vertical ? 'height: 100%;' : ''}}"
        class="${prefixCls} {{classes}}"
        on-mousedown="rootMouseDown"
        on-focus="rootFocus"
    >
        <div class="${prefixCls}-rail" />
        <div
            s-if="included"
            class="${prefixCls}-track{{track.index ? ' ${prefixCls}-track-' + track.index : ''}}"
            style="{{direction}}:{{track.offset}}%;{{vertical ? 'height' : 'width'}}:{{track.len}}%;"
        ></div>
        <s-steps
            vertical="{{vertical}}"
            reverse="{{reverse}}"
            marks="{{marks}}"
            dots="{{dots}}"
            step="{{step}}"
            included="{{included}}"
            max="{{max}}"
            min="{{min}}"
            dotStyle="{{dotStyle}}"
            activeDotStyle="{{activeDotStyle}}"
        />
        <s-handle
            s-for="v, i in handles trackBy i"
            s-ref="handle-{{i}}"
            index="{{i + 1}}"
            vertical="{{vertical}}"
            tooltipPlacement="{{tooltipPlacement}}"
            offset="{{(v - min) / (max - min) * 100}}"
            value="{{v}}"
            direction="{{direction}}"
            getTooltipPopupContainer="{{getTooltipPopupContainer}}"
            dragging="{{i === handleIndex}}"
            tabIndex="{{0}}"
            min="{{min}}"
            max="{{max}}"
            disabled="{{disabled}}"
            tooltipVisible="{{tooltipVisible || activeHandleIndex === i}}"
            tipFormatter="{{tipFormatter}}"
            on-mouseenter="native:updateActiveHandleIndex(i, true)"
            on-mouseleave="native:updateActiveHandleIndex(i, false)"
        />
        <s-marks
            vertical="{{vertical}}"
            reverse="{{reverse}}"
            direction="{{direction}}"
            marks="{{marks}}"
            included="{{included}}"
            max="{{max}}"
            min="{{min}}"
        />
    </div>`,

    components: {
        's-steps': Steps,
        's-marks': Marks,
        's-handle': Handle
    },

    messages: {
        santd_slider_handle_save(payload) {
            const component = payload.value;
            const index = component.data.get('index') || 0;

            this.handlesRefs[index] = component;
        }
    },

    computed: {
        classes() {
            const disabled = this.data.get('disabled');
            const vertical = this.data.get('vertical');
            const marks = this.data.get('marks');

            let classArr = [];
            Object.keys(marks).length && classArr.push(`${prefixCls}-with-marks`);
            disabled && classArr.push(`${prefixCls}-disabled`);
            vertical && classArr.push(`${prefixCls}-vertical`);
            return classArr;
        },
        direction() {
            // 反向坐标轴
            const reverse = this.data.get('reverse');
            // 垂直方向
            const vertical = this.data.get('vertical');
            return vertical ? reverse ? 'top' : 'bottom' : reverse ? 'right' : 'left';
        },
        track() {
            let range = this.data.get('range');
            let value = this.data.get('value');
            let min = this.data.get('min');
            let max = this.data.get('max');

            if (value != null) {
                return range
                    ? {
                        offset: (value[0] - min) / (max - min) * 100,
                        len: (value[1] - value[0] - min) / (max - min) * 100,
                        index: 1
                    }
                    : {
                        offset: 0,
                        len: (value - min) / (max - min) * 100
                    };
            }
        },

        handles() {
            let value = this.data.get('value');
            return this.data.get('range') ? value : [value];
        }
    },

    initData() {
        return {
            min: 0,
            max: 100,
            step: 1,
            marks: {},
            included: true,
            disabled: false,
            dots: false,
            vertical: false,
            trackStyle: [{}],
            handleStyle: [{}],
            railStyle: {},
            dotStyle: {},
            activeDotStyle: {},
            tipFormatter
        };
    },

    inited() {
        this.handlesRefs = {};

        let {
            min,
            value,
            range
        } = this.data.get();


        if (value == null) {
            value = this.data.get('defaultValue') || (range ? [min, min] : min);
        }
        else if (range) {
            value = value.map(v => this.correctValue(v));
        }
        else {
            value = this.correctValue(value);
        }
        this.data.set('value', value);
    },

    correctValue(value) {
        let {
            min,
            max,
            step,
            marks
        } = this.data.get();

        return ensureValuePrecision(ensureValueInRange(value, min, max), step, marks, min, max);
    },

    rootBlur(e) {
        if (!this.data.get('disabled')) {
            this.handleEnd();
            this.fire('blur', e);
        }
    },

    rootFocus(e) {
        const disabled = this.data.get('disabled');

        if (!disabled && isEventFromHandle(e.target, this.handlesRefs)) {
            e.stopPropagation();
            e.preventDefault();

            const vertical = this.data.get('vertical');
            const handlePosition = getHandleCenterPosition(vertical, e.target);

            this.dragOffset = 0;
            this.handleStart(handlePosition);

            this.fire('focus', e);
        }
    },

    rootMouseDown(e) {
        if (!this.data.get('disabled')) {
            if (e.button !== 0) {
                return;
            }

            let vertical = this.data.get('vertical');
            let position = vertical ? e.clientY : e.pageX;
            if (!isEventFromHandle(e, this.handlesRefs)) {
                this.dragOffset = 0;
            }
            else {
                const handlePosition = getHandleCenterPosition(vertical, e.target);
                this.dragOffset = position - handlePosition;
                position = handlePosition;
            }
            this.removeDocMouseListeners();
            this.handleStart(position);
            this.addDocMouseListeners();
        }
    },

    handleStart(position) {
        if (this.data.get('range')) {
            let values = this.data.get('value');
            this.fire('beforeChange', values);

            const value = this.calcValueByPos(position);

            let handleIndex = 0;
            if (values[0] === values[1]) {
                handleIndex = value < values[1] ? 0 : 1;
            }
            else if (Math.abs(values[0] - value) > Math.abs(values[1] - value)) {
                handleIndex = 1;
            }

            this.data.set('handleIndex', handleIndex);
            this.data.set('value[' + handleIndex + ']', value);
            this.fire('change', this.data.get('value'));
        }
        else {
            this.fire('beforeChange', this.data.get('value'));
            this.data.set('handleIndex', 0);

            const max = this.data.get('max');
            let value = Math.min(this.calcValueByPos(position), max);

            this.data.set('value', value);
            this.fire('change', value);
        }
    },

    updateActiveHandleIndex(index, visible) {
        this.data.set('activeHandleIndex', visible ? index : null);
    },

    handleMouseMove(e) {
        if (!this.el) {
            this.handleEnd();
            return;
        }

        const position = this.data.get('vertical') ? e.clientY : e.pageX;
        this.handleMove(e, position - this.dragOffset);
    },

    handleMove(e, position) {
        e.stopPropagation();
        e.preventDefault();
        let value = this.calcValueByPos(position);

        if (this.data.get('range')) {
            let handleIndex = this.data.get('handleIndex');
            let values = this.data.get('value').slice(0);

            if (values[handleIndex] !== value) {
                values[handleIndex] = value;
                if (values[0] > values[1]) {
                    this.data.set('handleIndex', handleIndex ? 0 : 1);
                    values = [values[1], values[0]];
                }
                this.data.set('value', values);
                this.fire('change', values);
            }
        }
        else {
            value = Math.min(value, this.data.get('max'));
            if (value !== this.data.get('value')) {
                this.data.set('value', value);
                this.fire('change', value);
            }
        }
    },

    handleEnd() {
        this.removeDocMouseListeners();

        let handleIndex = this.data.get('handleIndex');
        if (this.data.get('handleIndex') != null) {
            this.data.set('handleIndex', null);

            this.ref('handle-' + handleIndex).clickFocus();
            this.fire('afterChange', this.data.get('value'));
        }
    },

    addDocMouseListeners() {
        if (this.el) {
            this._mouseMoveHandler = this.handleMouseMove.bind(this);
            this._endHandler = this.handleEnd.bind(this);
            this.el.ownerDocument.addEventListener('mousemove', this._mouseMoveHandler);
            this.el.ownerDocument.addEventListener('mouseup', this._endHandler);
        }
    },

    removeDocMouseListeners() {
        if (this.el && this._endHandler) {
            this.el.ownerDocument.removeEventListener('mousemove', this._mouseMoveHandler);
            this.el.ownerDocument.removeEventListener('mouseup', this._endHandler);

            this._endHandler = this._mouseMoveHandler = null;
        }
    },

    getSliderStart() {
        const rect = this.el.getBoundingClientRect();

        return this.data.get('vertical') ? rect.top : (rect.left + window.pageXOffset);
    },

    getSliderLength() {
        const slider = this.el;
        if (!slider) {
            return 0;
        }

        const coords = slider.getBoundingClientRect();
        return this.data.get('vertical') ? coords.height : coords.width;
    },

    calcValueByPos(position) {
        let {
            vertical,
            min,
            max
        } = this.data.get();

        const ratio = Math.abs(Math.max(position - this.getSliderStart(), 0) / this.getSliderLength());
        let value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        if (this.data.get('reverse')) {
            value = max - value;
        }
        return this.correctValue(value);
    }
});
