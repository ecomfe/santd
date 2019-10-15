<text lang="cn">
#### 顶部-侧边布局-通栏
同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站。
</text>

```html
<template>
<div>
    <s-layout>
        <s-header className="header">
            <div className="logo"></div>
            <s-menu theme="dark" mode="horizontal" defaultSelectedKeys="{{['1']}}" style="line-height: 64px;">
                <s-menu-item key="1">Nav 1</s-menu-item>
                <s-menu-item key="2">Nav 2</s-menu-item>
                <s-menu-item key="3">Nav 3</s-menu-item>
            </s-menu>
        </s-header>
        <s-layout>
            <s-sider width="{{200}}" style="{{{background: '#fff'}}}">
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
            <s-layout style="{{{padding: '0 24px 24px'}}}">
                <s-breadcrumb separator="/" style="{{{margin: '16px 0'}}}">
                    <s-brcrumbitem href="www.baidu.com">Home</s-brcrumbitem>
                    <s-brcrumbitem href="#">List</s-brcrumbitem>
                    <s-brcrumbitem>App</s-brcrumbitem></s-breadcrumb>
                <s-content style="{{{padding: '24px', background: '#fff', minHeight: '280px'}}}">Content</s-content></s-layout>
        </s-layout>
    </s-layout>
</div>
</template>
<script>
import Layout from 'santd/layout';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import Breadcrumb from 'santd/breadcrumb';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-sider': Layout.Sider,
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-icon': Icon,
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.BrcrumbItem
    },
    initData(){
        return {
            inlineCollapsed: false
        }
    },
    toggleCollapsed () {
        this.data.set('inlineCollapsed', !this.data.get('inlineCollapsed'));
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
