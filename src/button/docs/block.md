<text lang="cn">
#### block 按钮
block属性将使按钮适合其父宽度。
</text>

```html
<template>
    <div>
        <s-button type="primary" block="{{true}}">Primary</s-button>
        <s-button block="{{true}}">Default</s-button>
        <s-button type="danger" block="{{true}}">Danger</s-button>
        <s-button type="dashed" block="{{true}}">Dashed</s-button>
        <s-button type="link" block="{{true}}">Link</s-button>
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
<style>
</style>
```
