<text lang="cn">
#### 基本
最简单的用法。
</text>

```html
<template>
    <div>
        <s-tooltip placement="topLeft" title="prompt text">
            <s-button>Align edge / 边缘对齐</s-button>
        </s-tooltip>
        <s-tooltip placement="topLeft" title="prompt text" arrowPointAtCenter="{{true}}">
            <s-button>Arrow points to center / 箭头指向中心</s-button>
        </s-tooltip>
    </div>
</template>
<script>
import tooltip from 'santd/tooltip';
import button from 'santd/button';

export default {
    components: {
        's-tooltip': tooltip,
        's-button': button
    }
}
</script>
```
