<cn>
#### 自定义页脚按钮属性
传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。
</cn>

```html
<template>
    <div class="demo-button-props">
        <s-button type="primary" on-click="showModal">Open Modal with customized button props</s-button>
        <s-modal title="Basic Modal"
            visible="{=visible=}"
            okButtonProps="{{{disabled:true}}}"
            cancelButtonProps="{{{disabled:true}}}"
            on-ok="handleOk"
            on-cancel="handleCancel"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </s-modal>
    </div>
</template>

<script>
import button from 'santd/button';
import modal from 'santd/modal';

export default {
    components: {
        's-button': button,
        's-modal': modal
    },
    initData() {
        return {
            visible: false
        };
    },
    showModal() {
        this.data.set('visible', true);
    },
    handleOk(e) {
        console.log(e);
        this.data.set('visible', false);
    },
    handleCancel(e) {
        console.log(e);
        this.data.set('visible', false);
    }
}
</script>

<style>
.demo-button-props {}
</style>
```
