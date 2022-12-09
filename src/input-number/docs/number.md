<text lang="cn">
#### 小数

和原生的数字输入框一样，value 的精度由 step 的小数位数决定。

</text>

```html
<template>
  <div style="width: 150px">
    <s-input-number
      min="1"
      max="10"
      step="1"
      on-change="onChange"
      style="width: 100%;"
      inputStyle="text-align: left;"
    ></s-input-number>
  </div>
</template>
<script>
import {InputNumber} from 'santd';

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
