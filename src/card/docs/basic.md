<codebox>
#### 典型卡片
包含标题、内容、操作区域。

```html
<template>
    <div>
        <s-card
            title="Default size card"
            style="width: 300px;margin-bottom: 20px;"
        >
            <template slot="extra"><a href="#">More</a></template>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </s-card>
        <s-card
            title="Small size card"
            size="small"
            style="width: 300px"
        >
            <template slot="extra"><a href="#">More</a></template>
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
