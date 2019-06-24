<cn>
#### 点击上传
经典款式，用户点击按钮弹出文件选择框。
</cn>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            name="file"
            headers="{{{authorization: 'authorization-text'}}}"
            on-change="handleChange"
        >
            <s-button>
                <s-icon type="upload" /> Click to Upload
            </s-button>
        </s-upload>
    </div>
</template>
<script>
import Upload from 'santd/upload';
import Button from 'santd/button';
import Icon from 'santd/icon';
import Message from 'santd/message';

export default {
    components: {
        's-upload': Upload,
        's-button': Button,
        's-icon': Icon
    },
    handleChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            Message.success(`${info.file.name} file uploaded successfully`);
        }
        else if (info.file.status === 'error') {
            Message.error(`${info.file.name} file upload failed.`);
        }
    }
}
</script>
```
