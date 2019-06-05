<cn>
#### 进度圈
圈形的进度。
</cn>

```html
<template>
    <div>
        <s-progress type="circle" percent="{{75}}"/>
        <s-progress type="circle" percent="{{70}}" status="exception"/>
        <s-progress type="circle" percent="{{100}}"/>
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

<style>
.san-progress-circle-wrap,
.san-progress-line-wrap {
    margin-right: 8px;
    margin-bottom: 5px;
}
</style>
```
