<codebox>
#### 进度条
标准的进度条。

```html
<template>
    <div>
        <s-progress percent="{{30}}"/>
        <s-progress percent="{{50}}" status="active"/>
        <s-progress percent="{{70}}" status="exception"/>
        <s-progress percent="{{100}}"/>
        <s-progress percent="{{50}}" showInfo="{{false}}"/>
    </div>
</template>

<script>
import {Progress} from 'santd';

export default {
    components: {
        's-progress': Progress
    }
}
</script>
```
</codebox>
