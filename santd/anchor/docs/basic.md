<text lang="cn">
#### 基本
最简单的用法
</text>

```html
<template>
    <div>
        <s-anchor>
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
import Anchor from 'santd/anchor';

export default {
    components: {
        's-anchor': Anchor,
        's-link': Anchor.Link
    }
}
</script>
```
