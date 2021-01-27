<text lang="cn">
#### 更新消息内容
可以通过唯一的 key 来更新内容。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Open the notification box</s-button>
    </div>
</template>
<script>
import {Notification, Button} from 'santd';

const key = 'updatable';

export default {
    components: {
        's-button': Button
    },
    clickHandler() {
        const options = {
            key,
            message: 'Notification Title',
            description: 'description.'
        };
        Notification.open(options);

        // 更新内容
        const newOptions = Object.assign({}, options, {
            message: 'New Title',
            description: 'New description.'
        });
        setTimeout(() => {
            Notification.open(newOptions);
        }, 1000);
    }
}
</script>
```
