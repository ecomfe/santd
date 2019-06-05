## API

详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string | 无 |
| action | 必选参数, 上传的地址 | string | 无 |
| directory | 支持上传文件夹（[caniuse](https://caniuse.com/#feat=input-file-directory)）| boolean | false |
| data | 上传所需参数或返回上传参数的方法 | object\|(file) => object | 无 |
| defaultFileList | 默认已经上传的文件列表 | object\[] | 无 |
| disabled | 是否禁用 | boolean | false |
| fileList | 已经上传的文件列表（受控 | object\[] | 无 |
| headers | 设置上传的请求头部，IE10 以上有效 | object | 无 |
| listType | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card` | string | 'text' |
| multiple | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件。 | boolean | false |
| name | 发到后台的文件参数名 | string | 'file' |
| showUploadList | 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon | Boolean or { showPreviewIcon?: boolean, showRemoveIcon?: boolean } | true |
| withCredentials | 上传请求时是否携带 cookie | boolean | false |
| openFileDialogOnClick | 点击打开文件对话框 | boolean | true |
| on-change | 上传文件改变时的状态，详见 [onChange](#onChange) | Function | 无 |
| on-preview | 点击文件链接或预览图标时的回调 | Function | 无 |
| on-remove   | 点击移除文件时的回调 | Function | 无   |

### onChange

> 上传中、完成、失败都会调用这个函数。

文件状态改变的回调，返回为：

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png'   // 文件名
      status: 'done', // 状态有：uploading done error removed
      response: '{"status": "success"}', // 服务端响应内容
      linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
   }
   ```

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。