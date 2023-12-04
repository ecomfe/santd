/**
 * @file 组件 popover
 * @author mayihui@baidu.com
 */

import './style/index';
import * as I from './interface';
import {classCreator} from '../core/util';
import Tooltip from '../tooltip';

const prefixCls = classCreator('popover')();

export default class Popover extends Tooltip {
    static initData(): I.State {
        return {
            ...Tooltip.prototype.initData(),
            transitionName: 'zoom-big',
            prefixCls,
        };
    }

    inited(): void {
        this.data.set('hasTitle', this.data.get('title') || !!this.sourceSlots.named.title);
        this.data.set('hasContent', this.data.get('content') || !!this.sourceSlots.named.content);
    }

    static template: `<span>
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
            style="{{popoverStyle}}"
            action="{{trigger}}"
            visible="{{visible}}"
            s-ref="trigger"
            on-visibleChange="handleVisibleChange"
        >
            <slot />
            <template slot="popup">
                <div class="{{prefixCls}}-arrow"></div>
                <div class="{{prefixCls}}-inner" id="{{id}}" role="popover">
                    <div class="{{prefixCls}}-title" s-if="hasTitle">
                        <slot name="title" s-if="!title" />
                        <template s-else>{{title}}</template>
                    </div>
                    <div class="{{prefixCls}}-inner-content" s-if="hasContent">
                        <slot name="content" s-if="!content" />
                        <template s-else>{{content}}</template>
                    </div>
                </div>
            </template>
        </s-trigger>
    </span>`
};
