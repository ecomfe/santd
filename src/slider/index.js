/**
 * @file 组件 slider
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';
import Slider from './src/slider';
import Range from './src/range';
import Handle from './src/handle';

const prefixCls = classCreator('slider')();

export default san.defineComponent({
    initData() {
        const that = this;
        return {
            prefixCls,
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
            prefixCls="{{prefixCls}}"
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
            prefixCls="{{prefixCls}}"
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