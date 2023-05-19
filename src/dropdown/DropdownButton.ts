/**
* @file DropdownButton button按钮控制dropdown
* @author fuqiangqiang@baidu.com
*/
import Base from 'santd/base';
import Dropdown from './Dropdown';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Button from '../button';
import {DropdownButtonProps as Props} from './interface';

const prefixCls = classCreator('dropdown-button')();

export default class DropdownButton extends Base<{}, Props, {}> {
    static components = {
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-button': Button,
        's-button-group': Button.Group
    }

    handleLeftButton(e: MouseEvent) {
        e.stopPropagation();
        this.fire('click', e);
    }

    handleVisibleChange(value: boolean) {
        this.fire('visibleChange', value);
    }

    static template = /* html */ `
        <span>
            <s-button-group class="${prefixCls}" size="{{size}}">
                <s-button
                    on-click="handleLeftButton"
                    disabled="{{disabled}}"
                    htmlType="{{htmlType}}"
                    href="{{href}}"
                ><slot /></s-button>
                <s-dropdown
                    align="{{align}}"
                    disabled="{{disabled}}"
                    trigger="{{disabled ? [] : trigger}}"
                    placement="{{placement}}"
                    getPopupContainer="{{getPopupContainer}}"
                    on-visibleChange="handleVisibleChange"
                    style="display:inline-block;"
                >
                    <slot slot="overlay" var-prefixCls="{{prefixCls}}" name="overlay" />
                    <s-button disabled="{{disabled}}"><s-icon type="{{type || 'ellipsis'}}" /></s-button>
                </s-dropdown>
            </s-button-group>
        </span>
    `
};

export type TDropdownButton = typeof DropdownButton;
