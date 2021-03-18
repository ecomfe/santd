<codebox>
#### 文件夹上传
支持上传一个文件夹里的所有文件。

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            directory="{{true}}"
        >
            <s-button>
                <s-icon type="upload" /> Upload Directory
            </s-button>
        </s-upload>
    </div>
</template>
<script>
import {Upload, Button, Icon} from 'santd';

export default {
    components: {
        's-upload': Upload,
        's-button': Button,
        's-icon': Icon
    }
}
</script>
```
</codebox>
