<text lang="cn">
#### 改变
改变每页显示条目数
</text>

```html
<template>
    <div>
        <s-pagination total="{{500}}" showSizeChanger="{{true}}" defaultCurrent="{{3}}" on-showSizeChange="handleShowSizeChange"></s-pagination>
        <br/>
        <s-pagination total="{{500}}" showSizeChanger="{{true}}" defaultCurrent="{{3}}" on-showSizeChange="handleShowSizeChange" disabled="{{true}}"></s-pagination>
    </div>
</template>
<script>
import {Pagination} from 'santd';

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
