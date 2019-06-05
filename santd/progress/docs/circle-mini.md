<cn>
#### 小型进度圈
小一号的圈形进度。
</cn>

```html
<template>
    <div>
        <s-progress type="circle" percent="{{75}}" width="{{80}}"/>
        <s-progress type="circle" percent="{{70}}" width="{{80}}" status="exception"/>
        <s-progress type="circle" percent="{{100}}" width="{{80}}"/>
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
