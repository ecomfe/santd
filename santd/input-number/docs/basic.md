<text lang="cn">
#### 基本
数字输入框。
</text>

```html
<template>
    <div>
        <s-input-number min="1" max="10" defaultValue="3" on-change="onChange"></s-input-number>
    </div>
</template>
<script>
import InputNumber from 'santd/input-number';

export default {
    components: {
        's-input-number': InputNumber
    },
    onChange(value) {
        console.log('changed: ', value);
    }
}
</script>
```
