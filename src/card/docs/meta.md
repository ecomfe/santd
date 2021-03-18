<codebox>
#### 更灵活的内容展示
可以利用 `Card.Meta` 支持更灵活的内容。

```html
<template>
    <div>
        <s-card title="Card title" hoverable="{{true}}" style="width: 240px">
            <template slot="cover">
                <img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096030542&di=76297da1f83761c2bdd3741c767f73d8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc789ae0679f08202399f997c23929198%2F5bafa40f4bfbfbedc1a67c5a72f0f736afc31f13.jpg" />
            </template>
            <s-meta title="Night sky" description="www.instagram.com" />
        </s-card>
    </div>
</template>
<script>
import {Card} from 'santd';

export default {
    components: {
        's-card': Card,
        's-meta': Card.Meta
    }
}
</script>
```
</codebox>
