<text lang="cn">
#### 相册模式
从一张图片点开相册。
</text>

```html
<template>
    <div>
        <s-image-preview-group>
            <s-image
                src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            <s-image
                src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
        </s-image-preview-group>
    </div>
</template>

<script>
import {Image} from 'santd';

export default {
    components: {
        's-image': Image,
        's-image-preview-group': Image.PreviewGroup
    }
}
</script>
```
