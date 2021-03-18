<codebox>
#### 基本用法
基本标签的用法，可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `onClose` 事件。

```html
<template>
    <div>
        <s-tag>Tag 1</s-tag>
        <s-tag><a href="http://www.baidu.com/">Link</a></s-tag>
        <s-tag closable="{{true}}" on-close="handleLog">Tag 2</s-tag>
        <s-tag closable="{{true}}" on-close="handlePreventDefault">Prevent Default</s-tag>
    </div>
</template>
<script>
import {Tag} from 'santd';

export default {
    components: {
        's-tag': Tag
    },
    handleLog(e) {
        console.log(e);
    },
    handlePreventDefault(e) {
        e.preventDefault();
        console.log('Clicked! But prevent default.');
    }
}
</script>
```
</codebox>
