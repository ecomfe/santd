<text lang="cn">
#### 自定义样式
使用 style 和 className 来定义样式。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Open the notification box</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import notification from 'santd/notification';

export default {
    components: {
        's-button': button
    },
    clickHandler() {
        notification.open({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            style: {
                width: '300px',
                marginLeft: (335 - 600) + 'px',
            }
        });
    }
}
</script>
```
