<codebox>
#### 修改延时
自定义时长 `10s`，默认时长为 `3s`。`注：鼠标经过时会重新计时`

```html
<template>
    <div>
        <s-button on-click="clickHandler">Customized display duration</s-button>
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
        message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
    }
}
</script>
```
</codebox>
