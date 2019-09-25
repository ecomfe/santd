<text lang="cn">
#### 触发方式
默认是移入触发菜单，可以点击触发。
</text>

```html
<template>
    <div>
        <s-dropdown trigger="click">
            <s-menu prefixCls="san-dropdown" slot="overlay">
                <s-menu-item s-for="n,index in data" key="'{{index}}'">
                    <a href="http://www.baidu.com" target="_blank">{{n}} menu item</a>
                </s-menu-item>
            </s-menu>
            <a href="javascript:;">Click me<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import Icon from 'santd/icon';
import DropDown from 'santd/dropdown';
import Menu from 'santd/menu';

export default {
    components: {
        's-dropdown': DropDown,
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
