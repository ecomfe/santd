<text lang="cn">
#### 限制数量
通过 maxCount 限制上传数量。当为 1 时，始终用最新上传的代替当前。
</text>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            on-change="handleChange"
            maxCount="1"
        >
            <s-button>
                <s-icon type="upload" /> Upload(Max: 1)
            </s-button>
        </s-upload>
        <br />
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            on-change="handleChange"
            maxCount="3"
        >
            <s-button>
                <s-icon type="upload" /> Upload(Max: 3)
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
