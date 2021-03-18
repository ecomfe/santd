<codebox>
#### 加载中
进行全局 loading，异步自行移除。

```html
<template>
    <div>
        <s-button on-click="clickHandler">Display a loading indicator</s-button>
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
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 2500);
    }
}
</script>
```
</codebox>
