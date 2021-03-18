
<codebox>
#### 半星
支持选中半星。

```html
<template>
    <div class="san-rate">
        <s-rate allowHalf="{{true}}" defaultValue="{{2.5}}" />
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
