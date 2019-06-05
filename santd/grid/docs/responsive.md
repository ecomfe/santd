<cn>
#### 响应式布局
参照 Bootstrap 的 [响应式设计](http://getbootstrap.com/css/#grid-media-queries)，预设六个响应尺寸：`xs` `sm` `md` `lg` `xl`  `xxl`。
</cn>



```html
<template>
  <div>
      <s-row>
        <s-col xs="2" sm="4" md="6" lg="8" xl="10">Col</s-col>
        <s-col xs="20" sm="16" md="12" lg="8" xl="4">Col</s-col>
        <s-col xs="2" sm="4" md="6" lg="8" xl="10">Col</s-col>
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


