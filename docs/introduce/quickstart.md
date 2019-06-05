---
title: 快速开始
header: santddoc
nav: introduce
sidebar: quickstart
---

santd是基于 Ant Design 使用san实现的UI框架

### 安装
指定内部源，使用npm安装
``` bash
$ npm install @baidu/santd registry=http://registry.npm.baidu-int.com
```

### 使用

```html
<script>
import {Button} from '@baidu/santd';
export default {
    components: {
        's-button': Button
    },
    template: `
        <div>
            <s-button type="default">Default</s-button>
        </div>
    `
}
</script>
```

### 按需加载
如果使用了babel，可以使用[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)来进行按需加载，使用这个插件后，可以写成
```javascript
import {Button} from '@baidu/santd';
```
仅加载Button组件以及样式
webpack loader配置如下
```javascript
{
    loader: "babel-loader",
    options: {
        plugins: [['import', {
            libraryName: '@baidu/santd',
            style: 'css'
        }]]
    }
}
```
未使用babel，可以通过以下写法加载指定组件以及样式
```javascript
import Button from '@baidu/santd/lib/button';
import '@baidu/santd/lib/button/style/css';
```