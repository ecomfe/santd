<text lang="cn">
#### 弹出位置
支持 6 个弹出位置。
</text>

```html
<template>
    <div>
        <s-dropdown style="display:inline-block;margin-right: 10px;" s-for="placement in placemens" trigger="hover" placement="{{placement}}">
            <s-menu prefixCls="{{prefixCls}}" slot="overlay">
                <s-menu-item key="item1">
                    <a target="_blank" href="http://www.baidu.com">1st menu item</a>
                </s-menu-item>
                <s-menu-item key="item2">
                    <a target="_blank" href="http://www.baidu.com">2nd menu item</a>
                </s-menu-item>
                <s-menu-item key="item3">
                    <a target="_blank" href="http://www.baidu.com">3rd menu item</a>
                </s-menu-item>
            </s-menu>
            <s-button>{{placement}}</s-button>
        </s-dropdown>
    </div>
</template>
<script>
import {Button, Icon, Dropdown, Menu} from 'santd';

export default {
    components: {
        's-dropdown': Dropdown,
        's-button': Button,
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    initData() {
        return {
            placemens: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']
        }
    }
}
</script>
```
