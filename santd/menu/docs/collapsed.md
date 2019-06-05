<cn>
#### 缩起内嵌菜单
内嵌菜单可以被缩起/展开。

你可以在 Layout 里查看侧边布局结合的完整示例。
</cn>


```html
<template>
  <div style="width: 256px;">
    <s-button type="primary" on-click="toggleCollapsed" style="margin-bottom: 16px">
      <s-icon type="menu-fold" />
    </s-button>
    <s-menu
        mode="inline"
        theme="light"
        inlineCollapsed="{{inlineCollapsed}}"
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
</template>
<script>
import san from 'san';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import Button from 'santd/button';
export default {
    components: {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-menu-item-group': Menu.MenuItemGroup,
        's-icon': Icon,
        's-button': Button
    },
    toggleCollapsed () {
        this.data.set('inlineCollapsed', !this.data.get('inlineCollapsed'));
    },
    initData () {
      return {
        inlineCollapsed: false,
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
