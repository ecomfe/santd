<text lang="cn">
#### 加载中
进行全局 loading，异步自行移除。
</text>

```html
<template>
    <div>
        <s-button on-click="clickHandler">Display a loading indicator</s-button>
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
        const hide = message.loading('Action in progress..', 0);
        // Dismiss manually and asynchronously
        setTimeout(hide, 2500);
    }
}
</script>
```
