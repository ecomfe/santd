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
        let handle = handles[key];
        if (handle && handle.el  === eventTarget) {
            return true;
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
        on-mouseup="rootMouseUp"
        on-focus="rootFocus"
        on-blur="rootBlur"
    >
        <div class="${prefixCls}-rail" />
        <div 
            s-if="included"
            class="${prefixCls}-track{{track.index ? ' ${prefixCls}-track-' + track.index : ''}}"
            style="{{vertical ? 'bottom' : 'left'}}:{{track.offset}}%;{{vertical ? 'height' : 'width'}}:{{track.len}}%;"
        ></div>
        <s-steps
            vertical="{{vertical}}"
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
            s-for="bound, index in bounds"
            s-ref="handle-{{index}}"
            index="{{index + 1}}"
            vertical="{{vertical}}"
            offset="{{(bound - min) / (max - min) * 100}}"
            value="{{bound}}"
            dragging="{{index === handleIndex}}"
            tabIndex="{{tabIndex[i] || 0}}"
            min="{{min}}"
            max="{{max}}"
            disabled="{{disabled}}"
            tooltipVisible="{{tooltipVisible || activeHandleIndex === index}}"
            tipFormatter="{{tipFormatter}}"
            on-mouseenter="native:updateActiveHandleIndex(index, true)"
            on-mouseleave="native:updateActiveHandleIndex(index, false)"
        />
        <s-marks
            vertical="{{vertical}}"
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

        bounds() {
            let value = this.data.get('value');
            let min = this.data.get('min');
            let max = this.data.get('max');
            let step = this.data.get('step');
            let marks = this.data.get('marks');

            if (!(value instanceof Array)) {
                value = [value];
            }

            return value.map(v => ensureValuePrecision(ensureValueInRange(v, min, max), step, marks, min, max));
        },

        // recent() {
        //     let bounds = this.data.get('bounds');
        //     let max = this.data.get('max');

        //     return bounds && bounds[0] === max ? 0 : bounds.length - 1;
        // },

        track() {
            let range = this.data.get('range');
            let bounds = this.data.get('bounds');
            let min = this.data.get('min');
            let max = this.data.get('max');

            if (range) {
                if (bounds) {
                    return {
                        offset: (bounds[0] - min) / (max - min) * 100,
                        len: (bounds[1] - bounds[0] - min) / (max - min) * 100,
                        index: 1
                    };
                }
            }

            return {
                offset: 0,
                len: (bounds[0] - min) / (max - min) * 100
            };
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

        let min = this.data.get('min');
        let value = this.data.get('value');
        if (!value) {
            this.data.set('value', this.data.get('defaultValue') || [min, min]);
        }
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

    rootMouseUp() {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            const prevMovedHandleIndex = this.data.get('prevMovedHandleIndex');
            if (this.handlesRefs[prevMovedHandleIndex]) {
                this.handlesRefs[prevMovedHandleIndex].clickFocus();
            }
        }
    },

    handleStart(position) {
        if (this.data.get('range')) {
            const bounds = this.data.get('bounds');
            this.fire('beforeChange', bounds);

            const value = this.calcValueByPos(position);
            this.startValue = value;
            this.startPosition = position;

            const closestBound = this.getClosestBound(value);
            this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);

            this.data.set('handleIndex', this.prevMovedHandleIndex);
            this.data.set('recent', this.prevMovedHandleIndex);

            const nextBounds = [...bounds];
            nextBounds[this.prevMovedHandleIndex] = value;
            this.handleChange({bounds: nextBounds});
        }
        else {
            this.fire('beforeChange', this.data.get('value'));
            this.data.set('handleIndex', 0);

            const max = this.data.get('max');
            let value = Math.min(this.calcValueByPos(position), max);

            this.startValue = value;
            this.startPosition = position;

            this.data.set('value', value);
            this.fire('change', value);
        }
    },

    updateActiveHandleIndex(index, visible) {
        this.data.set('activeHandleIndex', visible ? index : null);
    },

    getClosestBound(value) {
        const bounds = this.data.get('bounds');
        let closestBound = 0;
        for (let i = 1; i < bounds.length - 1; ++i) {
            if (value >= bounds[i]) {
                closestBound = i;
            }
        }
        if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
            closestBound += 1;
        }
        return closestBound;
    },

    getBoundNeedMoving(value, closestBound) {
        const {
            bounds,
            recent
        } = this.data.get();
        let boundNeedMoving = closestBound;
        const isAtTheSamePoint = (bounds[closestBound + 1] === bounds[closestBound]);

        if (isAtTheSamePoint && bounds[recent] === bounds[closestBound]) {
            boundNeedMoving = recent;
        }

        if (isAtTheSamePoint && (value !== bounds[closestBound + 1])) {
            boundNeedMoving = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
        }
        return boundNeedMoving;
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

        // const oldValue = this.data.get('value');
        let value = this.calcValueByPos(position);

        if (this.data.get('range')) {
            const handleIndex = this.data.get('handleIndex');
            if (this.data.get('bounds')[handleIndex] !== value) {
                this.moveTo(value);
            }
        }
        else {
            value = Math.min(value, this.data.get('max'));
            if (value !== this.data.get('value')) {
                this.data.set('value', value);
                this.fire('change', value);
                // this.fire('move', value);
            }
        }
    },

    moveTo(value) {
        const bounds = this.data.get('bounds');
        const handleIndex = this.data.get('handleIndex');
        const recent = this.data.get('recent');

        const nextBounds = [...bounds];
        if (handleIndex === null) {
            handleIndex = recent;
        }
        nextBounds[handleIndex] = value;

        if (this.data.get('pushable') !== false) {
            this.pushSurroundingHandles(nextBounds, handleIndex);
        }
        else if (this.data.get('allowCross')) {
            nextBounds.sort((a, b) => a - b);
            handleIndex = nextBounds.indexOf(value);
        }

        this.handleChange({
            recent: handleIndex,
            handleIndex: handleIndex,
            bounds: nextBounds
        });
    },


    pushSurroundingHandles(bounds, handle) {
        const value = bounds[handle];
        let {pushable: threshold} = this.data.get();
        threshold = Number(threshold);

        let direction = 0;
        if (bounds[handle + 1] - value < threshold) {
            direction = +1; // push to right
        }
        if (value - bounds[handle - 1] < threshold) {
            direction = -1; // push to left
        }

        if (direction === 0) {
            return;
        }

        const nextHandle = handle + direction;
        const diffToNext = direction * (bounds[nextHandle] - value);
        if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
            // revert to original value if pushing is impossible
            bounds[handle] = bounds[nextHandle] - (direction * threshold);
        }
    },

    pushHandle(bounds, handle, direction, amount) {
        const originalValue = bounds[handle];
        let currentValue = bounds[handle];
        while (direction * (currentValue - originalValue) < amount) {
            if (!this.pushHandleOnePoint(bounds, handle, direction)) {
                // can't push handle enough to create the needed `amount` gap, so we
                // revert its position to the original value
                bounds[handle] = originalValue;
                return false;
            }
            currentValue = bounds[handle];
        }
        // the handle was pushed enough to create the needed `amount` gap
        return true;
    },

    pushHandleOnePoint(bounds, handle, direction) {
        const points = this.getPoints();
        const pointIndex = points.indexOf(bounds[handle]);
        const nextPointIndex = pointIndex + direction;
        if (nextPointIndex >= points.length || nextPointIndex < 0) {
            // reached the minimum or maximum available point, can't push anymore
            return false;
        }
        const nextHandle = handle + direction;
        const nextValue = points[nextPointIndex];
        const {pushable: threshold} = this.data.get();
        const diffToNext = direction * (bounds[nextHandle] - nextValue);
        if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
            // couldn't push next handle, so we won't push this one either
            return false;
        }
        // push the handle
        bounds[handle] = nextValue;
        return true;
    },

    getPoints() {
        const {
            marks,
            step,
            min,
            max
        } = this.data.get();
        const cache = this._getPointsCache;
        if (!cache || cache.marks !== marks || cache.step !== step) {
            const pointsObject = {...marks};
            if (step !== null) {
                for (let point = min; point <= max; point += step) {
                    pointsObject[point] = point;
                }
            }
            const points = Object.keys(pointsObject).map(parseFloat);
            points.sort((a, b) => a - b);
            this._getPointsCache = {marks, step, points};
        }
        return this._getPointsCache.points;
    },



    handleChange(state) {
        ['handleIndex', 'recent'].forEach(item => {
            if (state[item]) {
                this.data.set(item, state[item]);
            }
        });

        const changedValue = state.bounds;
        this.data.set('bounds', state.bounds);

        this.fire('change', changedValue);
    },


    handleEnd() {
        this.removeDocMouseListeners();
        if (this.data.get('handleIndex') !== null) {
            this.fire('afterChange', this.data.get('value'));
        }
        this.data.set('handleIndex', null);
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
            max,
            step,
            marks
        } = this.data.get();


        const pixelOffset = position - this.getSliderStart();
        const ratio = Math.abs(Math.max(pixelOffset, 0) / this.getSliderLength());
        return ensureValuePrecision(
            ensureValueInRange(
                vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min,
                min,
                max),
            step, marks, min, max);
    }
});