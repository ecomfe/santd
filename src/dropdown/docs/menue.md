<text lang="cn">
#### 多级菜单
传入的菜单里有多个层级。

</text>

```html
<template>
  <div>
    <s-dropdown trigger="hover" overlay="{{menu}}">
        <a href="javascript:;">Cascading menu<s-icon type="down" /></a>
    </s-dropdown>
  </div>
</template>
<script>
import san from 'san';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import Button from 'santd/button';
import DropDown from 'santd/dropdown';

const menus = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-sub-menu': Menu.Sub,
        's-icon': Icon
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown">
                <s-menu-item key="item-1">2nd menu item</s-menu-item>
                <s-sub-menu title="Sub-Menu" key="sub1">
                    <s-menu-item key="1">3rd menu item</s-menu-item>
                    <s-menu-item key="2">4th menu item</s-menu-item>
                </s-sub-menu>
                <s-sub-menu title="disabled sub menu" disabled key="sub2">
                    <s-menu-item key="3">5th menu item</s-menu-item>
                    <s-menu-item key="4">6th menu item</s-menu-item>
                </s-sub-menu>
            </s-menu>
        </div>
    `
});

export default {
    components: {
        's-dropdown': DropDown,
        's-icon': Icon,
    },
    initData() {
        return {
            menu: menus
        }
    }
}
</script>
```
