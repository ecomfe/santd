<text lang="cn">
#### 仪表盘
通过设置 `type=dashboard`，可以很方便地实现仪表盘样式的进度条。
</text>

```html
<template>
    <div>
        <s-progress type="dashboard" percent="{{75}}"/>
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
