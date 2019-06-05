<cn>
#### 国际化
设置 `okText` 与 `cancelText` 以自定义按钮文字。
</cn>

```html
<template>
    <div class="demo-local">
        <s-button type="primary" on-click="clickHandler">Modal</s-button>
        <s-modal title="Modal"
            visible="{=visible=}"
            okText="确认"
            cancelText="取消(ESC)"
            on-ok="handleOk"
            on-cancel="handleCancel"
        >
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
        </s-modal>
        <br/>
        <br/>
        <s-button on-click="confirm">Confirm</s-button>
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
    clickHandler() {
        this.data.set('visible', true);
    },
    initData() {
        return {
            visible: false
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
    confirm() {
        modal.confirm({
            title: 'Confirm',
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消'
        });
    }
}
</script>

<style>
.demo-local {}
</style>
```
