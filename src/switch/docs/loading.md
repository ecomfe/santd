<text lang="cn">
#### 加载中
标识开关操作仍在执行中。
</text>
```html
<template>
    <div>
        <s-switch loading="{{true}}" defaultChecked="{{true}}" /><br />
        <s-switch loading="{{true}}" size="small"/>
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
