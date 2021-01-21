<text lang="cn">
#### 固定头部
一般用于固定顶部导航，方便页面切换。
</text>

```html
<template>
<div>
    <s-layout class="layout">
        <s-header style="{{{position: 'fixed', 'z-index': 1, width: '100%'}}}">
        <div class="logo" />
        <s-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys="{{['2']}}"
            style="line-height: 64px;"
        >
            <s-menuitem key="1">nav 1</s-menuitem>
            <s-menuitem key="2">nav 2</s-menuitem>
            <s-menuitem key="3">nav 3</s-menuitem>
        </s-menu>
        </s-header>
        <s-content style="padding: 0 50px; margin-top: 64px;">
            <s-breadcrumb separator="/" style="margin: 16px 0">
                <s-brcrumbitem href="www.baidu.com">Home</s-brcrumbitem>
                <s-brcrumbitem href="#">List</s-brcrumbitem>
                <s-brcrumbitem>App</s-brcrumbitem>
            </s-breadcrumb>
            <div style="background: #fff; padding: 24px; min-height: 380px">Content</div>
        </s-content>
        <s-footer style="text-align: center">Santd ©2018 Created by Baidu</s-footer>
    </s-layout>
</div>
</template>

<script>
import {Layout, Menu, Breadcrumb} from 'santd';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-footer': Layout.Footer,
        's-menu': Menu,
        's-menuitem': Menu.Item,
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.BrcrumbItem
    }
}
</script>
<style>
#components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 24px 16px 0;
    float: left;
}
</style>
```
