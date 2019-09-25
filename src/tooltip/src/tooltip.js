/**
 * @file Santd tooltip file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Trigger from '../../core/trigger';
import Placement from './placements';

export default san.defineComponent({
    initData() {
        return {
            mouseEnterDelay: 0,
            destroyTooltipOnHide: false,
            mouseLeaveDelay: 0.1,
            popupAlign: {},
            builtinPlacements: Placement,
            action: ['hover'],
            placement: 'top'
        };
    },


    components: {
        's-trigger': Trigger
    },

    handleVisibleChange(visible) {
        this.fire('visibleChange', visible);
    },

    template: `<span>
        <s-trigger
            prefixCls="{{prefixCls}}"
            action="{{action}}"
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
            action="{{trigger}}"
            visible="{{visible}}"
            on-visibleChange="handleVisibleChange"
        >
            <slot />
            <template slot="popup">
                <div class="{{prefixCls}}-arrow"></div>
                <div class="{{prefixCls}}-inner" id="{{id}}" role="tooltip">
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                    <!--<div class="{{prefixCls}}-title" s-if="hasTitle">
                        <slot name="title" s-if="!title" />
                        <template s-else>{{title}}</template>
                    </div>
                    <div class="{{prefixCls}}-inner-content" s-if="hasContent">
                        <slot name="content" s-if="!content" />
                        <template s-else>{{content}}</template>
                    </div>-->
                </div>
            </template>
        </s-trigger>
    </span>`
});
