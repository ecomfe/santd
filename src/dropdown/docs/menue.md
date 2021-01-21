<text lang="cn">
#### 多级菜单
传入的菜单里有多个层级。

</text>

```html
<template>
    <div>
        <s-dropdown trigger="hover">
            <s-menu prefixCls="{{prefixCls}}" slot="overlay">
                <s-menu-item key="item-1">2nd menu item</s-menu-item>
                <s-sub-menu title="Sub-Menu" key="sub1">
                    <s-menu-item key="1">3rd menu item</s-menu-item>
                    <s-menu-item key="2">4th menu item</s-menu-item>
                </s-sub-menu>
                <s-sub-menu title="disabled sub menu" disabled="{{true}}" key="sub2">
                    <s-menu-item key="3">5th menu item</s-menu-item>
                    <s-menu-item key="4">6th menu item</s-menu-item>
                </s-sub-menu>
            </s-menu>
            <a href="javascript:;">Cascading menu<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import {Button, Icon, Dropdown, Menu} from 'santd';

export default {
    components: {
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-sub-menu': Menu.Sub
    }
}
</script>
```
