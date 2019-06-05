<cn>
#### 自定义on-Click事件
点击锚点不记录历史。
</cn>

```html
<template>
    <div>
        <s-anchor affix="{{false}}" on-click="handleClick">
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
    },
    handleClick({e, link}) {
        e.preventDefault();
        console.log(link);
    }
}
</script>
```
