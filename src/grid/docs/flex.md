<text lang="cn">
#### Flex 布局
Flex 布局基础。
使用 `row-flex` 定义 `flex` 布局，其子元素根据不同的值 `start`,`center`,`end`,`space-between`,`space-around`，分别定义其在父节点里面的排版方式。
</text>


```html
<template>
  <div id="components-grid-demo-flex">
    <p>sub-element align left</p>
    <s-row type="flex" justify="start">
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
    </s-row>

    <p>sub-element align center</p>
    <s-row type="flex" justify="center">
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
    </s-row>

    <p>sub-element align right</p>
    <s-row type="flex" justify="end">
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
    </s-row>

    <p>sub-element monospaced arrangement</p>
    <s-row type="flex" justify="space-between">
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
    </s-row>

    <p>sub-element align full</p>
    <s-row type="flex" justify="space-around">
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
      <s-col span="4">col-4</s-col>
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


