/**
 * @file Santd slider track file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('slider-track')();

export default san.defineComponent({
    dataTypes: {
        length: DataTypes.number,
        offset: DataTypes.number,
        vertical: DataTypes.bool
    },

    computed: {
        bodyStyle() {
            const vertical = this.data.get('vertical');
            const offset = this.data.get('offset');
            const length = this.data.get('length');

            return vertical 
                ? `bottom: ${offset}%; height: ${length}%`
                : `left: ${offset}%; width: ${length}%`;
        }
    },

    template: `<div class="${prefixCls}{{index ? ' ${prefixCls}' + index : ''}}" style="{{bodyStyle}}"></div>`
});