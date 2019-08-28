<text lang="cn">
#### 事件
当 Slider 的值发生改变时，会触发 `on-change` 事件，并把改变后的值作为参数传入。在 `on-mouseup` 时，会触发 `on-afterChange` 事件，并把当前值作为参数传入。
</text>

```html
<template>
    <div>
        <s-slider defaultValue="{{30}}" on-change="handleChange" on-afterChange="handleAfterChange" />
        <s-slider range step="{{10}}" defaultValue="{{[20, 50]}}" on-change="handleChange" on-afterChange="handleAfterChange" />
    </div>
</template>
<script>
import Slider from 'santd/slider';
import Switch from 'santd/switch';
export default {
    components: {
        's-slider': Slider,
        's-switch': Switch
    },
    handleChange(value)  {
        console.log('on-change: ', value);
    },
    handleAfterChange(value) {
        console.log('on-afterChange: ', value);
    }
}
</script>
```
