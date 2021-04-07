<text lang="cn">
#### 照片墙
用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。
</text>

```html
<template>
    <div class="clearfix">
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList="{{fileList}}"
            showButton="{{fileList.length < 3}}"
            on-change="handleChange"
            on-preview="handlePreview"
        >
            <s-icon type="plus" />
            <div class="san-upload-text">Upload</div>
        </s-upload>
        <s-modal visible="{{previewVisible}}" hasFooter="{{false}}" on-cancel="handleCancel">
            <img alt="example" style="width: 100%" src="{{previewImage}}" />
        </s-modal>
    </div>
</template>
<script>
import {Upload, Icon, Modal} from 'santd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default {
    components: {
        's-upload': Upload,
        's-icon': Icon,
        's-modal': Modal
    },
    initData() {
        return {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }]
        };
    },
    handleChange(params) {
        console.log(params);
        this.data.set('fileList', params.fileList);
    },
    handleCancel() {
        this.data.set('previewVisible', false);
    },
    handlePreview(file) {
        const that = this;
        if (!file.url && !file.preview) {
            getBase64(file.originFileObj).then(function (preview) {
                that.data.set('previewImage', preview);
                that.data.set('previewVisible', true);
            });
        }
        that.data.set('previewImage', file.url);
        that.data.set('previewVisible', true);
    }
}
</script>

<style type="text/css">
.san-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.san-upload-select-picture-card .san-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
```
