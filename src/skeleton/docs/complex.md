<text lang="cn">
#### 复杂的组合
更复杂的组合。
</text>

```html
<template>
    <div>
        <s-skeleton avatar="{{true}}" paragraph="{{paragraph}}"/>
    </div>
</template>

<script>
import {Skeleton} from 'santd';

export default {
    components: {
        's-skeleton': Skeleton
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
