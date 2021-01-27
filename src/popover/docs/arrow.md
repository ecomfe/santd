<text lang="cn">
#### 箭头指向
设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。
</text>

```html
<template>
    <div>
        <s-popover title="Title" placement="topLeft">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <s-button>Align edge / 边缘对齐</s-button>
        </s-popover>
        <s-popover title="Title" placement="topLeft" arrowPointAtCenter="{{true}}">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <s-button>Arrow points to center / 箭头指向中心</s-button>
        </s-popover>
    </div>
</template>
<script>
import {Popover, Button} from 'santd';

export default {
    components: {
        's-popover': Popover,
        's-button': Button
    }
}
</script>
```
