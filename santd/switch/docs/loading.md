<text lang="cn">
#### 加载中
标识开关操作仍在执行中。
</text>
```html
<template>
    <div>
        <s-switch loading defaultChecked /><br />
        <s-switch loading size="small"/>
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
