<codebox>
#### 其它元素
分割线和不可用菜单项。

```html
<template>
    <div>
        <s-dropdown>
            <s-menu prefixCls="{{prefixCls}}" slot="overlay">
                <s-menu-item s-for="n,index in data" key="{{index}}">
                    <a href="http://www.baidu.com" target="_blank">{{n}} menu item</a>
                </s-menu-item>
                <s-menu-divider />
                <s-menu-item disabled="{{true}}">3rd menu item（disabled）</s-menu-item>
            </s-menu>
            <a href="javascript:;">Hover me<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import {Icon, Dropdown, Menu} from 'santd';

export default {
    components: {
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-menu-divider': Menu.MenuDivider
    },
    initData() {
        return {
            data: ['1st', '2nd']
        }
    }
}
</script>
```
</codebox>
