/**
 * @file 组件 popconfirm
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';
import Button from '../button';
import Icon from '../icon';
import localeReceiver from '../locale-provider/receiver';
import type * as I from './interface';

const prefixCls = classCreator('popover')();

export default class Popconfirm extends Tooltip {
    initData(): I.State {
        return {
            ...Tooltip.prototype.initData(),
            componentName: 'Popconfirm',
            transitionName: 'zoom-big',
            trigger: 'click',
            okType: 'primary'
        };
    };

    inited(): void {
        localeReceiver.inited.call(this);
        this.data.set('hasIcon', !!this.sourceSlots.named.icon);
    };

    static computed: I.Computed = {
        ...localeReceiver.computed,
        ...Tooltip.computed
    };

    static components = {
        ...Tooltip.components,
        's-button': Button,
        's-icon': Icon
    };

    handleCancel(e: Event): void {
        this.fire('cancel', e);
        this.close(e);
    };

    handleConfirm(e: Event): void {
        this.fire('confirm', e);
        this.close(e);
    };

    close(e: Event): void {
        type Popconfirm = InstanceType<typeof Popconfirm>;
        this.ref<Popconfirm>('trigger').close(e);
    };

    static template = /* html */ `
        <span>
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
        </span>
    `;
};