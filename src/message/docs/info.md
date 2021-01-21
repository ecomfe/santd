<text lang="cn">
#### 普通提示
信息提醒反馈。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="clickHandler">Display normal message</s-button>
    </div>
</template>

<script>
import {Button} from 'santd';
import message from 'santd/es/message';
import 'santd/es/message/style';

export default {
    components: {
        's-button': Button
    },
    clickHandler() {
        message.info('This is a normal message');
    }
}
</script>
```
