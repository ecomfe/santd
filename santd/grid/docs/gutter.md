<cn>
#### 区块间隔
栅格常常需要和间隔进行配合，你可以使用 `Row` 的 `gutter` 属性，我们推荐使用 `(16+8n)px` 作为栅格间隔。(n 是自然数)
如果要支持响应式，可以写成 `{ xs: 8, sm: 16, md: 24, lg: 32 }`。
</cn>

```html
<template>
  <div class="gutter-example">
    <s-row gutter="16">
      <s-col class="gutter-row" span="6">
        <div class="gutter-box">col-6</div>
      </s-col>
      <s-col class="gutter-row" span="6">
        <div class="gutter-box">col-6</div>
      </s-col>
      <s-col class="gutter-row" span="6">
        <div class="gutter-box">col-6</div>
      </s-col>
      <s-col class="gutter-row" span="6">
        <div class="gutter-box">col-6</div>
      </s-col>
    </s-row>
  </div>
</template>
<script>
import {Col, Row} from 'santd/grid';
export default {
    components: {
        's-col': Col,
        's-row': Row
    }
}
</script>
<style scoped>
.gutter-example >>> .san-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #00A0E9;
  padding: 5px 0;
}
</style>
```


