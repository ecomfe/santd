<codebox>
#### 自定义预览
自定义本地预览，用于处理非图片格式文件（例如视频文件）。

```html
<template>
    <div>
        <s-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            name="file"
            listType="picture"
            previewFile="{{previewFile}}"
        >
            <s-button>
                <s-icon type="upload" /> Upload
            </s-button>
        </s-upload>
    </div>
</template>
<script>
import axios from 'axios';
import {Upload, Button, Icon} from 'santd';

export default {
    components: {
        's-upload': Upload,
        's-button': Button,
        's-icon': Icon
    },
    initData() { 
        return { 
            previewFile(file) {
                console.log('Your upload file:', file);
                // Your process logic. Here we just mock to the same file
                return axios({
                    url: 'https://next.json-generator.com/api/json/get/4ytyBoLK8',
                    method: 'POST',
                    data: file,
                })
                .then(res => res.data)
                .then(({ thumbnail }) => thumbnail);
            }
        }
    }
}
</script>
```
</codebox>
