<cn>
#### 基本
最简单的用法
</cn>
```html
<template>
    <div>
        <s-switch on-change='onChange' defaultChecked />
    </div>
</template>
<script>
import Switch from 'santd/switch';
export default {
    components: {
        's-switch': Switch
    },
    initData() {
        return {
            checked: true,
        }
    },
    onChange(checked) {
        console.log(checked);
    }
}
</script>
```
