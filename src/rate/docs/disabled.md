<text lang="cn">
#### 只读
只读，无法进行鼠标交互。
</text>

```html
<template>
    <div class="san-rate">
        <s-rate defaultValue="{{2}}" disabled="{{true}}" />
    </div>
</template>
<script>

import rate from 'santd/rate';

export default {
    components: {
        's-rate': rate
    }
}
</script>
```
