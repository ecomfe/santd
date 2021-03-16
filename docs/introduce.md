# Ant Design of San

这里是 Ant Design 的 San 实现，开发和服务于企业级后台产品。

## 特性

* 提炼自企业级中后台产品的交互语言和视觉风格。
* 开箱即用的高质量 San 组件。
* 共享[Ant Design of React](http://ant-design.gitee.io/docs/spec/introduce-cn)设计工具体系。

## 支持环境

* 现代浏览器和 IE9 及以上（需要 [polyfills](https://vue.ant.design/docs/vue/getting-started-cn/#%E5%85%BC%E5%AE%B9%E6%80%A7)）。
* 支持服务端渲染。

## 安装

### 使用 npm 安装

我们推荐使用 npm 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```
$ npm install santd --save
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 浏览器引入
在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 santd。

我们在 npm 发布包内的 santd/dist 目录下提供了 `santd.js` `santd.css` 以及 `santd.min.js` `santd.min.css`。

> 强烈不推荐使用已构建文件，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

> 注意：引入 santd.js 前你需要自行引入 san 和 dayjs。

## 示例

```javascript
import {DatePicker} from 'santd';
const App = san.defineComponent({
    components: {
        's-datepicker': DatePicker
    },
    template: '<div><s-datepicker /></div>'
});
```

引入样式：

```javascript
import 'santd/dist/santd.css';
```

### 按需加载

下面两种方式都可以只加载用到的组件。

* 使用 babel-plugin-import（推荐）。

```javascript
{
    loader: 'babel-loader',
    options: {
        plugins: [['import', {
            libraryName: 'santd',
            libraryDirectory: 'es',
            style: true
        }]]
    }
}
```

然后只需从 santd 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

```javascript
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { DatePicker } from 'santd';
```

* 手动引入

```javascript
import DatePicker from 'santd/es/date-picker';
import 'santd/es/date-picker/style';
```

## 如何贡献

如果你希望参与贡献，欢迎 [Pull Request](https://github.com/ecomfe/santd/pulls)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/~sgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。
