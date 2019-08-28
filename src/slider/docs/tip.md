<text lang="cn">
#### 自定义提示
使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter` 为 `null`，则隐藏 Tooltip。
</text>

```html
<template>
    <div>
        <s-slider tipFormatter="{{tipFormatter}}" />
        <s-slider tipFormatter="{{noTip}}" />
    </div>
</template>
<script>
import Slider from 'santd/slider';
export default {
    components: {
        's-slider': Slider
    },
    initData() {
        return {
            tipFormatter(value) {
                return `${value}%`;
            },
            noTip: null
        };
    }
}
</script>
```
