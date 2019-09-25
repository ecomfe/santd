<text lang="cn">
#### 带下拉框的按钮
左边是按钮，右边是额外的相关功能菜单。
</text>

```html
<template>
    <div>
        <s-dropdownbutton trigger="click" on-click="handleButtonClick" placement="bottomRight">
            <s-menu prefixCls="{{prefixCls}}" on-click="handleMenuClick" slot="overlay">
                <s-menu-item key="1">1st menu item</s-menu-item>
                <s-menu-item key="2">2nd memu item</s-menu-item>
                <s-menu-item key="3">3rd menu item</s-menu-item>
            </s-menu>
            DropDown
        </s-dropdownbutton>
        <s-dropdownbutton trigger="click" disabled>
            <s-menu prefixCls="{{prefixCls}}" slot="overlay">
                <s-menu-item key="1">1st menu item</s-menu-item>
                <s-menu-item key="2">2nd memu item</s-menu-item>
                <s-menu-item key="3">3rd menu item</s-menu-item>
            </s-menu>
            DropDown
        </s-dropdownbutton>
        <s-dropdown trigger="click">
            <s-menu prefixCls="{{prefixCls}}" on-click="handleMenuClick" slot="overlay">
                <s-menu-item key="1">1st menu item</s-menu-item>
                <s-menu-item key="2">2nd memu item</s-menu-item>
                <s-menu-item key="3">3rd menu item</s-menu-item>
            </s-menu>
            <s-button>DropDown <s-icon type="down" /></s-button>
        </s-dropdown>
    </div>
</template>
<script>
import Button from 'santd/button';
import DropDown from 'santd/dropdown';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import message from 'santd/message';

export default {
    components: {
        's-dropdown': DropDown,
        's-dropdownbutton': DropDown.Button,
        's-button': Button,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    handleButtonClick() {
        message.info('Click on left button.');
    },
    handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }
}
</script>
```
