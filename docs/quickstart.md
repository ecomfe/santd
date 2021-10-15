# 快速上手

Santd致力于提供给程序员愉悦的开发体验。

> 在开始之前，推荐先学习 San 和 ES2015，并正确安装和配置了 Node.js v8 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 San 全家桶的正确开发方式。如果你刚开始学习前端或者 San，将 UI 框架作为你的第一步可能不是最好的主意。

## 第一个例子

最简单的使用方式参照以下 CodeSandbox 演示。

<a href="https://codesandbox.io/s/hungry-raman-8xmiz" target="_blank"><img src="https://codesandbox.io/static/img/play-codesandbox.svg"/></a>
### 1. 使用组件

```javascript
import san from 'san';
import {DatePicker, Message} from 'santd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'santd/dist/santd.css';
import './index.css';

dayjs.locale('zh-cn');

const App = san.defineComponent({
    initData() {
        return {
            date: null
        }
    },
    components: {
        's-datepicker': DatePicker
    },
    handleChange({date}) {
        Message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
        this.data.set('date', date);
    },
    getDate(date) {
        return date ? date.format('YYYY-MM-DD') : '未选择';
    },
    template: `<div style="width: 400px; margin: 100px auto;">
        <s-datepicker on-change="handleChange" />
        <div style="margin-top: 20px;">
            当前日期：{{getDate(date)}}
        </div>
    </div>`
});

const app = new App();
app.attach(document.body);
```

### 2. 探索更多组件用法

你可以在左侧菜单查看组件列表，比如 [Alert](/#/components/alert) 组件，组件文档中提供了各类演示，最下方有组件 API 文档可以查阅。在代码演示部分找到第一个例子，点击右下角的图标展开代码。

然后依照演示代码的写法，在之前的代码里修改 index.js，首先在 import 内引入 Alert 组件：

```javascript
import {DatePicker, message, Alert} from 'santd';
```

然后添加相应的代码：

```javascript
const App = san.defineComponent({
    initData() {
        return {
            date: null
        }
    },
    components: {
        's-datepicker': DatePicker,
        's-alert': Alert
    },
    handleChange({date}) {
        message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
        this.data.set('date', date);
    },
    getDate(date) {
        return date ? date.format('YYYY-MM-DD') : '未选择';
    },
    template: `<div style="width: 400px; margin: 100px auto;">
        <s-datepicker on-change="handleChange" />
        <div style="margin-top: 20px;">
            <s-alert message="当前日期：{{getDate(date)}}" type="success" />
        </div>
    </div>`
});
```

在右侧预览区就可以看到如图的效果。

![avatar](https://gw.alipayobjects.com/zos/antfincdn/Up3%24VYhN0S/134614ee-7440-46f1-a797-fa6f6b3e300f.png)

好的，现在你已经会使用基本的 santd 组件了，你可以在这个例子中继续探索其他组件的用法。如果你遇到组件的 bug，也推荐建一个可重现的 codesandbox 来报告 bug。

## 兼容性

Ant Design San 支持所有的现代浏览器和 IE9+。

| ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) <br/> IE \ Edge | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) <br/> Firefox | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) <br/> Chrome | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) <br/> Safari | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) <br/> Opera|
| ---                                                                                                  | ---                                                                                                                  | ---                                                                                                              | ---                                                                                                              |---|
|IE9, IE10, IE11, Edge|last 2 versions| last 2 versions| last 2 versions| last 2 versions|

我们对 IE9/10 提供有限度的支持，部分样式和动画在 IE9/10 下的表现会比较裸。少数组件使用到了 Flex 布局，在 IE9/10 下也会有问题。

对于 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) 来解决浏览器兼容问题。


## 自行构建

如果想自己维护工作流，我们推荐使用 webpack 进行构建和调试。理论上你可以利用 San 生态圈中的 各种脚手架 进行开发。

## 按需加载

可以通过以下的写法来按需加载组件。

```javascript
import Button from 'santd/es/button';
import 'santd/es/button/style'
```

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，加入这个插件后。你可以仍然这么写：

```javascript
import { Button } from 'santd';
```

插件会帮你转换成 santd/es/xxx 的写法。另外此插件配合 style 属性可以做到模块样式的按需自动加载。
