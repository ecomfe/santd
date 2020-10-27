/**
 * @file 组件 tooltip
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import './style/index.less';
import san from 'san';
import Trigger from '../core/trigger';
import Placements, {colorList} from './placements';
import {classCreator} from '../core/util';
import {getPlacements} from './util';

const prefixCls = classCreator('tooltip')();

export default san.defineComponent({
    initData() {
        return {
            mouseEnterDelay: 0.1,
            destroyTooltipOnHide: false,
            mouseLeaveDelay: 0.1,
            popupAlign: {},
            builtinPlacements: Placements,
            trigger: 'hover',
            placement: 'top',
            transitionName: 'zoom-big-fast',
            arrowPointAtCenter: false,
            autoAdjustOverflow: true,
            useDomNodeForce: false,
            color: ''
        };
    },

    computed: {
        builtinPlacements() {
            const arrowPointAtCenter = this.data.get('arrowPointAtCenter');
            const autoAdjustOverflow = this.data.get('autoAdjustOverflow');
            return getPlacements({
                arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow
            });
        },
        colorStyle() {
            const color = this.data.get('color');
            if (color) {
                let bgColor = colorList[color] ? colorList[color] : color;
                return {'background-color': bgColor};
            }
            return '';
        },
        arrowColorStyle() {
            const color = this.data.get('color');
            const placement = this.data.get('placement');
            const direction = Placements[placement].direction;

            if (color && placement) {
                let bgColor = colorList[color] ? colorList[color] : color;
                return {[`border-${direction}-color`]: bgColor};
            }
            return '';
        }
    },

    components: {
        's-trigger': Trigger
    },

    handleVisibleChange(visible) {
        this.fire('visibleChange', visible);
    },

    refresh() {
        this.ref('trigger').refresh();
    },

    template: `<span>
        <s-trigger
            prefixCls="${prefixCls}"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{placement}}"
            popupAlign="{{popupAlign}}"
            popupTransitionName="{{transitionName}}"
            defaultPopupVisible="{{defaultVisible}}"
            getPopupContainer="{{getPopupContainer}}"
            mouseEnterDelay="{{mouseEnterDelay}}"
            mouseLeaveDelay="{{mouseLeaveDelay}}"
            popupClassName="{{overlayClassName}}"
            popupStyle="{{overlayStyle}}"
            rootDomNode="{{rootDomNode}}"
            useDomNodeForce="{{useDomNodeForce}}"
            style="{{tooltipStyle}}"
            action="{{trigger}}"
            visible="{{visible}}"
            on-visibleChange="handleVisibleChange"
            s-ref="trigger"
        >
            <slot />
            <template slot="popup">
                <div class="${prefixCls}-arrow" style="{{arrowColorStyle}}"></div>
                <div class="${prefixCls}-inner" style="{{colorStyle}}" id="{{id}}" role="tooltip">
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                </div>
            </template>
        </s-trigger>
    </span>`
});
