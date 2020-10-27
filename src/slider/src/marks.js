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

    /**
     * 设置刻度标记值样式
     *
     * @param  {Number} point 刻度标记值
     * @param  {Object} options 刻度标记参数,key包含vertical, reverse, direction, max, min
     * @param  {Boolean} vertical 是否垂直
     * @param  {Boolean} reverse 是否反向坐标轴
     * @param  {String} direction 结合是否垂直&&是否反向坐标轴判断出的刻度位置（top、left、bottom、right）
     * @param  {Number} max 最大值
     * @param  {Number} min 最小值
     * @return {String} 刻度标记值样式
     */
    markStyle(point, options = {}) {
        let {vertical, reverse, direction, max, min} = options;
        const offset = (point - min) / (max - min) * 100;
        const distance = reverse ? '50%' : '-50%';
        if (vertical) {
            return `margin-${direction}:-50%;${direction}:${offset}%;`;
        } else {
            return `${direction}: ${offset}%;transform:translateX(${distance});-ms-transform:translateX(${distance})`;
        }
    },

    handleClickLabel(e, point) {
        this.fire('clickLabel', {e, point});
    },

    template: `<div class="${prefixCls}">
        <span
            s-for="mark in marksArr trackBy mark.point"
            class="${prefixCls}-text{{markClass(mark.point, included, max, min)}}"
            style="{{mark.style}}{{markStyle(mark.point, {vertical, reverse, direction, max, min})}}"
            on-mousedown="handleClickLabel($event, point)"
            on-touchstart="handleClickLabel($event, point)"
        >{{mark.label}}</span>
    </div>`
});
