<codebox>
#### 静态位置
不浮动，状态不随页面滚动变化

```html
<template>
    <div id="components-anchor-demo-static">
        <s-anchor affix="{{false}}">
            <s-link href="#components-anchor-demo-basic" title="Basic Demo" />
            <s-link href="#components-anchor-demo-static" title="Static Demo" />
            <s-link href="#api" title="API">
                <s-link href="#anchor-props" title="Anchor Props" />
                <s-link href="#link-props" title="Link Props" />
            </s-link>
        </s-anchor>
    </div>
</template>
<script>
import {Anchor} from 'santd';

export default {
    components: {
        's-anchor': Anchor,
        's-link': Anchor.Link
    }
}
</script>
```
</codebox>
