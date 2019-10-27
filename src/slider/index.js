/**
 * @file 组件 slider
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import Tooltip from '../tooltip';
import Slider from './src/slider';
import Range from './src/range';
import Handle from './src/handle';
import Steps from './src/steps';
import Marks from './src/marks';
import Track from './track';
import * as utils from './src/utils';
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

function getPrecision(step) {
    let stepString = String(step);
    let precision = 0;
    let dotIndex = stepString.indexOf('.');

    if (dotIndex >= 0) {
        precision = stepString.length - dotIndex - 1;
    }

    return precision;
}

export default san.defineComponent({
    template: `<div
        style="{{vertical ? 'height: 100%;' : ''}}"
        class="${prefixCls} {{classes}}"
        on-mousedown="handleMouseDown"
        on-mouseup="handleMouseUp"
        on-focus="handleFocus"
        on-blur="handleBlur"
    >
        <div class="${prefixCls}-rail" />
        <s-track
            s-if="included"
            s-for="track, index in tracks"
            vertical="{{vertical}}"
            included="{{included}}"
            offset="{{trackOffsets[index]}}"
            length="{{trackOffsets[index + 1] - trackOffsets[index]}}"
            index="{{index + 1}}"
        />
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
        <handles s-ref="handles" />
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
        's-track': Track
    },

    messages: {
        santd_slider_handle_save(payload) {
            const instance = payload.value;
            const index = instance.data.get('index') || 0;

            this.handlesRefs[index] = instance;
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

    handleBlur(e) {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            this.handleEnd();
            this.fire('blur', e);
        }
    },

    handleFocus(e) {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            const vertical = this.data.get('vertical');
            if (utils.isEventFromHandle(e, this.handlesRefs.el)) {
                const handlePosition = utils.getHandleCenterPosition(vertical, e.target);
                this.dragOffset = 0;
                this.handleStart(handlePosition);
                
                e.stopPropagation();
                e.preventDefault();
                this.fire('focus', e);
            }
        }
    },

    handleMouseDown(e) {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            if (e.button !== 0) {
                return;
            }

            const isVertical = this.data.get('vertical');
            let position = utils.getMousePosition(isVertical, e);
            if (!utils.isEventFromHandle(e, this.handlesRefs.el)) {
                this.dragOffset = 0;
            }
            else {
                const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
                this.dragOffset = position - handlePosition;
                position = handlePosition;
            }
            this.removeDocumentEvents();
            this.handleStart(position);
            this.addDocumentMouseEvents();
        }
    },

    handleMouseMove(e) {
        if (!this.el) {
            this.handleEnd();
            return;
        }

        const position = utils.getMousePosition(this.data.get('vertical'), e);
        this.handleMove(e, position - this.dragOffset);
    },

    handleMouseUp() {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            const prevMovedHandleIndex = this.data.get('prevMovedHandleIndex');
            if (this.handlesRefs[prevMovedHandleIndex]) {
                this.handlesRefs[prevMovedHandleIndex].clickFocus();
            }
        }
    },

    addDocumentMouseEvents() {
        this.mouseMove = this.handleMouseMove.bind(this);
        this.end = this.handleEnd.bind(this);
        this.document.addEventListener('mousemove', this.mouseMove);
        this.document.addEventListener('mouseup', this.end);
    },

    removeDocumentEvents() {
        this.mouseMove && this.document.removeEventListener('mousemove', this.mouseMove);
        this.end && this.document.removeEventListener('mouseup', this.end);
    },

    calcOffset(value) {
        const {
            min,
            max
        } = this.data.get();
        const ratio = (value - min) / (max - min);
        return ratio * 100;
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
    calcValue(offset) {
        const {
            vertical,
            min,
            max
        } = this.data.get();
        const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
        const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        return value;
    },
    calcValueByPos(position) {
        const pixelOffset = position - this.getSliderStart();
        const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
        return nextValue;
    }
});



/*

export default san.defineComponent({
    initData() {
        const that = this;
        return {
            tipFormatter(value) {
                return value.toString();
            }
        };
    },
    handleMove(value) {
        const slider = this.ref('slider');
        if (!this.data.get('range')) {
            const handles = slider.ref('handles');
            const tooltip = handles.ref('tooltip');
            tooltip.data.set('title', value);
            this.nextTick(() => {
                tooltip.refresh();
            });
        }
    },
    handleEnd() {
        const slider = this.ref('slider');
        if (!this.data.get('range')) {
            const handles = slider.ref('handles');
            handles.data.set('visible', false);
        }
    },
    handleChange(value) {
        this.fire('change', value);
    },
    handleAfterChange(value) {
        this.fire('afterChange', value);
    },
    focus() {
        this.ref('slider').focus();
    },
    blur() {
        this.ref('slider').blur();
    },
    components: {
        's-slider': Slider,
        's-range': Range
    },
    template: `<div style="{{vertical ? 'height: 100%;' : ''}}">
        <s-range
            s-if="range"
            tipFormatter="{{tipFormatter}}"
            defaultValue="{{defaultValue}}"
            disabled="{{disabled}}"
            min="{{min}}"
            max="{{max}}"
            step="{{step}}"
            vertical="{{vertical}}"
            marks="{{marks}}"
            value="{{value}}"
            included="{{included}}"
            tooltipVisible="{{tooltipVisible}}"
            dots="{{dots}}"
            on-move="handleMove"
            on-end="handleEnd"
            on-change="handleChange"
            on-afterChange="handleAfterChange"
            s-ref="range"
        />
        <s-slider
            s-else
            tipFormatter="{{tipFormatter}}"
            defaultValue="{{defaultValue}}"
            disabled="{{disabled}}"
            min="{{min}}"
            max="{{max}}"
            step="{{step}}"
            vertical="{{vertical}}"
            marks="{{marks}}"
            value="{{value}}"
            included="{{included}}"
            tooltipVisible="{{tooltipVisible}}"
            dots="{{dots}}"
            on-move="handleMove"
            on-end="handleEnd"
            on-change="handleChange"
            on-afterChange="handleAfterChange"
            s-ref="slider"
        />
    </div>`
});
*/