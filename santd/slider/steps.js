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

const cc = classCreator('slider');
const prefix = cc();

export default san.defineComponent({
    template: `
        <div class="${prefix}-step">
            <span
                s-for="item in stepProp"
                class="{{item.cls}}"
                style="{{item.style}}">
            </span>
        </div>
    `,
    initData() {
        return {
            min: 0,
            max: 100,
            step: 1,
            marks: {},
            vertical: false
        };
    },
    computed: {
        points() {
            let min = this.data.get('min');
            let max = this.data.get('max');
            let step = this.data.get('step');
            let marks = this.data.get('marks');
            const points = Object.keys(marks).map(parseFloat).sort((a, b) => a - b);
            // for (let i = min; i <= max; i += step) {
            //     if (points.indexOf(i) === -1) {
            //         points.push(i);
            //     }
            // }
            return points;
        },
        stepProp() {
            let points = this.data.get('points');
            let min = this.data.get('min');
            let max = this.data.get('max');
            let vertical = this.data.get('vertical');
            let value = this.data.get('value');
            if (!Array.isArray(value)) {
                value = [0, value];
            }
            const range = max - min;
            let steps = points.map(point => {
                let isActive = point >= value[0] && point <= value[1];
                const offset = `${Math.abs(point - min) / range * 100}%`;
                let style = vertical ? `bottom: ${offset}` : `left: ${offset}`;
                let cls = classNames({
                    [`${prefix}-dot`]: true,
                    [`${prefix}-dot-active`]: isActive
                });
                return {style, cls};
            });
            return steps;
        }
    }
});