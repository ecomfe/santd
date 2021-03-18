<codebox>
#### 迷你
迷你版本。

```html
<template>
    <div>
        <s-pagination size="small" total="{{50}}"></s-pagination>
        <s-pagination size="small" total="{{50}}" showSizeChanger="{{true}}" showQuickJumper="{{true}}"></s-pagination>
        <s-pagination size="small" total="{{50}}" showTotal="{{showTotal}}"></s-pagination>
    </div>
</template>
<script>
import {Pagination} from 'santd';

const showTotal = function (total) {
    return `Total ${total} items`;
};
export default {
    initData() {
        return {
            showTotal: showTotal
        };
    },
    components: {
        's-pagination': Pagination
    }
}
</script>
```
</codebox>
