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
            },
            handle: san.defineComponent({
                initData() {
                    return {
                        visibles: []
                    };
                },
                attached() {
                    this.data.set('rootDomNode', this.ref('handle').el);
                },
                components: {
                    's-tooltip': Tooltip,
                    's-handle': Handle
                },
                computed: {
                    isTipFormatter() {
                        const tipFormatter = this.data.get('tipFormatter');
                        const visibles = this.data.get('visibles');
                        const dragging = this.data.get('dragging');
                        const index = this.data.get('index');

                        return tipFormatter ? visibles[index] || dragging : false;
                    },
                    title() {
                        const tipFormatter = this.data.get('tipFormatter');
                        const value = this.data.get('value');
                        return tipFormatter ? tipFormatter(value) : '';
                    }
                },
                handleMouseEnter() {
                    const index = this.data.get('index');
                    this.data.set('visibles[' + index + ']', true);
                },
                handleMouseLeave() {
                    const index = this.data.get('index');
                    this.data.set('visibles[' + index + ']', false);
                },
                template: `<span>
                        <s-tooltip
                            rootDomNode="{{rootDomNode}}"
                            title="{{title}}"
                            s-ref="tooltip"
                            visible="{{tooltipVisible || tooltipVisible === undefined && isTipFormatter)}}"
                        >
                            <s-handle
                                prefixCls="{{prefixCls}}"
                                offset="{{offset}}"
                                class="{{className}}"
                                vertical="{{vertical}}"
                                s-ref="handle"
                                on-mouseenter="native:handleMouseEnter"
                                on-mouseleave="native:handleMouseLeave"
                            />
                        </s-tooltip>
                    </span>
                `
            })
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
            handle="{{handle}}"
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
            handle="{{handle}}"
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