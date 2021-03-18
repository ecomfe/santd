<codebox>
#### 分段进度条
标准的进度条。

```html
<template>
    <div>
        <s-progress percent="{{60}}" successPercent="{{30}}"/>
    </div>
</template>
<script>
import {Progress} from 'santd';

export default {
    components: {
        's-progress': Progress
    }
}
</script>
```
</codebox>
