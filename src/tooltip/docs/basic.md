<text lang="cn">
#### 基本
最简单的用法。
</text>

```html
<template>
    <div>
        <s-tooltip title="prompt text">
            <span>Tooltip will show on mouse enter.</span>
        </s-tooltip>
    </div>
</template>
<script>
import {Tooltip} from 'santd';

export default {
    components: {
        's-tooltip': Tooltip
    }
}
</script>
```
