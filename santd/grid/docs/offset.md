<cn>
#### 左右偏移
列偏移。
使用 `offset` 可以将列向右侧偏。例如，`offset="4"` 将元素向右侧偏移了 4 个列（column）的宽度。
</cn>


```html
<template>
  <div>
    <s-row>
      <s-col span="8">col-8</s-col>
      <s-col span="8" offset="8">col-8</s-col>
    </s-row>
    <s-row>
      <s-col span="6" offset="6">col-6 col-offset-6</s-col>
      <s-col span="6" offset="6">col-6 col-offset-6</s-col>
    </s-row>
    <s-row>
      <s-col span="12" offset="6">col-12 col-offset-6</s-col>
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
```


