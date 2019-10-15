<text lang="cn">
#### 简洁
简单的翻页。
</text>

```html
<template>
  <div>
    <s-pagination simple="{{true}}" total="{{50}}" defaultCurrent="{{2}}"></s-pagination>
  </div>
</template>
<script>
import Pagination from 'santd/pagination';
export default {
    components: {
        's-pagination': Pagination
    }
}
</script>
```
