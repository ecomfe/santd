<text lang="cn">
#### 主题
内建了两套主题 `light|dark`，默认 `light`
</text>

```html
<template>
<div>
  <div style="margin: 30px 0;">
      <s-switch on-change='switchChange' defaultChecked="{{true}}">
        <template slot='checkedChildren'>Dark</template>
        <template slot='unCheckedChildren'>Light</template>
      </s-switch>
  </div>
  <div style="width:256px;">
    <s-menu
        style="width: 256px"
        defaultSelectedKeys="{{['1']}}"
        openKeys="{{['sub1']}}"
        mode="inline"
        theme="{{theme}}"
        on-click="handleClick"
    >
        <s-sub-menu key="sub1">
            <span slot="title">
                <s-icon type="mail" />
                <span>Navigation One</span>
            </span>
            <s-menu-item-group key="g1" title="Item 1">
                <s-menu-item key="1">Option 1</s-menu-item>
                <s-menu-item key="2">Option 2</s-menu-item>
            </s-menu-item-group>
            <s-menu-item-group key="g2" title="Item 2">
                <s-menu-item key="3">Option 3</s-menu-item>
                <s-menu-item key="4">Option 4</s-menu-item>
            </s-menu-item>
        </s-sub-menu>
        <s-sub-menu key="sub2">
            <span slot="title">
                <s-icon type="appstore" />
                <span>Navigation Two</span>
            </span>
            <s-menu-item key="5">Option 5</s-menu-item>
            <s-menu-item key="6">Option 6</s-menu-item>
            <s-sub-menu key="sub3" title="Submenu">
                <s-menu-item key="7">Option 7</s-menu-item>
                <s-menu-item key="8">Option 8</s-menu-item>
            </s-sub-menu>
        </s-sub-menu>
        <s-sub-menu key="sub4">
            <span slot="title">
                <s-icon type="setting" />
                <span>Navigation Three</span>
            </span>
            <s-menu-item key="9">Option 9</s-menu-item>
            <s-menu-item key="10">Option 10</s-menu-item>
            <s-menu-item key="11">Option 11</s-menu-item>
            <s-menu-item key="12">Option 12</s-menu-item>
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
        }
    },
    handleClick(val) {
        console.log('选中的值是: ', val);
    },
    switchChange(value) {
        const theme = value ? 'dark' : 'light';
        this.data.set('theme', theme);
    }
}
</script>
```
