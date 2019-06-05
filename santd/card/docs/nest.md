<cn>
#### 内部卡片
可以放在普通卡片内部，展示多层级结构的信息。
</cn>

```html
<template>
    <div>
        <s-card
            title="Card title"
            hoverable>
            <p>Group title</p>
            <s-card
            type="inner"
            title="Inner Card title"
            hoverable>
                <template slot="extra">
                    <a href="#">More</a>
                </template>
                Inner Card content
            </s-card>
            <s-card
            type="inner"
            title="Inner Card title"
            style="margin-top: 12px;">
                <template slot="extra">
                    <a href="#">More</a>
                </template>
                Inner Card content
            </s-card>
        </s-card>
    </div>
</template>
<script>
import Card from 'santd/card';
import Avatar from 'santd/avatar';
import {Col, Row} from 'santd/grid';
const { Meta } = Card;

export default {
    components: {
        's-card': Card,
        's-meta': Meta,
        's-avatar': Avatar,
        's-col': Col,
        's-row': Row,
        's-cardgrid': Card.Grid
    }
}
</script>
```
