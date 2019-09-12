<text lang="cn">
#### 跳转
快速跳转到某一页
</text>

```html
<template>
    <div>
        <s-pagination total="{{500}}" showQuickJumper defaultCurrent="{{2}}" on-change="handleChange"></s-pagination>
        <br/>
        <s-pagination total="{{500}}" showQuickJumper defaultCurrent="{{2}}" on-change="handleChange" disabled></s-pagination>
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
