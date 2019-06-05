<cn>
#### 信息提示
各种类型的信息提示，只提供一个按钮用于关闭。
</cn>

```html
<template>
    <div class="demo-info">
        <s-button on-click="info">Info</s-button>
        <s-button on-click="success">Success</s-button>
        <s-button on-click="error">Error</s-button>
        <s-button on-click="warning">Warning</s-button>
    </div>
</template>

<script>
import san from 'san';
import button from 'santd/button';
import modal from 'santd/modal';

const content = san.defineComponent({
    template: `
        <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
        </div>
    `
});

export default {
    components: {
        's-button': button
    },
    info() {
        modal.info({
            title: 'This is a notification message',
            content,
            onOk() {}
        });
    },
    success() {
        modal.success({
            title: 'This is a success message',
            content: 'some messages...some messages...'
        });
    },
    error() {
        modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...'
        });
    },
    warning() {
        modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...'
        });
    }
}
</script>

<style>
.demo-info {}
</style>
```
