<cn>
#### 总数
通过设置 `showTotal` 展示总共有多少数据。
</cn>

```html
<template>
  <div>
    <s-pagination total="{{85}}" pageSize="{{20}}" defaultCurrent="{{1}}" showTotal="{{showTotal}}"></s-pagination>
    <s-pagination total="{{85}}" pageSize="{{20}}" defaultCurrent="{{1}}" showTotal="{{showTotal1}}"></s-pagination>
  </div>
</template>
<script>
import Pagination from 'santd/pagination';

const showTotal = function (total) {
    return `Total ${total} items`;
};

const showTotal1 = function (total, range) {
    return `${range[0]}-${range[1]} of ${total} items`;
}

export default {
    initData() {
        return {
            showTotal: showTotal,
            showTotal1: showTotal1
        }
    },
    components: {
        's-pagination': Pagination
    }
}
</script>
```
