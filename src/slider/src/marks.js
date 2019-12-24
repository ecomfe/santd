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
        marksArr() {
            let result = [];
            let marks = this.data.get('marks') || {};
            let markPoints = Object.keys(marks).sort((a, b) => a - b);

            for (let i = 0; i < markPoints.length; i++) {
                let point = markPoints[i];
                let mark = marks[point];
                let item = {point};
                if (typeof mark === 'object') {
                    item.label = mark.label;
                    item.style && (item.style = mark.style);
                }
                else {
                    item.label = mark;
                }

                if (item.label || item.label === 0) {
                    result.push(item);
                }
            }

            return result;
        }
    },

    markClass(point, included, max, min) {
        if ((!included && point === max)
            || (included && point <= max && point >= min)) {
            return ` ${prefixCls}-text-active`;
        }

        return '';
    },

    markStyle(point, vertical, max, min) {
        const offset = (point - min) / (max - min) * 100;

        return vertical
        ? `margin-bottom:-50%;bottom:${offset}%;`
        : `left: ${offset}%;transform:translateX(-50%);-ms-transform:translateX(-50%)`;
    },

    handleClickLabel(e, point) {
        this.fire('clickLabel', {e, point});
    },

    template: `<div class="${prefixCls}">
        <span
            s-for="mark in marksArr trackBy mark.point"
            class="${prefixCls}-text{{markClass(mark.point, included, max, min)}}"
            style="{{mark.style}}{{markStyle(mark.point, vertical, max, min)}}"
            on-mousedown="handleClickLabel($event, point)"
            on-touchstart="handleClickLabel($event, point)"
        >{{mark.label}}</span>
    </div>`
});
