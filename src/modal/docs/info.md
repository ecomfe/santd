<codebox>
#### 信息提示
各种类型的信息提示，只提供一个按钮用于关闭。

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
import {Modal, Button} from 'santd';

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
        's-button': Button
    },
    info() {
        Modal.info({
            title: 'This is a notification message',
            content,
            onOk() {}
        });
    },
    success() {
        Modal.success({
            title: 'This is a success message',
            content: 'some messages...some messages...'
        });
    },
    error() {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...'
        });
    },
    warning() {
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...'
        });
    }
}
</script>
```
</codebox>
