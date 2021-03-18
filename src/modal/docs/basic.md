<codebox>
#### 基本
第一个对话框。

```html
<template>
    <div class="demo-basic">
        <s-button type="primary" on-click="clickHandler">Open Modal</s-button>
        <s-modal title="Basic Modal"
            visible="{=visible=}"
            on-ok="handleOk"
            on-cancel="handleCancel"
            on-afterClose="afterClose"
            getContainer="{{getContainer}}"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </s-modal>
    </div>
</template>

<script>
import {Modal, Button} from 'santd';

export default {
    components: {
        's-button': Button,
        's-modal': Modal
    },
    clickHandler() {
        this.data.set('visible', true);
    },
    initData() {
        return {
            visible: false,
            getContainer: () => {
                const div = document.createElement('div');
                div.id = 'modal-container';
                document.body.appendChild(div);
                return div;
            }
        };
    },
    handleOk(e) {
        console.log(e);
        this.data.set('visible', false);
    },
    handleCancel(e) {
        console.log(e);
        this.data.set('visible', false);
    },
    afterClose() {
        console.log('afterClose');
    }
}
</script>

<style>
.san-modal p {
    margin: 0;
}
</style>
```
</codebox>
