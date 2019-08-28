<text lang="cn">
#### 基础栅格
从堆叠到水平排列。
使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 `Row` 内。
</text>

```html
<template>
  <div>
    <s-row>
      <s-col span="12">col-12</s-col>
      <s-col span="12">col-12</s-col>
    </s-row>
    <s-row>
      <s-col span="8">col-8</s-col>
      <s-col span="8">col-8</s-col>
      <s-col span="8">col-8</s-col>
    </s-row>
    <s-row>
      <s-col span="6">col-6</s-col>
      <s-col span="6">col-6</s-col>
      <s-col span="6">col-6</s-col>
      <s-col span="6">col-6</s-col>
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
