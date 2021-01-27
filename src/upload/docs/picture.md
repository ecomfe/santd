<text lang="cn">
#### 图片列表样式
上传文件为图片，可展示本地缩略图。IE8/9 不支持浏览器本地缩略图展示（[Ref](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)），可以写 `thumbUrl` 属性来代替。
</text>

```html
<template>
    <div>
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            defaultFileList="{{fileList}}"
            listType="picture"
        >
            <s-button>
                <s-icon type="upload" /> Upload
            </s-button>
        </s-upload>
        <br /><br />
        <s-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            defaultFileList="{{fileList}}"
            listType="picture"
            class="upload-list-inline"
        >
            <s-button>
                <s-icon type="upload" /> Upload
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
    },
    initData() { 
        return { 
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }, { 
                uid: '-2',
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }]
        }
    }
}
</script>
<style>
.upload-list-inline .san-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
}
.upload-list-inline .san-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
}
.upload-list-inline .san-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
}
</style>
```
