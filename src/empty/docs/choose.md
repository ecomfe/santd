<text lang="cn">
#### 选择图片
可以通过设置 image 为 Empty.PRESENTED_IMAGE_SIMPLE 选择另一种风格的图片。
</text>

```html
<template>
    <div>
        <s-empty image="{{image}}" />
    </div>
</template>
<script>
import {Empty} from 'santd';

export default {
    initData() {
        return {
            image: Empty.PRESENTED_IMAGE_SIMPLE
        };
    },
    components: {
        's-empty': Empty
    }
}
</script>
```
