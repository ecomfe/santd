<text lang="cn">
#### 上一步和下一步
修改上一步和下一步为文字链接。
</text>

```html
<template>
  <div>
    <s-pagination total="{{500}}" itemRender="{{itemRender}}"></s-pagination>
  </div>
</template>
<script>
import san from 'san';
import Pagination from 'santd/pagination';

const itemRender = function (type, originalElement) {
    if (type === 'prev') {
        return san.defineComponent({
            template: `<a>Previous</a>`
        });
    }
    else if (type === 'next') {
        return san.defineComponent({
            template: `<a>Next</a>`
        });
    }
    return originalElement;
}
export default {
    initData() {
        return {
            itemRender: itemRender
        };
    },
    components: {
        's-pagination': Pagination
    }
}
</script>
```
