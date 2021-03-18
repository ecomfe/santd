<codebox>
#### 清除
支持允许或者禁用清除。

```html
<template>
    <div class="san-rate">
        <s-rate defaultValue="{{3}}" ></s-rate> allowClear: true
        <br />
        <s-rate defaultValue="{{3}}" allowClear="{{false}}" /> allowClear: false
    </div>
</template>
<script>
import {Rate} from 'santd';

export default {
    components: {
        's-rate': Rate
    }
}
</script>
```
</codebox>
