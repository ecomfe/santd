<codebox>
#### 简洁卡片
只包含内容区域。

```html
<template>
    <div>
        <s-card style="width: 300px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </s-card>
    </div>
</template>
<script>
import {Card} from 'santd';

export default {
    components: {
        's-card': Card
    }
}
</script>
```
</codebox>
