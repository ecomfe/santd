<text lang="cn">
#### 多个按钮组合
按钮组合使用时，推荐使用1个主操作 + n 个次操作，3个以上操作时把更多操作放到 `Dropdown.Button` 中组合使用。
</text>

```html
<template>
  <div>
    <s-button type="primary">Primary</s-button>
    <s-button>secondary</s-button>
    <s-dropdown trigger="hover">
        <s-menu prefixCls="{{prefixCls}}" slot="overlay" selectable="{{false}}" on-click="handleMenuClick">
            <s-menuitem key="1">1st item</s-menuitem>
            <s-menuitem key="2">2nd item</s-menuitem>
            <s-menuitem key="3">3rd item</s-menuitem>
        </s-menu>
        <s-button>
            Actions <s-icon type="down" />
        </s-button>
    </s-dropdown>
  </div>
</template>
<script>
import san from 'san';
import {Button, Menu, Dropdown, Icon} from 'santd';

const menu = san.defineComponent({
    components: {
        's-menu': Menu,
        's-menuitem': Menu.Item
    },
    template: `
        <div>
            <s-menu on-click="handleMenuClick" prefixCls="san-dropdown">
                <s-menuitem key="1">1st item</s-menuitem>
                <s-menuitem key="2">2nd item</s-menuitem>
                <s-menuitem key="3">3rd item</s-menuitem>
            </s-menu>
        </div>
    `
});

export default {
    components: {
        's-button': Button,
        's-dropdown': Dropdown,
        's-icon': Icon,
        's-menu': Menu,
        's-menuitem': Menu.Item
    },
    handleMenuClick(e) {
        console.log('click', e);
    }
}
</script>
```
