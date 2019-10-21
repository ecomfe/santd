<text lang="cn">
#### 响应式布局
Layout.Sider 支持响应式布局。
> 说明：配置 `breakpoint` 属性即生效，视窗宽度小于 `breakpoint` 时 Sider 缩小为 `collapsedWidth` 宽度，若将 `collapsedWidth` 设置为零，会出现特殊 trigger。

</text>

```html
<template>
<div>
    <s-layout>
        <s-sider breakpoint="lg" collapsedWidth="0" on-collapse="handleCollapse">
            <div class="logo" />
            <s-menu theme="dark" mode="inline" defaultSelectedKeys="{{['3']}}">
                <s-submenu key="sub1">
                    <template slot="title">
                        <s-icon type="form" />
                        <span>Navigation One</span>
                    </template>
                    <s-menuitem key="1"><span>option1</span></s-menuitem>
                    <s-menuitem key="2"><span>option2</span></s-menuitem>
                    <s-menuitem key="3"><span>option3</span></s-menuitem>
                    <s-menuitem key="4"><span>option4</span></s-menuitem>
                </s-submenu>
                <s-submenu key="sub2">
                    <template slot="title">
                        <s-icon type="copy" />
                        <span>Navigation Two</span>
                    </template>
                    <s-menuitem key="5"><span>option5</span></s-menuitem>
                    <s-menuitem key="6"><span>option6</span></s-menuitem>
                    <s-menuitem key="7"><span>option7</span></s-menuitem>
                </s-submenu>
            </s-menu>
        </s-sider>
        <s-layout>
            <s-header style="background: #fff; padding: 0" />
            <s-content style="{{{ margin: '24px 16px 0' }}}">
                <div style="padding: 24px; background: #fff; min-height: 360px">content</div></s-content>
            <s-footer style="text-align: center">Santd ©2018 Created by Baidu</s-footer></s-layout>
    </s-layout>
</div>
</template>

<script>
import Layout from 'santd/layout';
import Menu from 'santd/menu';
import Icon from 'santd/icon';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-sider': Layout.Sider,
        's-footer': Layout.Footer,
        's-menu': Menu,
        's-submenu': Menu.Sub,
        's-menuitem': Menu.Item,
        's-icon': Icon
    },
    handleCollapse(status) {
        console.log(status);
    }
}
</script>

<style>
#components-layout-demo-responsive .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
}
</style>

```
