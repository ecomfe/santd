/**
 * @file 组件 slider
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import tooltip from 'santd/tooltip';
import classNames from 'classnames';
import addEventListener from 'add-dom-event-listener';
import * as utils from './utils';
import steps from './steps';
import marks from './marks';

const cc = classCreator('slider');
const prefix = cc();

export default san.defineComponent({
    template: `
        <template>
            <div
                s-if="{{!range}}"
                class="{{cls}}"
                on-mousedown="onMouseDown($event)"
            >
                <div class="${prefix}-rail"></div>
                <div
                    s-if="{{included}}"
                    class="${prefix}-track"
                    style="{{sliderDir}}: 0%; {{sliderLen}}: {{perValue}}%;">
                </div>
                <a-step marks="{{marks}}" min="{{min}}" max="{{max}}" value="{{value}}" vertical="{{vertical}}"/>
                <a-tooltip
                    s-if="{{showToolTip}}"
                    placement="top"
                    transitionName="zoom-down"
                    title="{{getFormatStr(value)}}"
                    style="{{sliderDir}}: {{perValue}}%;position: absolute;"
                    visible="{{dragging}}"
                >
                    <div
                        class="${prefix}-handle"
                        tabindex="0"
                        s-ref="handle"></div>
                </a-tooltip>
                <div
                    s-else
                    style="{{sliderDir}}: {{perValue}}%;position: absolute;"
                    class="${prefix}-handle"
                    tabindex="0"
                    s-ref="handle"></div>
                <a-marks marks="{{marks}}" min="{{min}}" max="{{max}}" value="{{value}}" vertical="{{vertical}}"/>
            </div>
            <div
                s-else
                class="{{cls}}"
                on-mousedown="onMouseDown($event)"
            >
                <div class="${prefix}-rail"></div>
                <div
                    s-if="{{included}}"
                    class="${prefix}-track"
                    style="{{sliderDir}}: {{rangeStart}}%; {{sliderLen}}: {{rangeWidth}}%;"
                ></div>
                <a-step marks="{{marks}}" min="{{min}}" max="{{max}}" value="{{value}}" vertical="{{vertical}}"/>
                <a-tooltip
                    s-if="{{showToolTip}}"
                    s-for="item,index in value"
                    placement="top"
                    transitionName="zoom-down"
                    title="{{getFormatStr(item)}}"
                    style="{{sliderDir}}: {{perValue[index]}}%;position: absolute;"
                    visible="{{dragging}}"
                >   
                    <div
                        class="${prefix}-handle"
                        tabindex="0"
                        s-ref="handle"></div>
                </a-tooltip>
                <div
                    s-else
                    s-for="item,index in value"
                    class="${prefix}-handle"
                    style="{{sliderDir}}: {{perValue[index]}}%;position: absolute;"
                    tabindex="0"
                    s-ref="handle"></div>
                <a-marks marks="{{marks}}" min="{{min}}" max="{{max}}" value="{{value}}" vertical="{{vertical}}"/>
            </div>
        </template>
    `,
    components: {
        'a-tooltip': tooltip,
        'a-step': steps,
        'a-marks': marks
    },
    initData() {
        return {
            max: 100,
            min: 0,
            defaultValue: 0,
            vertical: false,
            range: false,
            step: 1,
            included: true,
            dots: false,
            disabled: false,
            allowClear: false,
            marks: {}
        };
    },
    computed: {
        showToolTip() {
            let fmt = this.data.get('tipFormatter');
            return fmt !== null;
        },
        cls() {
            return classNames(prefix, {
                [`${prefix}-with-marks`]: Object.keys(this.data.get('marks')).length,
                [`${prefix}-disabled`]: this.data.get('disabled'),
                [`${prefix}-vertical`]: this.data.get('vertical')
            });
        },
        perValue() {
            let isRange = this.data.get('range');
            let min = this.data.get('min');
            let max = this.data.get('max');
            let value = this.data.get('value') || this.data.get('defaultValue');
            const getPerValue = val => 100 * (val - min) / (max - min);
            if (isRange && Array.isArray(value) && value.length > 1) {
                let [start, end] = value;
                return [getPerValue(start), getPerValue(end)];
            } else {
                return getPerValue(value);
            }
        },
        sliderDir() {
            return this.data.get('vertical') ? 'bottom' : 'left';
        },
        sliderLen() {
            return this.data.get('vertical') ? 'height' : 'width';
        },
        rangeStart() {
            if (this.data.get('range')) {
                let [start, end] = this.data.get('perValue');
                return start > end ? end : start;
            }
        },
        rangeWidth() {
            if (this.data.get('range')) {
                let [start, end] = this.data.get('perValue');
                return Math.abs(start - end);
            }
        }
    },
    inited() {
        let {step, min, max, marks} = this.data.get();
        let points = [];
        if (step === null && marks) {
            points = Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
        } else {
            step = step || 1;
            for (let point = min; point <= max; point += step) {
                points.push(point);
            }
        }
        this.points = points;
    },
    attached() {
    },
    getFormatStr(value) {
        let fmt = this.data.get('tipFormatter');
        if (fmt === null) {
            return '';
        }
        if (fmt) {
            return fmt.replace(/__value__/g, value);
        }
        return value;
    },
    removeDocumentEvents() {
        /* eslint-disable no-unused-expressions */
        this.onTouchMoveListener && this.onTouchMoveListener.remove();
        this.onTouchUpListener && this.onTouchUpListener.remove();
        this.onMouseMoveListener && this.onMouseMoveListener.remove();
        this.onMouseUpListener && this.onMouseUpListener.remove();
        /* eslint-enable no-unused-expressions */
    },
    addDocumentMouseEvents() {
        this.onMouseMoveListener = addEventListener(document.body, 'mousemove', this.onMouseMove.bind(this));
        this.onMouseUpListener = addEventListener(document.body, 'mouseup', this.onEnd.bind(this));
    },
    onMouseMove(e) {
        const position = utils.getMousePosition(this.data.get('vertical'), e);
        this.onMove(e, position);
    },
    onEnd() {
        this.data.set('dragging', false);
        this.removeDocumentEvents();
        this.fire('afterChange', this.data.get('value'));
    },
    onStart(position) {
        this.data.set('dragging', true);
        let preValue = this.data.get('value');
        let value = this.calcValueByPos(position);
        this.startValue = value;
        this.startPosition = position;

        if (this.data.get('range')) {
            let closestIndex = 0;
            if (Math.abs(value - preValue[1]) < Math.abs(value - preValue[0])) {
                closestIndex = 1;
            }
            preValue[closestIndex] = value;
            this.prevMovedHandleIndex = closestIndex;
            this.data.set('value', [...preValue]);
        } else {
            if (value === preValue) {
                return;
            }
            this.data.set('value', value);
            this.prevMovedHandleIndex = 0;
        }
        this.fire('change', value);
    },
    onMove(e, position) {
        utils.pauseEvent(e);
        let preValue = this.data.get('value');
        const value = this.calcValueByPos(position);
        if (this.data.get('range')) {
            preValue[this.prevMovedHandleIndex] = value;
            this.data.set('value', [...preValue]);
        } else {
            if (value === preValue) {
                return;
            }
            this.data.set('value', value);
        }
        this.fire('change', value);
    },
    onMouseDown(e) {
        if (e.button !== 0 || this.data.get('disabled')) {
            return;
        }
        const isVertical = this.data.get('vertical');
        let position = utils.getMousePosition(isVertical, e);
        if (e.target === this.ref('handle')) {
            this.dragOffset = 0;
        } else {
            const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
            this.dragOffset = position - handlePosition;
            // position = handlePosition;
        }
        this.removeDocumentEvents();
        this.onStart(position);
        this.addDocumentMouseEvents();
    },
    getSliderStart() {
        const slider = this.el;
        const rect = slider.getBoundingClientRect();

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
        const {vertical, min, max} = this.data.get();
        const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
        const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        return value;
    },
    trimAlignValue(v) {
        if (v === null) {
            return null;
        }
        const val = utils.ensureValueInRange(v, this.data.get());
        return utils.ensureValuePrecision(val, this.data.get());
    },
    getClosestValue(value) {
        if (!this.points || this.points.length < 1) {
            return;
        }
        let minIndex = 0;
        let minLen = Math.abs(this.points[0] - value);
        for (let i = 0; i < this.points.length; i++) {
            let len = Math.abs(this.points[i] - value);
            if (len < minLen) {
                minLen = len;
                minIndex = i;
            }
        }
        return this.points[minIndex];
    },
    calcValueByPos(position) {
        const pixelOffset = position - this.getSliderStart();
        const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
        return this.getClosestValue(nextValue);
    }
});