<cn>
#### Flex 对齐
Flex 子元素垂直对齐。
</cn>


```html
<template>
  <div>
    <p>Align Top</p>
    <s-row type="flex" justify="center" align="top">
      <s-col span="4"><p class="height-100">col-4</p></s-col>
      <s-col span="4"><p class="height-50">col-4</p></s-col>
      <s-col span="4"><p class="height-120">col-4</p></s-col>
      <s-col span="4"><p class="height-80">col-4</p></s-col>
    </s-row>

    <p>Align Center</p>
    <s-row type="flex" justify="space-around" align="middle">
      <s-col span="4"><p class="height-100">col-4</p></s-col>
      <s-col span="4"><p class="height-50">col-4</p></s-col>
      <s-col span="4"><p class="height-120">col-4</p></s-col>
      <s-col span="4"><p class="height-80">col-4</p></s-col>
    </s-row>

    <p>Align Bottom</p>
    <s-row type="flex" justify="space-between" align="bottom">
      <s-col span="4"><p class="height-100">col-4</p></s-col>
      <s-col span="4"><p class="height-50">col-4</p></s-col>
      <s-col span="4"><p class="height-120">col-4</p></s-col>
      <s-col span="4"><p class="height-80">col-4</p></s-col>
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


