<text lang="cn">
#### 三种大小
我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。
</text>

```html
<template>
  <div class="example-input">
    <s-input size="large" placeholder="large size" />
    <s-input placeholder="default size" />
    <s-input size="small" placeholder="small size" />
  </div>
</template>
<script>
import Input from 'santd/input';
import Icon from 'santd/icon';
export default {
    components: {
        's-input': Input
    },
    onChange(value) {
        console.log('the value is: ', value);
    }
}
</script>
<style>
.example-input .san-input {
    width: 200px;
    margin: 0 8px 8px 0;
  }
</style>
```
