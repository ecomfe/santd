<codebox>
#### 右键菜单
默认是移入触发菜单，可以点击鼠标右键触发。

```html
<template>
    <div>
        <s-dropdown trigger="contextMenu">
            <s-menu prefixCls="{{prefixCls}}" slot="overlay">
                <s-menu-item s-for="n,index in data" key="'{{index}}'">
                    <a href="http://www.baidu.com" target="_blank">{{n}} menu item</a>
                </s-menu-item>
            </s-menu>
            <span style="user-select: none;">Right Click on Me</span>
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
