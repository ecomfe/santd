<text lang="cn">
#### 跳转
快速跳转到某一页
</text>

```html
<template>
    <div>
        <s-pagination total="{{500}}" showQuickJumper="{{true}}" defaultCurrent="{{2}}" on-change="handleChange"></s-pagination>
        <br/>
        <s-pagination total="{{500}}" showQuickJumper="{{true}}" defaultCurrent="{{2}}" on-change="handleChange" disabled="{{true}}"></s-pagination>
    </div>
</template>
<script>
import {Pagination} from 'santd';

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
