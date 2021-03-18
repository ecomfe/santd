<codebox>
#### 监听锚点链接改变
监听锚点链接改变。

```html
<template>
    <div>
        <s-anchor affix="{{false}}" on-change="handleChange">
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
    },
    handleChange(link) {
        console.log('Anchor:OnChange', link);
    }
}
</script>
```
</codebox>
