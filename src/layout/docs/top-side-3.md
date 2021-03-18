<codebox>
#### 顶部-侧边布局
拥有顶部导航及侧边栏的页面，多用于展示类网站。

```html
<template>
<div>
    <s-layout>
        <s-header class="header">
            <div class="logo"></div>
            <s-menu theme="dark" mode="horizontal" defaultSelectedKeys="{{['1']}}" style="line-height: 64px;">
                <s-menu-item key="1">Nav 1</s-menu-item>
                <s-menu-item key="2">Nav 2</s-menu-item>
                <s-menu-item key="3">Nav 3</s-menu-item>
            </s-menu>
        </s-header>
        <s-content style="padding: 0 50px;">
            <s-breadcrumb style="{{{margin: '16px 0'}}}">
                <s-brcrumbitem href="#">Home</s-brcrumbitem>
                <s-brcrumbitem href="#">List</s-brcrumbitem>
                <s-brcrumbitem>App</s-brcrumbitem>
            </s-breadcrumb>
            <s-layout style="padding: 24px 0; background: #fff;">
                <s-sider width="{{200}}" style="background: #fff">
                <s-menu mode="inline" defaultSelectedKeys="{{['3']}}" defaultOpenKeys="{{['sub1']}}">
                    <s-sub-menu key="sub1">
                        <template slot="title">
                            <s-icon type="form" />
                            <span>Navigation One</span>
                        </template>
                        <s-menu-item key="1">
                            <span>option1</span></s-menu-item>
                        <s-menu-item key="2">
                            <span>option2</span></s-menu-item>
                        <s-menu-item key="3">
                            <span>option3</span></s-menu-item>
                        <s-menu-item key="4">
                            <span>option4</span></s-menu-item>
                    </s-sub-menu>
                    <s-sub-menu key="sub2">
                        <template slot="title">
                            <s-icon type="copy" />
                            <span>Navigation Two</span>
                        </template>
                        <s-menu-item key="5">
                            <span>option5</span></s-menu-item>
                        <s-menu-item key="6">
                            <span>option6</span></s-menu-item>
                        <s-menu-item key="7">
                            <span>option7</span></s-menu-item>
                    </s-sub-menu>
                </s-menu>
                </s-sider>
                <s-content style="padding: 0 24px; min-height: 280px">Content</s-content>
            </s-layout>
        </s-content>
        <s-footer style="text-align: center;">Santd @2019 Created by Baidu</s-footer>
    </s-layout>
</div>
</template>
<script>
import {Layout, Menu, Icon, Breadcrumb} from 'santd';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-sider': Layout.Sider,
        's-footer': Layout.Footer,
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-icon': Icon,
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.Item
    },
    initData(){
        return {
            inlineCollapsed: false
        }
    }
}
</script>
<style>
#components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 28px 16px 0;
    float: left;
}
</style>
```
</codebox>
