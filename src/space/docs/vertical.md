<codebox>
#### 垂直间距

相邻组件垂直间距。

可以设置 `width: 100%` 占满一行。

```html
<template>
  <s-space direction="vertical">
    <s-card title="Card" style="width: 300px;">
      <p>Card content</p>
      <p>Card content</p>
    </s-card>
    <s-card title="Card" style="width: 300px;">
      <p>Card content</p>
      <p>Card content</p>
    </s-card>
  </s-space>
</template>

<script>
import {Space, Card} from 'santd';

export default {
    components: {
        's-space': Space,
        's-card': Card
    }
}
</script>
```
</codebox>
