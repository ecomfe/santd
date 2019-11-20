# 快速上手

Ant Design San 致力于提供给程序员愉悦的开发体验。

> 在开始之前，推荐先学习 San 和 ES2015，并正确安装和配置了 Node.js v8 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 San 全家桶的正确开发方式。如果你刚开始学习前端或者 San，将 UI 框架作为你的第一步可能不是最好的主意。

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
