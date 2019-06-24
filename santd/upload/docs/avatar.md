<cn>
#### 用户头像
点击上传用户头像，并使用 `beforeUpload` 限制用户上传的图片格式和大小。

> `beforeUpload` 的返回值可以是一个 Promise 以支持异步处理，如服务端校验等。
</cn>

```html
<template>
    <div>
        <s-upload
            listType="picture-card"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            name="avatar"
            className="avatar-uploader"
            showUploadList="{{false}}"
            beforeUpload="{{beforeUpload}}"
            on-change="handleChange"
        >
            <img src="{{imageUrl}}" alt="avatar" s-if="imageUrl"/>
            <div s-else>
                <s-icon type="{{loading ? 'loading' : 'plus'}}" />
                <div class="san-upload-text">Upload</div>
            </div>
        </s-upload>
    </div>
</template>
<script>
import Upload from 'santd/upload';
import Icon from 'santd/icon';
import Message from 'santd/message';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default {
    components: {
        's-upload': Upload,
        's-icon': Icon
    },
    initData() {
        return { 
            imageUrl: null,
            loading: false,
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                    Message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    Message.error('Image must smaller than 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    },
    handleChange(info) {
        if (info.file.status === 'uploading') {
            this.data.set('loading', true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.data.set('imageUrl', imageUrl);
                this.data.set('loading', false);
            });
        }
    }
}
</script>

<style>
.avatar-uploader > .san-upload {
    width: 128px;
    height: 128px;
}
</style>
```
