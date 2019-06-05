<cn>
#### 幽灵按钮
幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。
</cn>

```html
<template>
  <div style="background: rgb(190, 200, 200); padding: 20px 20px 12px;">
    <s-button type="primary" ghost>Primary</s-button>
    <s-button type="default" ghost>Default</s-button>
    <s-button type="danger" ghost>Danger</s-button>
    <s-button type="dashed" ghost>Dashed</s-button>
  </div>
</template>
<script>
import Button from 'santd/button';
export default {
    components: {
        's-button': Button
    }
}
</script>
```
