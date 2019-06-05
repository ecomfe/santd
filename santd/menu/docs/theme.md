<cn>
#### 主题
内建了两套主题 `light|dark`，默认 `light`
</cn>

```html
<template>
<div>
  <div style="margin: 30px 0;">
      <s-switch on-change='switchChange' defaultChecked />
  </div>
  <div style="width:256px;">
      <s-menu
          style="width: 256px"
          defaultSelectedKeys="{{['1']}}"
          defaultOpenKeys="{{['sub1']}}"
          mode="inline"
          theme="{{theme}}"
          on-click="itemClick"
      >
          <s-sub-menu key="sub1" title="{{subOne}}">
              <s-menu-item-group key="g1" title="Item 1">
                  <s-menu-item key="1">Option 1</s-menu-item>
                  <s-menu-item key="2">Option 2</s-menu-item>
              </s-menu-item-group>
              <s-menu-item-group key="g2" title="Item 2">
                  <s-menu-item key="3">Option 3</s-menu-item>
                  <s-menu-item key="4">Option 4</s-menu-item>
              </s-menu-item-group>
          </s-sub-menu>
          <s-sub-menu key="sub2" title="{{subTwo}}">
              <s-menu-item key="5">Option 5</s-menu-item>
              <s-menu-item key="6">Option 6</s-menu-item>
              <s-sub-menu key="sub3" title="Submenu">
                  <s-menu-item key="7">Option 7</s-menu-item>
                  <s-menu-item key="8">Option 8</s-menu-item>
              </s-sub-menu>
          </s-sub-menu>
          <s-sub-menu key="sub4" title="{{subFour}}">
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
import san from 'san';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import Button from 'santd/button';
import Switch from 'santd/switch';
export default {
    components: {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-icon': Icon,
        's-button': Button,
        's-switch': Switch
    },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    initData () {
      return {
        theme: 'dark',
        collapsed: false,
        subOne: function() {
            return san.defineComponent({
                components: {
                    's-icon': Icon
                },
                template: `
                    <span>
                        <s-icon type="mail"/>
                        <span>Navigation One</span>
                    </span>
                `
            });
        },
        subTwo: function() {
            return san.defineComponent({
                components: {
                    's-icon': Icon
                },
                template: `
                    <span><s-icon type="appstore"/><span> Navigation Two</span></span>
                `
            });
        },
        subFour: function() {
            return san.defineComponent({
                components: {
                    's-icon': Icon
                },
                template: `
                    <span><s-icon type="setting"/><span> Navigation Four</span></span>
                `
            });
        }
      }
    },
    itemClick(val) {
        console.log('选中的值是: ', val);
    },
    switchChange(value) {
        const theme = value ? 'dark' : 'light';
        this.data.set('theme', theme);
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
