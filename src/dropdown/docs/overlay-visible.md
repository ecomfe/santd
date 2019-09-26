<text lang="cn">
#### 菜单隐藏方式
默认是点击关闭菜单，可以关闭此功能。
</text>

```html
<template>
    <div>
        <s-dropdown visible="{{visible}}" on-visibleChange="onVisibleChange">
            <s-menu prefixCls="san-dropdown" on-click="menuClick" slot="overlay">
                <s-menu-item key="1">Clicking me will not close the menu.</s-menu-item>
                <s-menu-item key="2">Clicking me will not close the menu also.</s-menu-item>
                <s-menu-item key="3">Clicking me will close the menu.</s-menu-item>
            </s-menu>
            <a href="javascript:;">Hover me<s-icon type="down" /></a>
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
            visible: false
        }
    },
    menuClick({key, value}) {
        if (key === '3') {
            this.data.set('visible', false);
        }
    },
    onVisibleChange(visible) {
        this.data.set('visible', visible);
    }

}
</script>
```
