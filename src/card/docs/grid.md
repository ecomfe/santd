<text lang="cn">
#### 网格型内嵌卡片
一种常见的卡片内容区隔模式。
</text>

```html
<template>
    <div style="background: #ECECEC; padding: 30px;">
        <s-card title="Card title">
            <s-cardgrid style="width: 25%">content</s-cardgrid>
            <s-cardgrid style="width: 25%">content</s-cardgrid>
            <s-cardgrid style="width: 25%">content</s-cardgrid>
            <s-cardgrid style="width: 25%">content</s-cardgrid>
            <s-cardgrid style="width: 25%">content</s-cardgrid>
            <s-cardgrid style="width: 25%">content</s-cardgrid>
        </s-card>
    </div>
</template>
<script>
import {Card} from 'santd';

export default {
    components: {
        's-card': Card,
        's-cardgrid': Card.Grid
    }
}
</script>
```
