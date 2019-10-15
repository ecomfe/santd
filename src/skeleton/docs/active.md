<text lang="cn">
#### 动画效果
显示动画效果。
</text>

```html
<template>
    <div>
        <s-skeleton active="{{true}}"/>
    </div>
</template>

<script>
import skeleton from 'santd/skeleton';

export default {
    components: {
        's-skeleton': skeleton
    }
}
</script>
```
