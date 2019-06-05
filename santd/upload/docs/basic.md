<cn>
#### 点击上传
经典款式，用户点击按钮弹出文件选择框。使用 `defaultFileList` 设置已上传的内容
</cn>

```html
<template>
    <div>
        <s-upload
            action="http://localhost:3000/upload"
            multiple="{{true}}"
            defaultFileList="{{defaultFileList}}"
            listType="text"
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
                uid: '1',
                name: 'xxx.png',
                status: 'done',
                response: 'Server Error 500', // custom error message to show
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              }, {
                uid: '2',
                name: 'yyy.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              }, {
                uid: '3',
                name: 'zzz.png',
                status: 'error',
                response: 'Server Error 500', // custom error message to show
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }]
        }
    },
    handleChange(param) {
        console.log('-----------handleChange', param);
    }
}
</script>
```
