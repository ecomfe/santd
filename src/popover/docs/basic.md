<text lang="cn">
#### 基本
最简单的用法，浮层的大小由内容区域决定。
</text>

```html
<template>
    <div>
        <s-popover title="Title">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <s-button type="primary">Hover Me</s-button>
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
