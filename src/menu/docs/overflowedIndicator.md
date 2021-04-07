<text lang="cn">
#### 折叠图标
自定义 Menu 折叠时的图标。
</text>

```html
<template>
  <div>
    <s-menu mode="horizontal" on-click="handleClick" selectedKeys="{{[current]}}">
        <s-menu-item key="mail">
            <s-icon type="mail" /> Navigation One
        </s-menu-item>
        <s-menu-item key="app" disabled="{{true}}">
            <s-icon type="appstore" /> Navigation Two
        </s-menu-item>
        <s-sub-menu>
            <span class="submenu-title-wrapper" slot="title">
                <s-icon type="setting" />Navigation Three - Submenu
            </span>
            <s-menu-item-group title="Item 1">
                <s-menu-item key="setting1">Option 1</s-menu-item>
                <s-menu-item key="setting2">Option 2</s-menu-item>
            </s-menu-item-group>
            <s-menu-item-group title="Item 2">
                <s-menu-item key="setting3">Option 3</s-menu-item>
                <s-menu-item key="setting4">Option 4</s-menu-item>
            </s-menu-item-group>
        </s-sub-menu>
        <s-menu-item key="link1">
            <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </s-menu-item>
        <s-menu-item key="link2">
            <a href="https://github.com/ecomfe/santd" target="_blank" rel="noopener noreferrer">Navigation Five - Link</a>
        </s-menu-item>
        <s-icon slot="overflowedIndicator" type="more"></s-icon>
    </s-menu>
  </div>
</template>
<script>
import {Menu, Icon, Button} from 'santd';

export default {
    components: {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-menu-item-group': Menu.MenuItemGroup,
        's-icon': Icon
    },
    initData() {
        return {
            current: 'mail'
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.data.set('current', e.key);
    }

}
</script>
<style type="text/css">
ul {
    list-style: none;
}
.markdown ul li {
  margin: 0;
  padding: 0;
  list-style-type: inherit !important;
}
</style>
```
