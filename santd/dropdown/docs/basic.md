<cn>
#### 基本
最简单的下拉菜单。
</cn>

```html
<template>
    <div>
        <s-dropdown overlay="{{menu}}">
            <a href="javascript:;">Hover me<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import san from 'san';
import Icon from 'santd/icon';
import DropDown from 'santd/dropdown';
import Menu from 'santd/menu';

const menuBasic = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    initData() {
        return {
            data: ['1st', '2nd', '3rd']
        }
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown">
                <s-menu-item s-for="n,index in data" key="'{{index}}'">
                    <a href="http://www.baidu.com" target="_blank">{{n}} menu item</a>
                </s-menu-item>
            </s-menu>
        </div>
    `
});

export default {
    components: {
        's-dropdown': DropDown,
        's-icon': Icon
    },
    initData() {
        return {
            menu: menuBasic
        }
    }
}
</script>
```
