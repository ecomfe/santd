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
    computed: {
        classes() {
            const className = this.data.get('className');
            return [prefixCls, className];
        }
    },
    template: `
        <span>
            <s-button-group class="{{classes}}" size="{{size}}">
                <s-button
                    on-click="handleLeftButton"
                    disabled="{{disabled}}"
                    htmlType="{{htmlType}}"
                    href="{{href}}"
                ><slot/></s-button>
                <s-dropdown
                    align="{{align}}"
                    overlay="{{overlay}}"
                    disabled="{{disabled}}"
                    trigger="{{disabled ? [] : trigger}}"
                    placement="{{placement}}"
                    getPopupContainer="{{getPopupContainer}}"
                    on-visibleChange="handleVisibleChange"
                >
                    <s-button disabled="{{disabled}}">
                        <s-icon type="{{type || 'ellipsis'}}"></s-icon>
                    </s-button>
                </s-dropdown>
            </s-button-group>
        </span>
    `
});
