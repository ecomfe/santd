/**
 * @file 组件 popconfirm
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index';
import san from 'san';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';
import Button from '../button';
import Icon from '../icon';
import localeReceiver from '../localeprovider/receiver';

const prefixCls = classCreator('popover')();


export default san.defineComponent({
    initData() {
        return {
            ...Tooltip.prototype.initData(),
            componentName: 'Popconfirm',
            transitionName: 'zoom-big',
            trigger: 'click',
            okType: 'primary'
        };
    },

    inited() {
        localeReceiver.inited.call(this);
        this.data.set('hasIcon', !!this.sourceSlots.named.icon);
    },

    computed: {
        ...localeReceiver.computed,
        ...Tooltip.prototype.computed
    },

    components: {
        ...Tooltip.prototype.components,
        's-button': Button,
        's-icon': Icon
    },

    handleCancel(e) {
        this.fire('cancel', e);
        this.close(e);
    },

    handleConfirm(e) {
        this.fire('confirm', e);
        this.close(e);
    },

    close(e) {
        this.ref('trigger').close(e);
    },

    template: `<span>
        <s-trigger
            prefixCls="${prefixCls}"
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
            s-ref="trigger"
        >
            <slot />
            <template slot="popup">
                <div class="${prefixCls}-arrow"></div>
                <div class="${prefixCls}-inner" id="{{id}}" role="popconfirm">
                    <div class="${prefixCls}-inner-content">
                            <div class="${prefixCls}-message">
                                <slot name="icon" s-if="hasIcon" />
                                <s-icon type="{{icon || 'exclamation-circle'}}" theme="filled" s-else />
                                <div class="${prefixCls}-message-title">
                                    <slot name="title" s-if="!title" />
                                    <template s-else>{{title}}</template>
                                </div>
                            </div>
                            <div class="${prefixCls}-buttons">
                                <s-button on-click="handleCancel" size="small" noWave>
                                    {{cancelText || locale.cancelText}}
                                </s-button>
                                <s-button on-click="handleConfirm" type="{{okType}}" size="small" noWave>
                                    {{okText || locale.okText}}
                                </s-button>
                            </div>
                    </div>
                </div>
            </template>
        </s-trigger>
    </span>`
}, Tooltip);