<cn>
#### 控制 ToolTip 的显示
当 `tooltipVisible` 为 `true` 时，将始终显示 ToolTip；反之则始终不显示，即使在拖动、移入时也是如此。
</cn>

```html
<template>
    <div>
        <s-slider defaultValue="{{30}}" tooltipVisible />
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
