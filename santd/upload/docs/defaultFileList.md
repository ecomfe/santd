<cn>
#### 已上传的文件列表
使用 `defaultFileList` 设置已上传的内容。
</cn>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            name="file"
            on-change="handleChange"
            defaultFileList="{{defaultFileList}}"
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

export default {
    components: {
        's-upload': Upload,
        's-button': Button,
        's-icon': Icon
    },
    initData() {
        return {
            defaultFileList: [{
                uid: '1',
                name: 'xxx.png',
                status: 'done',
                response: 'Server Error 500', // custom error message to show
                url: 'http://www.baidu.com/xxx.png'
            }, {
                uid: '2',
                name: 'yyy.png',
                status: 'done',
                url: 'http://www.baidu.com/yyy.png'
            }, {
                uid: '3',
                name: 'zzz.png',
                status: 'error',
                response: 'Server Error 500', // custom error message to show
                url: 'http://www.baidu.com/zzz.png'
            }]
        }
    },
    handleChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
    }
}
</script>
```
