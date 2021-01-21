<text lang="cn">
#### 基础栅格
从堆叠到水平排列。
使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 `Row` 内。
</text>

```html
<template>
  <div id="components-grid-demo-basic">
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
import {Grid} from 'santd';

export default {
    components: {
        's-col': Grid.Col,
        's-row': Grid.Row
    }
}
</script>
```
