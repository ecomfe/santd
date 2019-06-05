<cn>
#### 上中下布局
最基本的『上-中-下』布局。
一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。
</cn>

```html
<template>
<div>
    <s-layout className="layout">
        <s-header>
        <div className="logo" />
        <s-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys="{{['1']}}"
            style="line-height: 64px;"
        >
            <s-menuitem key="1">nav 1</s-menuitem>
            <s-menuitem key="2">nav 2</s-menuitem>
            <s-menuitem key="3">nav 3</s-menuitem>
        </s-menu>
        </s-header>
        <s-content style="padding: 0 50px;">
            <s-breadcrumb separator="/" style="margin: 16px 0">
                <s-brcrumbitem href="www.baidu.com">Home</s-brcrumbitem>
                <s-brcrumbitem href="#">List</s-brcrumbitem>
                <s-brcrumbitem>App</s-brcrumbitem>
            </s-breadcrumb>
            <div style="background: #fff; padding: 24px; min-height: 280px">Content</div>
        </s-content>
        <s-footer style="text-align: center">Santd ©2018 Created by Baidu</s-footer>
    </s-layout>
</div>
</template>

<script>
import Layout from 'santd/layout';
import Menu from 'santd/menu';
import Breadcrumb from 'santd/breadcrumb';

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
#components-layout-demo-top .logo {
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 24px 16px 0;
    float: left;
}
</style>
```
