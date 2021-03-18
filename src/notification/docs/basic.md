<codebox>
#### 基本
最简单的用法，4.5 秒后自动关闭。

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
            onClick() {
                console.log('Notification Clicked!');
            }
        });
    }
}
</script>
```
</codebox>
