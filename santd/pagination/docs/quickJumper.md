<cn>
#### 跳转
快速跳转到某一页
</cn>

```html
<template>
    <div>
        <s-pagination total="{{500}}" showQuickJumper defaultCurrent="{{2}}" on-change="handleChange"></s-pagination>
    </div>
</template>
<script>
import Pagination from 'santd/pagination';
export default {
    components: {
        's-pagination': Pagination
    },
    handleChange(payload) {
        console.log('Page: ' + payload.page);
    }
}
</script>
```
