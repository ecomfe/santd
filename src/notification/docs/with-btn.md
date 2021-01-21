<text lang="cn">
#### 自定义按钮
自定义关闭按钮（模板标签需使用`s-button`）的样式和文字。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Open the notification box</s-button>
    </div>
</template>

<script>
import {Notification, Button} from 'santd';

const close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

export default {
    components: {
        's-button': Button
    },
    clickHandler() {
        const key = 'open' + Date.now();
        const btn = `<s-button type="primary" size="small" on-click="btnClick">
            Confirm
        </s-button>`;

        Notification.open({
            message: 'Notification Title',
            description: 'A function will be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            btnClick: () => {
                Notification.close(key);
            },
            key,
            onClose: close
        });
    }
}
</script>
```
