<text lang="cn">
#### 异步关闭
点击确定后异步关闭对话框，例如提交表单。
</text>

```html
<template>
    <div class="demo-async">
        <s-button type="primary" on-click="clickHandler">Open Modal with async logic</s-button>
        <s-modal title="Title"
            visible="{=visible=}"
            on-ok="handleOk"
            on-cancel="handleCancel"
            confirmLoading="{{confirmLoading}}"
        >
            <p>{{modalText}}</p>
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
            modalText: 'Content of the modal',
            confirmLoading: false
        };
    },
    handleOk(e) {
        this.data.set('modalText', 'The modal will be closed after two seconds');
        this.data.set('confirmLoading', true);
        setTimeout(() => {
            this.data.set('visible', false);
            this.data.set('confirmLoading', false);
        }, 2000);
    },
    handleCancel(e) {
        console.log('Clicked cancel button', e);
        this.data.set('visible', false);
    }
}
</script>

<style>
.demo-async {}
</style>
```
