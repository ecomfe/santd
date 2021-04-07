<text lang="cn">
#### 其他属性的响应式
`span` `pull` `push` `offset` `order` 属性可以通过内嵌到 `xs` `sm` `md` `lg` `xl` `xxl` 属性中来使用。
其中 `xs="6"` 相当于 `xs="{ span: 6 }"`。
</text>


```html
<template>
  <div id="components-grid-demo-responesive-more">
      <s-row>
        <s-col xs="{{ { span: 5, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col</s-col>
        <s-col xs="{{ { span: 11, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col</s-col>
        <s-col xs="{{ { span: 5, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col</s-col>
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


