<text lang="cn">
#### 只展开当前父级菜单
点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
</text>

```html
<template>
  <div style="width:256px;">
    <s-menu
        style="width: 256px"
        openKeys="{{openKeys}}"
        mode="inline"
        on-openChange="handleOpenChange"
    >
        <s-sub-menu key="sub1">
            <span slot="title">
                <s-icon type="mail" />
                <span>Navigation One</span>
            </span>
            <s-menu-item key="1">Option 1</s-menu-item>
            <s-menu-item key="2">Option 2</s-menu-item>
            <s-menu-item key="3">Option 3</s-menu-item>
            <s-menu-item key="4">Option 4</s-menu-item>
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
</template>
<script>
import {Menu, Icon} from 'santd';

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
            rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
            openKeys: ['sub1']
        };
    },
    handleOpenChange({openKeys, prevOpenKeys}) {
        const latestOpenKey = openKeys.find(key => prevOpenKeys.indexOf(key) === -1);
        if (this.data.get('rootSubmenuKeys').indexOf(latestOpenKey) === -1) {
            this.data.set('openKeys', openKeys);
        } else {
            this.data.set('openKeys', latestOpenKey ? [latestOpenKey] : []);
        }
    }
}
</script>
```
