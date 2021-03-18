<codebox>
#### 简洁
简单的翻页。

```html
<template>
  <div>
    <s-pagination simple="{{true}}" total="{{50}}" defaultCurrent="{{2}}"></s-pagination>
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
</codebox>
