<cn>
#### 文本组件
内置不同样式的文本。
</cn>

```html
<template>
  <div>
    <s-text>Santd</s-text>
    <br/>
    <s-text type="secondary">Santd</s-text>
    <br/>
    <s-text type="warning">Santd</s-text>
    <br/>
    <s-text type="danger">Santd</s-text>
    <br/>
    <s-text disabled>Santd</s-text>
    <br/>
    <s-text mark>Santd</s-text>
    <br/>
    <s-text code>Santd</s-text>
    <br/>
    <s-text underline>Santd</s-text>
    <br/>
    <s-text delete>Santd</s-text>
    <br/>
    <s-text strong>Santd</s-text>
  </div>
</template>
<script>
import typography from 'santd/typography';
export default {
    components: {
        's-text': typography.Text
    }
}
</script>
```