<codebox>
#### 自定义位置
自定义位置，点击触发按钮抽屉从相应的位置滑出，点击遮罩区关闭

```html
<template>
    <div>
        <s-radio-group style="margin-right: 8px" value="{{placement}}" on-change="onChange($event)" name="position">
            <s-radio value="top">top</s-radio>
            <s-radio value="right">right</s-radio>
            <s-radio value="bottom">bottom</s-radio>
            <s-radio value="left">left</s-radio>
        </s-radio-group>
        <s-button type="primary" on-click="showDrawer">Open</s-button>
        <s-drawer
            title="Basic Drawer"
            placement="{{placement}}"
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
import {Button, Drawer, Radio} from 'santd';

export default {
    components: {
        's-button': Button,
        's-drawer': Drawer,
        's-radio': Radio,
        's-radio-group': Radio.Group
    },
    initData() {
        return {
            visible: false,
            placement: 'right'
        };
    },
    showDrawer() {
        this.data.set('visible', true);
    },
    onClose(e) {
        console.log(e, 'I was closed.');
    },
    onChange(e) {
        this.data.set('placement', e.target.value);
    }
}
</script>
```
</codebox>
