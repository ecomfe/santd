/**
 * @file 组件 tooltip
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import './style/index.less';
import Base from 'santd/base';
import Trigger from '../core/trigger';
import {placements, colorList} from './placements';
import {classCreator} from '../core/util';
import {getPlacements} from './util';
import type * as I from './interface';

const prefixCls = classCreator('tooltip')();

export default class ToolTip extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <span>
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
        </span>
    `;

    static components = {
        's-trigger': Trigger
    };

    static computed: I.Computed = {
        builtinPlacements(this: ToolTip) {
            const arrowPointAtCenter = this.data.get('arrowPointAtCenter');
            const autoAdjustOverflow = this.data.get('autoAdjustOverflow');
            return getPlacements({
                arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow
            });
        },
        colorStyle(this: ToolTip) {
            const color = this.data.get('color');
            if (color) {
                let bgColor = colorList[color] ? colorList[color] : color;
                return { 'background-color': bgColor };
            }
            return '';
        },
        arrowColorStyle(this: ToolTip) {
            const color = this.data.get('color');
            const placement = this.data.get('placement');
            const direction = placements[placement].direction;

            if (color && placement) {
                let bgColor = colorList[color] ? colorList[color] : color;
                return { [`border-${direction}-color`]: bgColor };
            }
            return '';
        },
    };

    handleVisibleChange(visible: boolean): void {
        this.fire('visibleChange', visible);
    };

    refresh(): void {
        type ToolTipCtx = InstanceType<typeof ToolTip>;
        this.ref<ToolTipCtx>('trigger').refresh();
    };

    initData(): I.State {
        return {
            mouseEnterDelay: 0.1,
            destroyTooltipOnHide: false,
            mouseLeaveDelay: 0.1,
            popupAlign: {},
            builtinPlacements: placements,
            trigger: 'hover',
            placement: 'top',
            transitionName: 'zoom-big-fast',
            arrowPointAtCenter: false,
            autoAdjustOverflow: true,
            useDomNodeForce: false,
            color: ''
        };
    };
};