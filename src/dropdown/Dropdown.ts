/**
* @file Santd dropdown file
* @author mayihui@baidu.com
*/

import {classCreator} from '../core/util';
import {placements} from './placements';
import './style/index';
import ToolTip from '../tooltip';
import {
    DropdownState,
    DropdownComputed as Computed
} from './interface';
import {TDropdownButton} from './DropdownButton';
import {ItemType} from '../menu/interface';

type Message = {
    santd_menu_itemClick: (this: Dropdown, payload: {value: ItemType}) => void;
};

const prefixCls = classCreator('dropdown')();

export default class Dropdown extends ToolTip {
    initData(): DropdownState {
        return {
            ...ToolTip.prototype.initData(),
            builtinPlacements: placements,
            placement: 'bottomLeft',
            mouseEnterDelay: 0.15,
            mouseLeaveDelay: 0.1,
            transitionName: '',
            useDomNodeForce: false
        };
    }

    static Button: TDropdownButton

    static computed: Computed = {
        // 必须扩展Tooltip.computed的已有属性（colorStyle、builtinPlacements、arrowColorStyle）否则报class扩展错误
        colorStyle() {
            return '';
        },
        arrowColorStyle() {
            return '';
        },
        builtinPlacements(this: Dropdown) {
            return this.data.get('builtinPlacements');
        },
        getTransitionName(this: Dropdown) {
            const placement = this.data.get('placement');
            const transitionName = this.data.get('transitionName');
            return transitionName ? transitionName : placement.indexOf('top') >= 0 ? 'slide-down' : 'slide-up';
        }
    };

    static messages: Message = {
        santd_menu_itemClick(_payload) {
            if (!('visible' in this.data.get())) {
                this.data.set('popupVisible', false);
            }
        }
    };

    getRootDomNode(rootDomNode: boolean) {
        const useDomNodeForce = this.data.get('useDomNodeForce');
        return rootDomNode || (!useDomNodeForce && this.el);
    }

    static template = `<span class="${prefixCls}-trigger">
        <s-trigger
            prefixCls="{{prefixCls ? prefixCls : '${prefixCls}'}}"
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
            action="{{action}}"
            showAction="{{showAction}}"
            hideAction="{{hideAction}}"
            visible="{{visible}}"
            popupVisible="{{popupVisible}}"
            on-visibleChange="handleVisibleChange"
            class="{{dropdownClassName}}"
            stretch="{{stretch}}"
            rootDomNode="{{getRootDomNode(rootDomNode)}}"
            s-ref="trigger"
        >
            <slot />
            <template slot="popup">
                <slot name="overlay" var-prefixCls="{{'${prefixCls}'}}" />
            </template>
        </s-trigger>
    </span>`
}
