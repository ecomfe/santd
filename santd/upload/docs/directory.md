<cn>
#### 文件夹上传
支持上传一个文件夹里的所有文件。
</cn>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            directory
        >
            <s-button>
                <s-icon type="upload" /> Upload Directory
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
    }
}
</script>
```
