<cn>
#### 完全控制的上传列表
使用 `fileList` 对列表进行完全控制，可以实现各种自定义功能，以下演示三种情况：

1. 上传列表数量的限制。
2. 读取远程路径并显示链接。
</cn>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            on-change="handleChange"
            multiple
            fileList="{{fileList}}"
        >
            <s-button>
                <s-icon type="upload" /> Upload
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
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png'
            }]
        }
    },
    handleChange(info) {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.data.set('fileList', fileList);
    }
}
</script>
```
