<cn>
#### 分段进度条
标准的进度条。
</cn>

```html
<template>
    <div>
        <s-progress percent="{{60}}" successPercent="{{30}}"/>
    </div>
</template>
<script>
import progress from 'santd/progress';
import tooltip from 'santd/tooltip';

export default {
    components: {
        's-progress': progress,
        's-tooltip': tooltip
    }
}
</script>
```
