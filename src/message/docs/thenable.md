<text lang="cn">
#### Promise 接口
可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message 。
</text>

```html
<template>
    <div>
        <s-button on-click="clickHandler">Display a sequence of message</s-button>
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
        message.loading('Action in progress..', 2.5)
            .then(() => message.success('Loading finished', 2.5))
            .then(() => message.info('Loading finished is finished', 2.5));
    }
}
</script>
```
