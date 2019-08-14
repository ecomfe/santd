<text lang="cn">
#### 基本形式
基本使用
</text>

```html
<template>
  <div>
    <s-input placeholder="base useage" on-change="onChange"/>
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
```
