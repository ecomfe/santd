<text lang="cn">
#### 菜单隐藏方式
默认是点击关闭菜单，可以关闭此功能。
</text>

```html
<template>
    <div>
        <s-dropdown overlay="{{menu}}" visible="{{visible}}" on-visibleChange="onVisibleChange">
            <a href="javascript:;">Hover me<s-icon type="down" /></a>
        </s-dropdown>
    </div>
</template>
<script>
import san from 'san';
import Icon from 'santd/icon';
import DropDown from 'santd/dropdown';
import Menu from 'santd/menu';

const menu = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    menuClick({key, value}) {
        if (key === '3') {
            this.dispatch('keyChange', key);
        }
    },
    template: `
        <div>
            <s-menu prefixCls="san-dropdown" on-click="menuClick">
                <s-menu-item key="1">Clicking me will not close the menu.</s-menu-item>
                <s-menu-item key="2">Clicking me will not close the menu also.</s-menu-item>
                <s-menu-item key="3">Clicking me will close the menu.</s-menu-item>
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
            visible: false,
            menu: menu
        }
    },
    messages: {
        keyChange(payload) {
            this.data.set('visible', false);
        }
    },
    onVisibleChange(visible) {
        this.data.set('visible', visible);
    }

}
</script>
```
