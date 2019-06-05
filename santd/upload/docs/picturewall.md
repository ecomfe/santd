<cn>
#### 照片墙
用户可以上传图片并在列表中显示缩略图。
</cn>

```html
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
<template>
    <div>
        <s-upload
            action="http://localhost:3000/upload"
            multiple="{{true}}"
            fileList="{{fileList}}"
            listType="picture-card"
            on-change="handleChange"
        >
            <div>
                <s-icon type="plus"/>
                <div class="san-upload-text">Upload</div>
            </div>
        </s-upload>
    </div>
</template>
<script>
import upload from 'santd/upload';
import icon from 'santd/icon';

export default {
    components: {
        's-upload': upload,
        's-icon': icon
    },
    initData() {
        return {
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    },
    handleChange(param) {
        console.log('-----------handleChange', param);
    }
}
</script>
```