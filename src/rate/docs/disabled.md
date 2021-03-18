<codebox>
#### 只读
只读，无法进行鼠标交互。

```html
<template>
    <div class="san-rate">
        <s-rate defaultValue="{{2}}" disabled="{{true}}" />
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
