/**
 * @file 组件 tooltip
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import baseTooltip from './src/tooltip';
import getPlacements from './placements';
import inherits from 'santd/core/util/inherits';

const prefixCls = classCreator('tooltip')();

export default inherits(san.defineComponent({
    initData() {
        return {
            prefixCls: prefixCls,
            transitionName: 'zoom-big-fast',
            mouseEnterDelay: 0.1,
            mouseLeaveDelay: 0.1,
            arrowPointAtCenter: false,
            autoAdjustOverflow: true
        };
    },
    inited() {
        /*const title = this.data.get('title');
        console.log(title);
        let tooltipPopup;
        if (typeof title === 'string' || typeof title === 'number') {
            tooltipPopup = san.defineComponent({
                template: `<span>${title}</span>`
            });
        }
        else if (typeof title === 'function') {
            tooltipPopup = title;
        }
        console.log(tooltipPopup);
        this.data.set('tooltipPopup', tooltipPopup);

        this.watch('title', val => {
            console.log(val);
        });*/
    },
    computed: {
        builtinPlacements() {
            const builtinPlacements = this.data.get('placements');
            const arrowPointAtCenter = this.data.get('arrowPointAtCenter');
            const autoAdjustOverflow = this.data.get('autoAdjustOverflow');

            return builtinPlacements || getPlacements({
                arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow
            });
        },
        tooltipPopup() {
            const title = this.data.get('title');
            if (typeof title === 'string' || typeof title === 'number') {
                return san.defineComponent({
                    template: '<span>{{title}}</span>'
                });
            }
            else if (typeof title === 'function') {
                return title;
            }
        },
        popupPlacement() {
            return this.data.get('placement') || 'top';
        },
        popupVisible() {
            return this.data.get('visible') || this.data.get('defaultVisible') || false;
        },
        popupClassName() {
            return this.data.get('overlayClassName');
        },
        popupStyle() {
            return this.data.get('overlayStyle');
        },
        getTransitionName() {
            const transitionName = this.data.get('transitionName');
            return transitionName;
        }
    }
}), baseTooltip);
