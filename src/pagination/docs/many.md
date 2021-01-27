<text lang="cn">
#### 更多
更多分页
</text>

```html
<template>
  <div>
    <s-pagination total="{{500}}" current="{{6}}"></s-pagination>
  </div>
</template>
<script>
import {Pagination} from 'santd';

export default {
    components: {
        's-pagination': Pagination
    }
}
</script>
```
