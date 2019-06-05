<cn>
#### 自动关闭的延时
自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0` 即可。`注：鼠标经过时会重新计时`
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

export default {
    components: {
        's-button': button
    },
    clickHandler() {
        notification.open({
            message: 'Notification Title',
            description: 'I will never close automatically. I will be close manually. I will never close automatically.',
            duration: 0
        });
    }
}
</script>
```
