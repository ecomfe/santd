/**
* @file Santd dropdown file
* @author mayihui@baidu.com
*/

import san from 'san';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';
import Placement from './placements';
import './style/index';

const prefixCls = classCreator('dropdown')();

export default san.defineComponent({
    initData() {
        return {
            ...Tooltip.prototype.initData(),
            builtinPlacements: Placement,
            placement: 'bottomLeft',
            mouseEnterDelay: 0.15,
            mouseLeaveDelay: 0.1,
            transitionName: ''
        };
    },

    computed: {
        getTransitionName() {
            const placement = this.data.get('placement');
            const transitionName = this.data.get('transitionName');
            return transitionName ? transitionName : placement.indexOf('top') >= 0 ? 'slide-down' : 'slide-up';
        }
    },

    template: `<span>
        <s-trigger
            prefixCls="${prefixCls}"
            action="{{action}}"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{placement}}"
            popupAlign="{{popupAlign}}"
            popupTransitionName="{{getTransitionName}}"
            defaultPopupVisible="{{defaultVisible}}"
            getPopupContainer="{{getPopupContainer}}"
            mouseEnterDelay="{{mouseEnterDelay}}"
            mouseLeaveDelay="{{mouseLeaveDelay}}"
            popupClassName="{{overlayClassName}}"
            popupStyle="{{overlayStyle}}"
            action="{{disabled ? [] : trigger}}"
            visible="{{visible}}"
            on-visibleChange="handleVisibleChange"
            class="{{dropdownClassName}}"
        >
            <slot />
            <template slot="popup">
                <slot name="overlay" var-prefixCls="{{'${prefixCls}'}}" />
            </template>
        </s-trigger>
    </span>`
}, Tooltip);
