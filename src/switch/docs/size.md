<text lang="cn">
#### 两种大小
`size="small"` 表示小号开关。
</text>
```html
<template>
    <div>
        <s-switch defaultChecked="{{true}}" />
        <br />
        <s-switch defaultChecked="{{true}}" size="small" />
    </div>
</template>
<script>
import Switch from 'santd/switch';
export default {
    components: {
        's-switch': Switch
    }
}
</script>
```
