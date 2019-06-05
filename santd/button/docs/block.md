<cn>
#### block 按钮
block属性将使按钮适合其父宽度。
</cn>

```html
<template>
    <div>
        <s-button type="primary" block>Primary</s-button>
        <s-button block>Default</s-button>
        <s-button type="danger" block>Danger</s-button>
        <s-button type="dashed" block>dashed</s-button>
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
