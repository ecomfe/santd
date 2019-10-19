/**
 * @file Santd slider base file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Steps from './steps';
import Marks from './marks';
import * as utils from './utils';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('slider')();

export default san.defineComponent({
    dataTypes: {
        min: DataTypes.number,
        max: DataTypes.number,
        step: DataTypes.number,
        marks: DataTypes.object,
        included: DataTypes.bool,
        disabled: DataTypes.bool,
        dots: DataTypes.bool,
        vertical: DataTypes.bool,
        style: DataTypes.object,
        handleStyle: DataTypes.oneOfType([DataTypes.object, DataTypes.array]),
        trackStyle: DataTypes.oneOfType([DataTypes.object, DataTypes.array]),
        railStyle: DataTypes.object,
        dotStyle: DataTypes.object,
        activeDotStyle: DataTypes.object,
        autoFocus: DataTypes.bool
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
            activeDotStyle: {}
        };
    },
    inited() {
        this.handlesRefs = {};
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
    attached() {
        this.document = this.el && this.el.ownerDocument;
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
    handleBlur(e) {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            this.handleEnd();
            this.fire('blur', e);
        }
    },
    components: {
        's-steps': Steps,
        's-marks': Marks
    },
    messages: {
        santd_slider_handle_save(payload) {
            const instance = payload.value;
            const index = instance.data.get('index') || 0;

            this.handlesRefs[index] = instance;
        }
    },
    template: `<div
        class="${prefixCls} {{classes}}"
        on-mousedown="handleMouseDown"
        on-mouseup="handleMouseUp"
        on-focus="handleFocus"
        on-blur="handleBlur"
    >
        <div class="${prefixCls}-rail" />
        <tracks s-ref="tracks" s-if="included" />
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
        <slot />
    </div>`
});