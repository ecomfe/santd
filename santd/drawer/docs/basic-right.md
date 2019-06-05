<cn>
#### 基础抽屉
基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭
</cn>

```html
<template>
    <div>
        <s-button type="primary" on-click="showDrawer">Open</s-button>
        <s-drawer
            title="Basic Drawer"
            placement="right"
            closable="{{false}}"
            visible="{=visible=}"
            on-close="onClose"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </s-drawer>
    </div>
</template>

<script>
import button from 'santd/button';
import drawer from 'santd/drawer';

export default {
    components: {
        's-button': button,
        's-drawer': drawer
    },
    initData() {
        return {
            visible: false
        };
    },
    showDrawer() {
        this.data.set('visible', true);
    },
    onClose(e) {
        console.log(e, 'I was closed.');
    }
}
</script>
```
