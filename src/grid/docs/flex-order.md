<text lang="cn">
#### Flex 排序
从堆叠到水平排列。
通过 Flex 布局的 Order 来改变元素的排序。
</text>


```html
<template>
  <div id="components-grid-demo-flex-order">
    <s-row type="flex">
      <s-col span="6" order="4">1 col-order-4</s-col>
      <s-col span="6" order="3">2 col-order-3</s-col>
      <s-col span="6" order="2">3 col-order-2</s-col>
      <s-col span="6" order="1">4 col-order-1</s-col>
    </s-row>
  </div>
</template>
<script>
import {Grid} from 'santd';

export default {
    components: {
        's-col': Grid.Col,
        's-row': Grid.Row
    }
}
</script>
```
