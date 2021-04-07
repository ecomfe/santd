<text lang="cn">
#### 主题
内建了两套主题 `light|dark`，默认 `light`
</text>

```html
<template>
<div>
  <div style="margin: 30px 0;">
      <s-switch on-change='handleChangeMode' /> Change mode
      <span class="san-divider" style="margin: 0 1em;" />
      <s-switch on-change='handleChangeTheme' /> Change Theme
  </div>
  <div style="width:256px;">
    <s-menu
        style="width: 256px"
        defaultSelectedKeys="{{'1'}}"
        openKeys="{{['sub1']}}"
        mode="{{mode}}"
        theme="{{theme}}"
        on-click="handleClick"
    >
        <s-menu-item key="1">
            <s-icon type="mail" /> Navigation One
        </s-menu-item>
        <s-menu-item key="2">
            <s-icon type="calendar" /> Navigation Two
        </s-menu-item>
        <s-sub-menu key="sub1">
            <span slot="title">
                <s-icon type="appstore" />
                <span>Navigation Three</span>
            </span>
            <s-menu-item key="3">Option 3</s-menu-item>
            <s-menu-item key="4">Option 4</s-menu-item>
            <s-sub-menu key="sub1-2" title="Submenu">
                <s-menu-item key="5">Option 5</s-menu-item>
                <s-menu-item key="6">Option 6</s-menu-item>
            </s-sub-menu>
        </s-sub-menu>
        <s-sub-menu key="sub2">
            <span slot="title">
                <s-icon type="setting" />
                <span>Navigation Four</span>
            </span>
            <s-menu-item key="7">Option 7</s-menu-item>
            <s-menu-item key="8">Option 8</s-menu-item>
            <s-menu-item key="9">Option 9</s-menu-item>
            <s-menu-item key="10">Option 10</s-menu-item>
        </s-sub-menu>
    </s-menu>
  </div>
</div>
</template>
<script>
import {Menu, Icon, Button, Switch} from 'santd';

export default {
    components: {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-icon': Icon,
        's-switch': Switch
    },
    initData () {
        return {
            theme: 'dark',
            mode: 'inline'
        }
    },
    handleClick(val) {
        console.log('选中的值是: ', val);
    },
    handleChangeMode(value) {
        this.data.set('mode', value ? 'vertical' : 'inline');
    },
    handleChangeTheme(value) {
        this.data.set('theme', value ? 'light' : 'dark');
    }
}
</script>
```
