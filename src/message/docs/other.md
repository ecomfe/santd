<codebox>
#### 其他提示类型
包括成功、失败、警告。

```html
<template>
    <div>
        <s-button on-click="clickHandler1">Success</s-button>
        <s-button on-click="clickHandler2">Error</s-button>
        <s-button on-click="clickHandler3">Warning</s-button>
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
    clickHandler1() {
        message.success('This is a message of success');
    },
    clickHandler2() {
        message.error('This is a message of error');
    },
    clickHandler3() {
        message.warning('This is message of warning');
    }
}
</script>

<style>
#components-message-demo-other .san-btn {
    margin-right: 8px;
}
</style>
```
</codebox>
