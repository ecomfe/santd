/**
 * @file Santd slider marks file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('slider-mark')();

export default san.defineComponent({
    dataTypes: {
        vertical: DataTypes.bool,
        marks: DataTypes.object,
        included: DataTypes.bool,
        max: DataTypes.number,
        min: DataTypes.number
    },
    computed: {
        elements() {
            const marks = this.data.get('marks') || {};
            const marksKeys = Object.keys(marks);

            return marksKeys.map(parseFloat).sort((a, b) => a - b).map(point => {
                const markPoint = marks[point];
                const markPointIsObject = typeof markPoint === 'object';
                const markLabel = markPointIsObject ? markPoint.label : markPoint;
                if (!markLabel && markLabel !== 0) {
                    return null;
                }

                return {
                    point,
                    markLabel
                };
            });
        }
    },
    
    markClass(point, included, max, min) {
        if ((!included && point === max)
            || (included && point <= max && point >= min)) {
            return ` ${prefixCls}-text-active`;
        }

        return '';
    },

    markStyle(point) {
        const vertical = this.data.get('vertical');
        const max = this.data.get('max');
        const min = this.data.get('min');
        const range = max - min;
        const marks = this.data.get('marks');
        const bottomStyle = {
            'margin-bottom': '-50%',
            'bottom': `${(point - min) / range * 100}%`
        };
        const leftStyle = {
            'left': `${(point - min) / range * 100}%`,
            'transform': 'translateX(-50%)',
            '-ms-transform': 'translateX(-50%)'
        };

        const style = vertical ? bottomStyle : leftStyle;

        const markPoint = marks[point];
        const markPointIsObject = typeof markPoint === 'object';
        return markPointIsObject ? {
            ...style,
            ...markPoint.style
        } : style;
    },
    handleClickLabel(e, point) {
        this.fire('clickLabel', {e, point});
    },

    template: `<div class="${prefixCls}">
        <span
            s-for="element in elements"
            class="${prefixCls}-text{{markClass(element.point, included, max, min)}}"
            style="{{markStyle(element.point)}}"
            on-mousedown="handleClickLabel($event, point)"
            on-touchstart="handleClickLabel($event, point)"
        >{{element.markLabel}}</span>
    </div>`
});