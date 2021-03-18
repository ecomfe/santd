<codebox>
#### 内部卡片
可以放在普通卡片内部，展示多层级结构的信息。

```html
<template>
    <div>
        <s-card title="Card title">
            <p>Group title</p>
            <s-card type="inner" title="Inner Card title">
                <template slot="extra">
                    <a href="#">More</a>
                </template>
                Inner Card content
            </s-card>
            <s-card type="inner" title="Inner Card title" style="margin-top: 12px;">
                <template slot="extra">
                    <a href="#">More</a>
                </template>
                Inner Card content
            </s-card>
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
