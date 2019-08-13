<text lang="cn">
#### 封顶数字
超过 `overflowCount` 的会显示为 `\${overflowCount}+`，默认的 `overflowCount` 为 `99`。
</text>

```html
<template>
    <div>
        <s-badge count="{{99}}">
            <a href="#" class="head-example"></a>
        </s-badge>
        <s-badge count="{{100}}">
            <a href="#" class="head-example"></a>
        </s-badge>
        <s-badge count="{{99}}" overflowCount="{{10}}">
            <a href="#" class="head-example"></a>
        </s-badge>
        <s-badge count="{{1000}}" overflowCount="{{999}}">
            <a href="#" class="head-example"></a>
        </s-badge>
    </div>
</template>
<script>
import badge from 'santd/badge';
import button from 'santd/button';
export default {
    components: {
        's-badge': badge
    },
}
</script>
```
