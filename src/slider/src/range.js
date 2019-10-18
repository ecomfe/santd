/**
 * @file Santd slider range file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import BaseSlider from './base';
import inherits from '../../core/util/inherits';
import Track from './track';
import Handle from './handle';
import * as utils from './utils';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('slider')();

export default inherits(san.defineComponent({
    computed: {
        injectTracks() {
            const instance = this.data.get('instance');
            const vertical = this.data.get('vertical');
            const included = this.data.get('included');
            const bounds = this.data.get('bounds') || [];
            const trackStyle = this.data.get('trackStyle');

            if (instance) {
                const offsets = bounds.map(v => instance.calcOffset(v));
                instance.components.tracks = san.defineComponent({
                    initData() {
                        return {
                            tracks: bounds.slice(0, -1),
                            offsets,
                            vertical,
                            included,
                            trackStyle
                        };
                    },
                    components: {
                        's-track': Track
                    },
                    template: `<span>
                        <s-track
                            s-for="track, index in tracks"
                            vertical="{{vertical}}"
                            included="{{included}}"
                            offset="{{offsets[index]}}"
                            length="{{offsets[index + 1] - offsets[index]}}"
                            style="{{trackStyle[index]}}"
                            index="{{index + 1}}"
                        />
                    </span>`
                });
                instance.nextTick(() => {
                    const tracks = instance.ref('tracks');
                    tracks.data.set('offsets', bounds.map(v => instance.calcOffset(v)));
                });
            }
        },
        injectHandles() {
            const instance = this.data.get('instance');
            const vertical = this.data.get('vertical');
            const value = this.data.get('value');
            const dragging = this.data.get('dragging');
            const disabled = this.data.get('disabled');
            const min = this.data.get('min');
            const max = this.data.get('max');
            const tabIndex = this.data.get('tabIndex') || [];
            const handleStyle = this.data.get('handleStyle');
            const tipFormatter = this.data.get('tipFormatter');
            const bounds = this.data.get('bounds') || [];
            const handles = this.data.get('handles');
            const tooltipVisible = this.data.get('tooltipVisible');

            if (instance) {
                const offsets = bounds.map(v => instance.calcOffset(v));
                const initData = bounds.map((v, i) => {
                    const handleClassName = prefixCls + '-handle';
                    return {
                        className: [handleClassName, handleClassName + '-' + (i + 1)].join(' '),
                        vertical,
                        offset: offsets[i],
                        value: v,
                        dragging: handles === i,
                        index: i,
                        tabIndex: (disabled || tabIndex[i] === null)
                            ? null : tabIndex[i] || 0,
                        min,
                        max,
                        disabled,
                        style: handleStyle[i],
                        tipFormatter,
                        tooltipVisible
                    };
                });
                instance.components.handles = san.defineComponent({
                    initData() {
                        return {
                            handleData: initData
                        };
                    },
                    components: {
                        's-handle': Handle
                    },
                    template: `<span>
                        <s-handle
                            s-for="data, index in handleData"
                            s-ref="handle-{{index}}"
                            className="{{data.className}}"
                            vertical="{{data.vertical}}"
                            offset="{{data.offset}}"
                            value="{{data.value}}"
                            dragging="{{data.dragging}}"
                            tabIndex="{{data.tabIndex}}"
                            min="{{data.min}}"
                            max="{{data.max}}"
                            disabled="{{data.disabled}}"
                            style="{{data.style}}"
                            tipFormatter="{{data.tipFormatter}}"
                        />
                    </span>`
                });
                instance.nextTick(() => {
                    const handles = instance.ref('handles');
                    initData.forEach((v, i) => {
                        const handle = handles.ref('handle-' + i);
                        for (let key in v) {
                            handle.data.set(key, v[key]);
                        }
                    });
                });
            }
        }
    },
    trimAlignValue(v, handle, nextProps = {}) {
        const mergedProps = {...this.data.get(), ...nextProps};
        const valInRange = utils.ensureValueInRange(v, mergedProps);
        const valNotConflict = this.ensureValueNotConflict(handle, valInRange, mergedProps);
        return utils.ensureValuePrecision(valNotConflict, mergedProps);
    },
    inited() {
        const defaultValue = this.data.get('defaultValue');
        const min = this.data.get('min');
        const max = this.data.get('max');
        const count = this.data.get('count') || 1;
        const initialValue = Array(...Array(count + 1)).map(() => min);
        const value = this.data.get('value') || defaultValue || initialValue;
        const bounds = value.map((v, i) => this.trimAlignValue(v, i));
        const recent = bounds[0] === max ? 0 : bounds.length - 1;

        this.data.set('value', value);
        this.data.set('instance', this);
        this.data.set('bounds', bounds);
        this.data.set('recent', recent);
    },
    ensureValueNotConflict(handle, val, {allowCross, pushable: thershold}) {
        const bounds = this.data.get('bounds');
        handle = handle === undefined ? this.data.get('handles') : handle;
        thershold = Number(thershold);

        if (!allowCross && handle != null && bounds !== undefined) {
            if (handle > 0 && val <= (bounds[handle - 1] + thershold)) {
                return bounds[handle - 1] + thershold;
            }
            if (handle < bounds.length - 1 && val >= (bounds[handle + 1] - thershold)) {
                return bounds[handle + 1] - thershold;
            }
        }
        return val;
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
    moveTo(value, isFromKeyboardEvent) {
        const bounds = this.data.get('bounds');
        const handles = this.data.get('handles');
        const recent = this.data.get('recent');

        const nextBounds = [...bounds];
        const handle = handles === null ? recent : handles;
        nextBounds[handle] = value;
        let nextHandle = handle;
        if (this.data.get('pushable') !== false) {
            this.pushSurroundingHandles(nextBounds, nextHandle);
        }
        else if (this.data.get('allowCross')) {
            nextBounds.sort((a, b) => a - b);
            nextHandle = nextBounds.indexOf(value);
        }
        this.handleChange({
            recent: nextHandle,
            handles: nextHandle,
            bounds: nextBounds
        });
        if (isFromKeyboardEvent) {
            this.fire('afterChange', nextBounds);
            this.handleEnd();
        }
    },
    handleChange(state) {
        ['handles', 'recent'].forEach(item => {
            if (state[item]) {
                this.data.set(item, state[item]);
            }
        });

        const changedValue = state.bounds;
        this.data.set('bounds', state.bounds);
        this.fire('change', changedValue);
    },
    handleStart(position) {
        const bounds = this.data.get('bounds');
        this.fire('beforeChange', bounds);

        const value = this.calcValueByPos(position);
        this.startValue = value;
        this.startPosition = position;

        const closestBound = this.getClosestBound(value);
        this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);

        this.data.set('handles', this.prevMovedHandleIndex);
        this.data.set('recent', this.prevMovedHandleIndex);

        const nextBounds = [...bounds];
        nextBounds[this.prevMovedHandleIndex] = value;
        this.handleChange({bounds: nextBounds});
    },
    handleMove(e, position) {
        e.stopPropagation();
        e.preventDefault();

        // const oldValue = this.data.get('value');
        const value = this.calcValueByPos(position);
        const handles = this.data.get('handles');
        if (this.data.get('bounds')[handles] !== value) {
            this.moveTo(value);
        }

    },
    handleEnd(force) {
        this.removeDocumentEvents();
        if (this.data.get('handles') !== null || force) {
            this.fire('afterChange', this.data.get('value'));
        }
        this.data.set('handles', null);
        this.fire('end');
    }
}), BaseSlider);