<cn>
#### 标题组件
展示不同级别的标题。
</cn>

```html
<template>
  <div>
    <s-title>h1. Santd</s-title>
    <s-title level="{{2}}">h2. Santd</s-title>
    <s-title level="{{3}}">h3. Santd</s-title>
    <s-title level="{{4}}">h4. Santd</s-title>
  </div>
</template>
<script>
import typography from 'santd/typography';
export default {
    components: {
        's-title': typography.Title,
    }
}
</script>
```
