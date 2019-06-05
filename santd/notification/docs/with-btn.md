<cn>
#### 自定义按钮
自定义关闭按钮（模板标签需使用`s-button`）的样式和文字。
</cn>

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Open the notification box</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import notification from 'santd/notification';

const close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

export default {
    components: {
        's-button': button
    },
    clickHandler() {
        const key = 'open' + Date.now();
        const btn = `<s-button type="primary" size="small" on-click="btnClick">
            Confirm
        </s-button>`;

        notification.open({
            message: 'Notification Title',
            description: 'A function will be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            btnClick: () => {
                notification.close(key);
            },
            key,
            onClose: close
        });
    }
}
</script>
```
