/**
 * @file Santd slider handle file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import BaseSlider from './common/baseSlider';
import inherits from '../../core/util/inherits';
import Track from './common/track';
import * as utils from './utils';

export default inherits(san.defineComponent({
    computed: {
        injectTracks() {
            const instance = this.data.get('instance');
            const prefixCls = this.data.get('prefixCls');
            const vertical = this.data.get('vertical');
            const included = this.data.get('included');
            const value = this.data.get('value');

            if (instance) {
                instance.components.tracks = inherits(san.defineComponent({
                    initData() {
                        return {
                            prefixCls: `${prefixCls}-track`,
                            vertical,
                            included,
                            offset: 0,
                            length: instance.calcOffset(value)
                        };
                    }
                }), Track);
                instance.nextTick(() => {
                    const tracks = instance.ref('tracks');
                    tracks && tracks.data.set('length', instance.calcOffset(value));
                });
            }
        },
        injectHandles() {
            const prefixCls = this.data.get('prefixCls');
            const handleGenerator = this.data.get('handle');
            const instance = this.data.get('instance');
            const vertical = this.data.get('vertical');
            const value = this.data.get('value');
            const dragging = this.data.get('dragging');
            const disabled = this.data.get('disabled');
            const min = this.data.get('min');
            const max = this.data.get('max');
            const tabIndex = this.data.get('tabIndex');
            const handleStyle = this.data.get('handleStyle');
            const tipFormatter = this.data.get('tipFormatter');
            const tooltipVisible = this.data.get('tooltipVisible');

            if (instance) {
                const initData = {
                    className: prefixCls + '-handle',
                    prefixCls,
                    vertical,
                    offset: instance.calcOffset(value),
                    value,
                    dragging,
                    disabled,
                    min,
                    max,
                    index: 0,
                    tabIndex,
                    style: handleStyle[0] || handleStyle,
                    tipFormatter,
                    tooltipVisible
                };
                instance.components.handles = inherits(san.defineComponent({
                    initData() {
                        return {
                            ...initData
                        };
                    }
                }), handleGenerator);
                instance.nextTick(() => {
                    const handles = instance.ref('handles');
                    for (let key in initData) {
                        handles && handles.data.set(key, initData[key]);
                    }
                });
            }
        }
    },
    trimAlignValue(v, nextProps = {}) {
        if (v === null) {
            return null;
        }

        const mergedProps = {...this.data.get(), ...nextProps};
        const val = utils.ensureValueInRange(v, mergedProps);
        return utils.ensureValuePrecision(val, mergedProps);
    },
    inited() {
        const defaultValue = this.data.get('defaultValue');
        const value = this.data.get('value');
        const min = this.data.get('min');

        this.data.set('defaultValue', defaultValue || min);
        this.data.set('value', this.trimAlignValue(value || defaultValue || min));
        this.data.set('instance', this);
        this.data.set('dragging', false);
    },
    handleChange(value) {
        const max = this.data.get('max');
        this.data.set('value', value > max ? max : value);

        this.fire('change', value);
    },
    handleStart(position) {
        this.data.set('dragging', true);
        const prevValue = this.data.get('value');
        this.fire('beforeChange', prevValue);

        const value = this.calcValueByPos(position);
        this.startValue = value;
        this.startPosition = position;

        this.data.set('prevMovedHandleIndex', 0);
        this.handleChange(value);
    },
    handleMove(e, position) {
        utils.pauseEvent(e);
        // const oldValue = this.data.get('value');
        const value = this.calcValueByPos(position);
        if (value !== this.data.get('value')) {
            this.handleChange(value);
            this.fire('move', value);
        }

    },
    handleEnd(force) {
        const dragging = this.data.get('dragging');
        this.removeDocumentEvents();
        if (dragging || force) {
            this.fire('afterChange', this.data.get('value'));
        }
        this.data.set('dragging', false);
        this.fire('end');
    },
    getLowerBound() {
        return this.data.get('min');
    },
    getUpperBound() {
        return this.data.get('max');
    }
}), BaseSlider);