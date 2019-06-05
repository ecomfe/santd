<cn>
#### 带有图标的通知提醒框
通知提醒框左侧有图标。
</cn>

```html
<template>
    <div>
        <s-button on-click="openNotificationWithIcon('success')">Success</s-button>
        <s-button on-click="openNotificationWithIcon('info')">Info</s-button>
        <s-button on-click="openNotificationWithIcon('warning')">Warning</s-button>
        <s-button on-click="openNotificationWithIcon('error')">Error</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import notification from 'santd/notification';

export default {
    components: {
        's-button': button
    },
    openNotificationWithIcon(type) {
        notification[type]({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
        });
    }
}
</script>

<style>
.code-box-demo .san-btn {
    margin-right: 1em;
}
</style>
```
