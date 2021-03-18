<codebox>
#### 基本
最简单的下拉菜单。

```html
<template>
    <div>
        <s-dropdown>
            <s-menu prefixCls="{{prefixCls}}" slot="overlay">
                <s-menu-item s-for="n,index in data" key="'{{index}}'">
                    <a href="http://www.baidu.com" target="_blank">{{n}} menu item</a>
                </s-menu-item>
            </s-menu>
            <a href="javascript:;">Hover me<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import {Icon, Dropdown, Menu} from 'santd';

export default {
    components: {
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    initData() {
        return {
            data: ['1st', '2nd', '3rd']
        }
    }
}
</script>
```
</codebox>
