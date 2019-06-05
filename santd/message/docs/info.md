<cn>
#### 普通提示
信息提醒反馈。
</cn>

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Display normal message</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import message from 'santd/message';

export default {
    components: {
        's-button': button
    },
    clickHandler() {
        message.info('This is a normal message');
    }
}
</script>
```
