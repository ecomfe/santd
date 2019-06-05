<cn>
#### 两种大小
`size="small"` 表示小号开关。
</cn>
```html
<template>
    <div>
        <s-switch defaultChecked />
        <br />
        <s-switch defaultChecked size="small" />
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
