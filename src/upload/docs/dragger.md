<text lang="cn">
#### 拖拽上传
把文件拖入指定区域，完成上传，同样支持点击上传。
设置 `multiple` 后，在 `IE10+` 可以一次上传多个文件。
</text>

```html
<template>
    <div>
        <s-dragger
            name="file"
            multiple="{{true}}"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            on-change="handleChange"
        >
            <p class="san-upload-drag-icon">
                <s-icon type="inbox" />
            </p>
            <p class="san-upload-text">Click or drag file to this area to upload</p>
            <p class="san-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </s-dragger>
    </div>
</template>
<script>
import Upload from 'santd/upload';
import Button from 'santd/button';
import Icon from 'santd/icon';

const Dragger = Upload.Dragger;

export default {
    components: {
        's-dragger': Dragger,
        's-button': Button,
        's-icon': Icon
    },
    handleChange(info) {
    }
}
</script>
```
