<text lang="cn">
#### 自定义关闭图标
关闭图标可以被自定义。
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
            icon: '<s-icon type="smile" style="color:#108ee9"/>',
            closeIcon: '<s-icon type="close-circle" style="color:#108ee9"/>'
        });
    }
}
</script>
```
