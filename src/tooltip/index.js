/**
 * @file 组件 tooltip
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import './style/index.less';
import san from 'san';
import Trigger from '../core/trigger';
import Placements from './placements';
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
            useDomNodeForce: false
        };
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
                <div class="${prefixCls}-arrow"></div>
                <div class="${prefixCls}-inner" id="{{id}}" role="tooltip">
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                </div>
            </template>
        </s-trigger>
    </span>`
});
