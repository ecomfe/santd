<cn>
#### 基本
最简单的用法。
</cn>

```html
<template>
    <div>
        <s-tooltip title="prompt text">
            <span>Tooltip will show on mouse enter.</span>
        </s-tooltip>
    </div>
</template>
<script>
import tooltip from 'santd/tooltip';

export default {
    components: {
        's-tooltip': tooltip
    }
}
</script>
```
