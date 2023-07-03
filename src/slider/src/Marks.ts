/**
 * @file Santd slider marks file
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../../core/util';
import Base from 'santd/base';
import {MarkItem} from '../interface';

const prefixCls = classCreator('slider-mark')();

export default class Marks extends Base {

    static template = `<div class="${prefixCls}">
        <span
            s-for="mark in marksArr trackBy mark.point"
            class="${prefixCls}-text{{markClass(mark.point, included, max, min)}}"
            style="{{mark.style}}{{markStyle(mark.point, {vertical, reverse, direction, max, min})}}"
            on-mousedown="handleClickLabel($event, point)"
            on-touchstart="handleClickLabel($event, point)"
        >{{mark.label}}</span>
    </div>`

    static computed = {
        marksArr(this: Marks) {
            let result = [];
            let marks = this.data.get('marks') || {};
            let markPoints = Object.keys(marks).sort((a, b) => (+a) - (+b));

            for (let i = 0; i < markPoints.length; i++) {
                let point = markPoints[i];
                let mark = marks[point];
                let item: MarkItem = {point};
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
    }

    markClass(point: number, included: boolean, max: number, min: number) {
        if ((!included && point === max)
            || (included && point <= max && point >= min)) {
            return ` ${prefixCls}-text-active`;
        }

        return '';
    }

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
    markStyle(point: number, options: {
        vertical: boolean;
        reverse: boolean;
        direction: string;
        max: number;
        min: number;
    }) {
        let {vertical, reverse, direction, max, min} = options || {};
        const offset = (point - min) / (max - min) * 100;
        const distance = reverse ? '50%' : '-50%';
        if (vertical) {
            return `margin-${direction}:-50%;${direction}:${offset}%;`;
        }
        return `${direction}: ${offset}%;transform:translateX(${distance});-ms-transform:translateX(${distance})`;
    }

    handleClickLabel(e: MouseEvent, point: number) {
        this.fire('clickLabel', {e, point});
    }
};
