<text lang="cn">
#### 无边框
在灰色背景上使用无边框的卡片。
</text>

```html
<template>
    <div style="background: #ECECEC; padding: 30px;">
        <s-card
            title="Card title"
            hoverable
            style="width: 300px"
            bordered="{{false}}"
        >
            <template slot="extra"><a href="#">More</a></template>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </s-card>
    </div>
</template>
<script>
import Card from 'santd/card';

export default {
    components: {
        's-card': Card
    }
}
</script>
```
