<cn>
#### 更新消息内容
可以通过唯一的 key 来更新内容。
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

const key = 'updatable';

export default {
    components: {
        's-button': button
    },
    clickHandler() {
        const options = {
            key,
            message: 'Notification Title',
            description: 'description.'
        };
        notification.open(options);

        // 更新内容
        const newOptions = Object.assign({}, options, {
            message: 'New Title',
            description: 'New description.'
        });
        setTimeout(() => {
            notification.open(newOptions);
        }, 1000);
    }
}
</script>
```
