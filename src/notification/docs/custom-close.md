<codebox>
#### 自定义关闭图标
关闭图标可以被自定义。

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Open the notification box</s-button>
    </div>
</template>

<script>
import {Notification, Button} from 'santd';

export default {
    components: {
        's-button': Button
    },
    clickHandler() {
        Notification.open({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            icon: '<s-icon type="smile" style="color:#108ee9"/>',
            closeIcon: '<s-icon type="close-circle" style="color:#108ee9"/>'
        });
    }
}
</script>
```
</codebox>
