<text lang="cn">
#### 受控
受控制的页码。
</text>

```html
<template>
    <div>
        <s-pagination total="{{50}}" current="{{current}}" on-change="handleChange"></s-pagination>
    </div>
</template>
<script>
import {Pagination} from 'santd';

export default {
    initData() {
        return {
            current: 3
        };
    },
    handleChange(payload) {
        console.log(payload.page);
        this.data.set('current', payload.page);
    },
    components: {
        's-pagination': Pagination
    }
}
</script>
```
