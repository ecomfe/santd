<cn>
#### 进度条
标准的进度条。
</cn>

```html
<template>
    <div>
        <s-progress percent="{{30}}"/>
        <s-progress percent="{{50}}" status="active"/>
        <s-progress percent="{{70}}" status="exception"/>
        <s-progress percent="{{100}}"/>
        <s-progress percent="{{50}}" showInfo="{{false}}"/>
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
