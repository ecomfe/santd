<text lang="cn">
#### 侧边布局
侧边两列式布局。页面横向空间有限时，侧边导航可收起。

侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。但这类导航横向页面内容的空间会被牺牲一部分。
</text>

```html
<template>
<div style="height: 360px; overflow-y: auto;">
    <s-layout style="{{{'min-height': '100vh'}}}">
        <s-sider collapsible collapsed="{{collapsed}}" on-collapse="handleCollapse">
            <div class="logo" />
            <s-menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys="{{['1']}}"
            >
                <s-menuitem key="1"><s-icon type="pie-chart" /> <span>Option 1</span></s-menuitem>
                <s-menuitem key="2"><s-icon type="desktop" /> <span>Option 2</span></s-menuitem>
                <s-submenu key="sub1" title="User">
                    <s-menuitem key="3">Tom</s-menuitem>
                    <s-menuitem key="4">Bill</s-menuitem>
                    <s-menuitem key="5">Alex</s-menuitem>
                </s-submenu>
            </s-menu>
        </s-sider>
        <s-layout>
            <s-header style="{{{background: '#fff', padding: 0}}}"></s-header>
            <s-content style="{{{margin: '0 16px'}}}">
                <s-breadcrumb separator="/" style="{{{margin: '16px 0'}}}">
                    <s-brcrumbitem>User</s-brcrumbitem>
                    <s-brcrumbitem>Bill</s-brcrumbitem>
                </s-breadcrumb>
                <div style="padding: 24px; background: #fff; min-height: 360px">Bill is a cat.</div>
            </s-content>
            <s-footer style="{{{'text-align': 'center'}}}">
            </s-footer>
        </s-layout>
    </s-layout>
</div>
</template>

<script>
import Layout from 'santd/layout';
import Menu from 'santd/menu';
import Breadcrumb from 'santd/breadcrumb';
import Icon from 'santd/icon';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-footer': Layout.Footer,
        's-sider': Layout.Sider,
        's-menu': Menu,
        's-menuitem': Menu.Item,
        's-submenu': Menu.Sub,
        's-breadcrumb': Breadcrumb,
        's-brcrumbitem': Breadcrumb.BrcrumbItem,
        's-icon': Icon
    },
    initData() {
        return {
            collapsed: false
        }
    },
    handleCollapse(collapsed) {
        this.data.set('collapsed', collapsed);
    }
}
</script>
<style>
#components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
}
</style>
```
