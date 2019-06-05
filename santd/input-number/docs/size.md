<cn>
#### size
三种大小的数字输入框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。
</cn>

```html
<template>
    <div>
        <s-input-number min="1" max="10" defaultValue="3" on-change="onChange" size="large"></s-input-number>
        <s-input-number min="1" max="10" defaultValue="3" on-change="onChange"></s-input-number>
        <s-input-number min="1" max="10" defaultValue="3" on-change="onChange" size="small"></s-input-number>
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
