/**
 * @file 组件 tooltip
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import BaseTooltip from './src/tooltip';
import getPlacements from './placements';

const prefixCls = classCreator('tooltip')();

export default san.defineComponent({
    initData() {
        return {
            ...BaseTooltip.prototype.initData(),
            prefixCls,
            transitionName: 'zoom-big-fast',
            mouseEnterDelay: 0.1,
            mouseLeaveDelay: 0.1,
            arrowPointAtCenter: false,
            autoAdjustOverflow: true
        };
    },

    computed: {
        ...BaseTooltip.prototype.computed,
        builtinPlacements() {
            const builtinPlacements = this.data.get('placements');
            const arrowPointAtCenter = this.data.get('arrowPointAtCenter');
            const autoAdjustOverflow = this.data.get('autoAdjustOverflow');

            return builtinPlacements || getPlacements({
                arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow
            });
        }
    }
}, BaseTooltip);
