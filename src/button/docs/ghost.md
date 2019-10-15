<text lang="cn">
#### 幽灵按钮
幽灵按钮将按钮的内容反色，背景变为透明，常用在有色背景上。
</text>

```html
<template>
  <div style="background: rgb(190, 200, 200); padding: 20px 20px 12px;">
    <s-button type="primary" ghost="{{true}}">Primary</s-button>
    <s-button type="default" ghost="{{true}}">Default</s-button>
    <s-button type="danger" ghost="{{true}}">Danger</s-button>
    <s-button type="dashed" ghost="{{true}}">Dashed</s-button>
    <s-button type="link" ghost="{{true}}">Link</s-button>
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
