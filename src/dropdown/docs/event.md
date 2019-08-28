<text lang="cn">
#### 触发事件
点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。
</text>

```html
<template>
    <div>
        <s-dropdown overlay="{{menu}}">
            <a href="javascript:;">Hover me, Click menu item<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import san from 'san';
import Icon from 'santd/icon';
import DropDown from 'santd/dropdown';
import Menu from 'santd/menu';
import message from 'santd/message'

const menu = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    handleClick({key, value}) {
        message.info(`Click item is: ${key}`);
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown" on-click="handleClick">
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
        's-icon': Icon
    },
    initData() {
        return {
            menu: menu
        }
    }
}
</script>
```
