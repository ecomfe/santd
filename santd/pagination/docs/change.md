<cn>
#### 改变
改变每页显示条目数
</cn>

```html
<template>
    <div>
        <s-pagination total="{{500}}" showSizeChanger defaultCurrent="{{3}}" on-showSizeChange="handleShowSizeChange"></s-pagination>
    </div>
</template>
<script>
import Pagination from 'santd/pagination';
export default {
    components: {
        's-pagination': Pagination
    },
    handleShowSizeChange(payload) {
        console.log(payload.current, payload.pageSize);
    }
}
</script>
```
