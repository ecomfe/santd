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
        <div class="${prefix}-mark">
            <span
                s-for="item in markProp"
                class="{{item.cls}}"
                style="{{item.style}}">{{item.value}}</span>
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
            let marks = this.data.get('marks');
            const points = Object.keys(marks).map(parseFloat).sort((a, b) => a - b).map(key => {
                return {
                    __VALUE__: marks[key],
                    __KEY__: key
                };
            });
            return points;
        },
        markProp() {
            let points = this.data.get('points');
            let min = this.data.get('min');
            let max = this.data.get('max');
            let vertical = this.data.get('vertical');
            let value = this.data.get('value');
            if (!Array.isArray(value)) {
                value = [0, value];
            }
            const range = max - min;
            let marks = points.map(point => {
                let isActive = point.__KEY__ >= value[0] && point.__KEY__ <= value[1];

                const offset = `${Math.abs(point.__KEY__ - min) / range * 100}%`;
                let style = vertical
                    ? `bottom: ${offset};margin-bottom:-50%;`
                    : `left: ${offset};transform:translateX(-50%);width:30%;`;
                let cls = classNames({
                    [`${prefix}-mark-text`]: true,
                    [`${prefix}-mark-text-active`]: isActive
                });
                let markValue = point.__VALUE__;
                // debugger
                if (typeof point.__VALUE__ === 'object') {
                    style = point.__VALUE__.style ? style + point.__VALUE__.style : style;
                    markValue = point.__VALUE__.label;
                }
                return {style, cls, value: markValue};
            });
            return marks;
        }
    }
});