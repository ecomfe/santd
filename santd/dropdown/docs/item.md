<cn>
#### 其它元素
分割线和不可用菜单项。
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

const menus = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-menu-divider': Menu.MenuDivider
    },
    initData() {
        return {
            data: ['1st', '2nd']
        }
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown">
                <s-menu-item s-for="n,index in data" key="'{{index}}'">
                    <a href="http://www.baidu.com" target="_blank">{{n}} menu item</a>
                </s-menu-item>
                <s-menu-divider/>
                <s-menu-item disabled>3rd menu item（disabled）</s-menu-item>
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
            menu: menus
        }
    }
}
</script>
```
