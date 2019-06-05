<cn>
#### 带下拉框的按钮
左边是按钮，右边是额外的相关功能菜单。
</cn>

```html
<template>
    <div>
        <s-dropdownbutton overlay="{{overlay}}" trigger="click" on-click="handleButtonClick" placement="bottomRight">
            DropDown
        </s-dropdownbutton>
        <s-dropdownbutton overlay="{{overlay}}" trigger="click" disabled>
            DropDown
        </s-dropdownbutton>
        <s-dropdown trigger="click" overlay="{{overlay}}">
            <s-button>DropDown<s-icon type="down" /></s-button>
        </s-dropdown>
    </div>
</template>
<script>
import san from 'san';
import Button from 'santd/button';
import DropDown from 'santd/dropdown';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import message from 'santd/message';

const menu = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    menuClick({key, value}) {
        message.info(`Click item is: ${key}`);
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown" on-click="menuClick">
                <s-menu-item key="1">1st menu item</s-menu-item>
                <s-menu-item key="2">2nd memu item</s-menu-item>
                <s-menu-item key="3">3rd menu item</s-menu-item>
            </s-menu>
        <div>
    `
});

export default {
    components: {
        's-dropdown': DropDown,
        's-dropdownbutton': DropDown.Button,
        's-button': Button,
        's-icon': Icon
    },
    initData() {
        return {
            overlay: menu
        }
    },
    handleButtonClick() {
        message.info('Click on left button.');
    }
}
</script>
```
