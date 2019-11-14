<text lang="cn">
#### 控制 ToolTip 的显示
当 `tooltipVisible` 为 `true` 时，将始终显示 ToolTip；反之则始终不显示，即使在拖动、移入时也是如此。
</text>

```html
<template>
    <div>
        <s-slider defaultValue="{{30}}" tooltipVisible="{{true}}" />
    </div>
</template>
<script>
import Slider from 'santd/slider';
export default {
    components: {
        's-slider': Slider
    }
}
</script>
```
