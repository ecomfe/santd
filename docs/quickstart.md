Santd 是基于 Ant Design 使用 San 实现的 UI 框架

### 安装

指定内部源，使用 npm 安装

```bash
$ npm install santd
```

### 使用

```html
<script>
    import {Button} from 'santd';
    export default {
        components: {
            's-button': Button
        },
        template: `
        <div>
            <s-button type="default">Default</s-button>
        </div>
    `
    };
</script>
```

### 按需加载

如果使用了 babel，可以使用[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)来进行按需加载，使用这个插件后，可以写成

```javascript
import {Button} from 'santd';
```

仅加载 Button 组件以及样式
webpack loader 配置如下

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

未使用 babel，可以通过以下写法加载指定组件以及样式

```javascript
import Button from 'santd/lib/button';
import 'santd/lib/button/style/css';
```
