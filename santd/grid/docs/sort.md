<cn>
#### 栅格排序
列排序。
通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。
</cn>


```html
<template>
  <div>
    <s-row>
      <s-col span="18" push="6">col-18 col-push-6</s-col>
      <s-col span="6" pull="18">col-6 col-pull-18</s-col>
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


