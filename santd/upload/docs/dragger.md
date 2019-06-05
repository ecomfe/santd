<cn>
#### 拖拽上传
把文件拖入指定区域，完成上传，同样支持点击上传。
设置 `multiple` 后，在 `IE10+` 可以一次上传多个文件。
</cn>

```html
<template>
    <div>
        <s-dragger
            name="file"
            multiple="{{true}}"
            action="http://localhost:3000/upload"
            on-change="handleChange"
        >
            <p className="san-upload-drag-icon">
              <s-icon type="inbox"/>
            </p>
            <p className="san-upload-text">Click or drag file to this area to upload</p>
            <p className="san-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </s-dragger>
    </div>
</template>
<script>
import upload from 'santd/upload';
import button from 'santd/button';
import icon from 'santd/icon';

const Dragger = upload.Dragger
export default {
    components: {
        's-dragger': Dragger,
        's-button': button,
        's-icon': icon
    },
    initData() {
        return {
        };
    },
    handleChange(param) {
        console.log('-----------handleChange', param);
    }
}
</script>
```