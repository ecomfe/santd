<text lang="cn">
#### 圆角/方角边缘
通过设定 `strokeLinecap="square|round"` 可以调整进度条边缘的形状。
</text>

```html
<template>
    <div>
        <s-progress strokeLinecap="square" percent="{{75}}"/>
        <s-progress strokeLinecap="square" type="circle" percent="{{75}}"/>
        <s-progress strokeLinecap="square" type="dashboard" percent="{{75}}"/>
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
