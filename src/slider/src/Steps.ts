/**
 * @file Santd slider steps file
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../../core/util';
import Base from 'santd/base';;
import {Mark} from '../interface';

const prefixCls = classCreator('slider-step')();

const calcPoints = (marks: Mark, dots: boolean, step: number, min: number, max: number) => {
    const points = Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
    if (dots && step) {
        for (let i = min; i <= max; i += step) {
            if (points.indexOf(i) === -1) {
                points.push(i);
            }
        }
    }
    return points;
};

export default class Step extends Base {
    static template = `<div class="${prefixCls}">
        <span
            s-for="point in points"
            class="{{pointClass(point)}}"
            style="{{pointStyle(point)}}"
        />
    </div>`
    static computed = {
        points(this: Step) {
            const marks = this.data.get('marks');
            const dots = this.data.get('dots');
            const step = this.data.get('step');
            const min = this.data.get('min');
            const max = this.data.get('max');
            return calcPoints(marks, dots, step, min, max);
        }
    }
    pointClass(point: number) {
        const included = this.data.get('included');
        const max = this.data.get('max');
        const min = this.data.get('min');

        const isActive = (!included && point === max)
            || (included && point <= max && point >= min);

        let classArr = [`${prefixCls}-dot`];
        isActive && classArr.push(`${prefixCls}-dot-active`);
        return classArr;
    }
    pointStyle(point: number) {
        const included = this.data.get('included');
        const vertical = this.data.get('vertical');
        const dotStyle = this.data.get('dotStyle') || {};
        const activeDotStyle = this.data.get('activeDotStyle') || {};
        const max = this.data.get('max');
        const min = this.data.get('min');
        const range = max - min;

        const isActive = (!included && point === max)
            || (included && point <= max && point >= min);

        const offset = `${Math.abs(point - min) / range * 100}%`;
        let style = vertical ? {bottom: offset, ...dotStyle} : {left: offset, ...dotStyle};
        if (isActive) {
            style = {...style, ...activeDotStyle};
        }
        return style;
    }
};