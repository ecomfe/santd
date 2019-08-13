<text lang="cn">
#### 自定义触发器
要使用自定义触发器，可以设置 `trigger = null` 来隐藏默认设定。
</text>

```html
<template>
<div>
    <s-layout>
        <s-sider collapsed="{{collapsed}}" collapsible trigger="{{noTrigger}}">
            <div class="logo" />
            <s-menu theme="dark" mode="inline" inlineCollapsed="{{collapsed}}" defaultSelectedKeys="{{['1']}}">
                <s-menuitem key="1">
                    <s-icon type="user" />
                    <span>nav 1</span>
                </s-menuitem>
                <s-menuitem key="2">
                    <s-icon type="video-camera" />
                    <span>nav 2</span>
                </s-menuitem>
                <s-menuitem key="3">
                    <s-icon type="upload" />
                    <span>nav 3</span>
                </s-menuitem>
                <s-submenu key="sub1" placement="right-start" title="{{subOne}}">
                    <s-menuitem key="4">
                        <s-icon type="file"></s-icon>
                        <span>小标题4</span>
                    </s-menuitem>
                </s-submenu>
            </s-menu>
        </s-sider>
        <s-layout>
            <s-header style="background: #fff; padding: 0">
                <s-icon class="trigger" type="{{collapsed ? 'menu-unfold' : 'menu-fold'}}" on-click="toggleCollapsed"/></span>
            </s-header>
            <s-content style="{{{margin: '24px 16px', padding: '24px', background: '#fff', 'min-height': '280px'}}}">Content</s-content>
        </s-layout>
    </s-layout>
</div>
</template>
<script>
import san from 'san';
import Layout from 'santd/layout';
import Menu from 'santd/menu';
import Icon from 'santd/icon';

export default {
    components: {
        's-layout': Layout,
        's-header': Layout.Header,
        's-content': Layout.Content,
        's-sider': Layout.Sider,
        's-menu': Menu,
        's-submenu': Menu.Sub,
        's-menuitem': Menu.Item,
        's-icon': Icon
    },
    initData(){
        return {
            noTrigger: null,
            collapsed: false,
            subOne: function() {
                return san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `
                        <span>
                            <s-icon type="search"/>
                            <span>Navigation Two</span>
                        </span>
                    `
                })
            }
        }
    },
    toggleCollapsed () {
        this.data.set('collapsed', !this.data.get('collapsed'));
    }
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
}
</style>
```
