<cn>
#### 弹出位置
支持 6 个弹出位置。
</cn>

```html
<template>
    <div>
        <s-dropdown style="display:inline-block;margin-right: 10px;" s-for="placement in placemens" trigger="hover" placement="{{placement}}" overlay="{{menu}}">
            <s-button>{{placement}}</s-button>
        </s-dropdown>
    </div>
</template>
<script>
import san from 'san';
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import Button from 'santd/button';
import DropDown from 'santd/dropdown';

const menu = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown">
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
        <div>
    `
});

export default {
    components: {
        's-dropdown': DropDown,
        's-button': Button
    },
    initData() {
        return {
            menu: menu,
            placemens: ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']
        }
    }
}
</script>
```
