<text lang="cn">
#### 基本用法
单击图像可以放大显示。
</text>

```html
<template>
    <div>
        <s-image
            width="200"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
    </div>
</template>

<script>
import {Image} from 'santd';

export default {
    components: {
        's-image': Image
    }
}
</script>
```
