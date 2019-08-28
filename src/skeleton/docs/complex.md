<text lang="cn">
#### 复杂的组合
更复杂的组合。
</text>

```html
<template>
    <div>
        <s-skeleton avatar paragraph="{{paragraph}}"/>
    </div>
</template>

<script>
import skeleton from 'santd/skeleton';

export default {
    components: {
        's-skeleton': skeleton
    },
    initData() {
        return {
            paragraph: {
                rows: 4
            }
        };
    }
}
</script>
```
