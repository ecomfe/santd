<text lang="cn">
#### 设置锚点滚动偏移量
锚点目标滚动到屏幕正中间。
</text>

```html
<template>
    <div>
        <s-anchor affix="{{false}}" targetOffset="{{targetOffset}}">
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
    initData() {
        return {
            targetOffset: undefined
        };
    },
    attached() {
        this.data.set('targetOffset', window.innerHeight / 2);
    },
}
</script>
```
