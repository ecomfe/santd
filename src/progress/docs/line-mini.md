<text lang="cn">
#### 小型进度条
适合放在较狭窄的区域内。
</text>

```html
<template>
    <div style="width: 170px;">
        <s-progress percent="{{30}}" size="small"/>
        <s-progress percent="{{50}}" size="small" status="active"/>
        <s-progress percent="{{70}}" size="small" status="exception"/>
        <s-progress percent="{{100}}" size="small"/>
    </div>
</template>

<script>
import progress from 'santd/progress';

export default {
    components: {
        's-progress': progress
    }
}
</script>
```
