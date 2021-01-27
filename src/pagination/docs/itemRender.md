<text lang="cn">
#### 上一步和下一步
修改上一步和下一步为文字链接。
</text>

```html
<template>
  <div>
    <s-pagination total="{{500}}">
        <template slot="itemRender">
            <a s-if="{{type === 'prev'}}">Previous</a>
            <a s-else-if="{{type === 'next'}}">Next</a>
            <a s-else-if="{{type === 'page'}}">{{page}}</a>
        </template>
    </s-pagination>
  </div>
</template>
<script>
import san from 'san';
import {Pagination} from 'santd';

export default {
    components: {
        's-pagination': Pagination
    }
}
</script>
```
