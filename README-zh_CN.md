<p align="center">
  <a href="https://ecomfe.github.com/santd">
    <img width="200" src="https://b.bdstatic.com/searchbox/image/gcp/20191202/2915011424.png">
  </a>
</p>

<h1 align="center">Ant Design for San</h1>

<div align="center">
一套基于 <a href="https://ant.design/">Ant Design</a> 和 <a href="https://baidu.github.io/san/">San</a> 的企业级 UI 组件库

[![](https://flat.badgen.net/npm/v/santd?icon=npm)](https://www.npmjs.com/package/santd) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

[![](https://cdn-images-1.medium.com/max/2000/1*NIlj0-TdLMbo_hzSBP8tmg.png)](http://ecomfe.github.io/santd)

[English](./README.md) | 简体中文

## ✨ 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 San 组件。
- 共享 [Ant Design of React](https://ant.design/docs/spec/introduce) 设计工具体系。

## 🖥 支持环境

- 现代浏览器和 IE9 及以上。
- 支持服务端渲染。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## 📦 安装

**我们推荐使用npm来进行安装**，它会使你的开发更简单。

```bash
$ npm install santd --save
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm).

## 🔨 使用

```jsx
import san from 'san';
import {DatePicker} from "santd";

const App = san.defineComponent({
    components: {
        's-datepicker': DatePicker
    },
    template: `<div><s-datepicker /></div>`
});

const myApp = new App();
myApp.attach(document.body);
```

手动加载样式

```jsx
import "santd/dist/santd.css"; // or 'santd/dist/santd.less'
```

或者 [按需加载](https://ecomfe.github.io/santd/#docs/quickstart).

## 🌍 国际化

请查看 [i18n](http://ecomfe.github.io/santd/#docs/i18n).

## 🔗 链接

- [官网](https://ecomfe.github.io/)
- [介绍](https://ecomfe.github.io/santd/#docs/introduce)
- [San框架](https://baidu.github.io/san/)
- [切换主题](http://ecomfe.github.io/santd/#/docs/theme)

## ⌨️ 开发

可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ecomfe/santd)

或者克隆到本地开发：

```bash
$ git clone git@github.com:ecomfe/santd.git
$ cd santd
$ npm install
$ npm start button
```

打开浏览器访问 http://127.0.0.1:8822

## 🤝 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/ecomfe/santd/pulls)

我们欢迎所有的共建者， 你可以 [pull requests](https://github.com/ecomfe/santd/pulls) 或 [GitHub issues](https://github.com/ecomfe/santd/issues).

强烈推荐阅读 [《提问的智慧》](http://www.catb.org/~esr/faqs/smart-questions.html)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)更好的问题更容易获得帮助。

## ☀️ License

MIT