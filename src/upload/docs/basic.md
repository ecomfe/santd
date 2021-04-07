<text lang="cn">
#### 点击上传
经典款式，用户点击按钮弹出文件选择框。
</text>

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
import {Upload, Button, Icon} from 'santd';
import message from 'santd/es/message';
import 'santd/es/message/style';

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
            message.success(`${info.file.name} file uploaded successfully`);
        }
        else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
}
</script>
```
