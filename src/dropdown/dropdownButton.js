/**
* @file DropdownButton button按钮控制dropdown
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import Dropdown from './dropdown';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Button from '../button';
const prefixCls = classCreator('dropdown-button')();

export default san.defineComponent({
    dataTypes: {
        type: DataTypes.string,
        htmlType: DataTypes.string,
        disabled: DataTypes.bool,
        icon: DataTypes.string,
        href: DataTypes.string
    },
    components: {
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-button': Button,
        's-button-group': Button.Group
    },
    handleLeftButton(e) {
        e.stopPropagation();
        this.fire('click', e);
    },
    handleVisibleChange(value) {
        this.fire('visibleChange', value);
    },

    template: `
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
});
