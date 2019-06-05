<cn>
#### 图片列表样式
上传文件为图片，可展示本地缩略图。`IE8/9` 不支持浏览器本地缩略图展示，可以写 `thumbUrl` 属性来代替。
</cn>

```html
<template>
    <div>
        <s-upload
            action="http://localhost:3000/upload"
            multiple="{{true}}"
            fileList="{{defaultFileList}}"
            listType="picture"
            on-change="handleChange"
        >
            <s-button>
                <s-icon type="upload"></s-icon>Click to Upload
            </s-button>
        </s-upload>
    </div>
</template>
<script>
import upload from 'santd/upload';
import button from 'santd/button';
import icon from 'santd/icon';

export default {
    components: {
        's-upload': upload,
        's-button': button,
        's-icon': icon
    },
    initData() {
        return {
            defaultFileList: [{
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
              uid: '-2',
              name: 'yyy.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    },
    handleChange(param) {
        console.log('-----------handleChange', param);
    }
}
</script>
```