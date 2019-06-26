/**
 * @file Santd slider steps file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';

const calcPoints = (marks, dots, step, min, max) => {
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

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        activeDotStyle: DataTypes.object,
        dotStyle: DataTypes.object,
        min: DataTypes.number,
        max: DataTypes.number,
        upperBound: DataTypes.number,
        lowerBound: DataTypes.number,
        included: DataTypes.bool,
        dots: DataTypes.bool,
        step: DataTypes.number,
        marks: DataTypes.object,
        vertical: DataTypes.bool
    },
    computed: {
        elements() {
            const marks = this.data.get('marks');
            const dots = this.data.get('dots');
            const step = this.data.get('step');
            const min = this.data.get('min');
            const max = this.data.get('max');
            return calcPoints(marks, dots, step, min, max);
        }
    },
    pointClass(point) {
        const included = this.data.get('included');
        const upperBound = this.data.get('upperBound');
        const lowerBound = this.data.get('lowerBound');
        const prefixCls = this.data.get('prefixCls');

        const isActive = (!included && point === upperBound)
            || (included && point <= upperBound && point >= lowerBound);

        return classNames(`${prefixCls}-dot`, {
            [`${prefixCls}-dot-active`]: isActive
        });
    },
    pointStyle(point) {
        const included = this.data.get('included');
        const vertical = this.data.get('vertical');
        const dotStyle = this.data.get('dotStyle') || {};
        const activeDotStyle = this.data.get('activeDotStyle') || {};
        const upperBound = this.data.get('upperBound');
        const lowerBound = this.data.get('lowerBound');
        const max = this.data.get('max');
        const min = this.data.get('min');
        const range = max - min;

        const isActive = (!included && point === upperBound)
            || (included && point <= upperBound && point >= lowerBound);

        const offset = `${Math.abs(point - min) / range * 100}%`;
        let style = vertical ? {bottom: offset, ...dotStyle} : {left: offset, ...dotStyle};
        if (isActive) {
            style = {...style, ...activeDotStyle};
        }
        return style;
    },
    template: `<div class="{{prefixCls}}-step">
        <span
            s-for="point in elements"
            class="pointClass(point)"
            style="pointStyle(point)"
            key="{{point}}"
        />
    </div>`
});
