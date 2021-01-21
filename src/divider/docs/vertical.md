<text lang="cn">
#### 垂直分割线
使用 `type="vertical"` 设置为行内的垂直分割线。
</text>

```html
<template>
    <div>
        Text
        <s-divider type="vertical" />
        <a href="#">Link</a>
        <s-divider type="vertical" />
        <a href="#">Link</a>
    </div>
</template>
<script>
import {Divider} from 'santd';

export default {
    components: {
        's-divider': Divider
    }
}
</script>
```
