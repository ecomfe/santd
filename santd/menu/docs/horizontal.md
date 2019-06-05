<cn>
#### 顶部导航
水平的顶部导航菜单。
</cn>

```html
<template>
  <div>
    <s-menu
        mode="horizontal"
        theme="light"
        defaultSelectedKeys="{{['1']}}"
        inlineCollapsed="{{false}}"
        on-click="itemClick"
    >
        <s-menu-item key="1">
            <s-icon type="copy"></s-icon>
             <span>Navigation One</span>
        </s-menu-item>
        <s-menu-item key="2">
            <s-icon type="diff"></s-icon>
            <span>Navigation Two</span>
        </s-menu-item>
        <s-sub-menu key="sub1" title="{{subOne}}">
            <s-menu-item key="4">
                <s-icon type="file"></s-icon>
                <span>小标题四</span>
            </s-menu-item>
            <s-menu-item key="5">
                <s-icon type="retweet"></s-icon>
                <span>小标题五</span>
            </s-menu-item>
        </s-sub-menu>
        <s-menu-item key="6">
            <span>Navigation Four-Link</span>
        </s-menu-item>
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
        's-icon': Icon
    },
    initData () {
      return {
          subOne: function() {
              return san.defineComponent({
                  components: {
                      's-icon': Icon
                  },
                  template: `
                      <span>
                          <s-icon type="setting"/>
                          <span>Navigation Tree-submenu</span>
                      </span>
                  `
              });
          },
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
