<codebox>
#### 触发事件
点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

```html
<template>
    <div>
        <s-dropdown>
            <s-menu prefixCls="{{prefixCls}}" slot="overlay" on-click="handleClick">
                <s-menu-item key="1">1st menu item</s-menu-item>
                <s-menu-item key="2">2nd memu item</s-menu-item>
                <s-menu-item key="3">3rd menu item</s-menu-item>
            </s-menu>
            <a href="javascript:;">Hover me, Click menu item<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import {Icon, Dropdown, Menu} from 'santd';
import message from 'santd/es/message';
import 'santd/es/message/style';

export default {
    components: {
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    handleClick({key, value}) {
        message.info(`Click item is: ${key}`);
    }
}
</script>
```
</codebox>
