<text lang="cn">
#### 手动上传
`beforeUpload` 返回 `false` 后，手动上传文件。
</text>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            on-change="handleChange"
            on-remove="handleRemove"
            beforeUpload="{{beforeUpload}}"
        >
            <s-button>
                <s-icon type="upload" /> Select File
            </s-button>
        </s-upload>
        <s-button
            type="primary"
            on-click="handleUpload"
            disabled="{{fileList.length === 0}}"
            loading="{{uploading}}"
            style="margin-top: 16px;"
        >
            {{uploading ? 'Uploading' : 'Start Upload'}}
        </s-button>
    </div>
</template>
<script>
import Upload from 'santd/upload';
import Button from 'santd/button';
import Icon from 'santd/icon';
import Message from 'santd/message';
import axios from 'axios';

export default {
    components: {
        's-upload': Upload,
        's-button': Button,
        's-icon': Icon
    },
    initData() {
        const that = this;
        return {
            fileList: [],
            uploading: false,
            beforeUpload(file) {
                const fileList = that.data.get('fileList');
                that.data.set('fileList', fileList.concat(file));
                return false;
            }
        };
    },
    handleRemove(file) {
        const fileList = this.data.get('fileList');
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        this.data.set('fileList', newFileList);
    },
    handleUpload() {
        const fileList = this.data.get('fileList');
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.data.set('uploading', true);

        axios({
            url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            method: 'post',
            processData: false,
            data: formData
        }).then(response => {
            this.data.set('uploading', false);
            Message.success('upload successfully.');
        }).catch(error => {
            Message.error('upload failed.');
        });
    }
}
</script>
```
