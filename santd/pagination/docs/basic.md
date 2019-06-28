<cn>
#### 基本
基础分页
</cn>

```html
<template>
    <div>
        <s-pagination total="{{50}}" defaultCurrent="{{1}}"></s-pagination>
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
