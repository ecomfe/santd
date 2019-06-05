<cn>
#### 小数

和原生的数字输入框一样，value 的精度由 step 的小数位数决定。

</cn>

```html
<template>
  <div>
    <s-input-number min="0" max="10" step="0.1" on-change="onChange"></s-input-number>
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
