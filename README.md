<p align="center">
  <a href="https://ecomfe.github.com/santd">
    <img width="200" src="https://b.bdstatic.com/searchbox/image/gcp/20191202/2915011424.png">
  </a>
</p>

<h1 align="center">Ant Design for San</h1>

<div align="center">
<a href="https://baidu.github.io/san/">San</a> UI Toolkit for <a href="https://ant.design/">Ant Design</a>

[![](https://flat.badgen.net/npm/v/santd?icon=npm)](https://www.npmjs.com/package/santd) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

[![](https://cdn-images-1.medium.com/max/2000/1*NIlj0-TdLMbo_hzSBP8tmg.png)](http://ecomfe.github.io/santd)

English | [简体中文](./README-zh_CN.md)

## ✨ Features

- An enterprise-class UI design system for desktop applications.
- A set of high-quality San components out of the box.
- Shared [Ant Design of React](https://ant.design/docs/spec/introduce) design resources.

## 🖥 Environment Support

- Modern browsers and Internet Explorer 9+ (with polyfills)
- Server-side Rendering

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE10, IE11, Edge                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## 📦 Install

**We recommend using npm to install**，it not only makes development easier，but also allow you to take advantage of the rich ecosystem of Javascript packages and tooling.

```bash
$ npm install santd --save
```

If you are in a bad network environment，you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm).

## 🔨 Usage

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

And import style manually:

```jsx
import "santd/dist/santd.css"; // or 'santd/dist/santd.less'
```

Or [import components on demand](https://ecomfe.github.io/santd/#docs/quickstart).

## 🌍 Internationalization

See [i18n](http://ecomfe.github.io/santd/#docs/i18n).

## 🔗 Links

- [Home page](https://ecomfe.github.io/)
- [Components](https://ecomfe.github.io/santd/#docs/introduce)
- [San](https://baidu.github.io/san/)
- [Customize Theme](http://ecomfe.github.io/santd/#/docs/theme)

## ⌨️ Development

Use Gitpod, a free online dev environment for GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ecomfe/santd)

Or clone locally:

```bash
$ git clone git@github.com:ecomfe/santd.git
$ cd santd
$ npm install
$ npm start button
```

Open your browser and visit http://127.0.0.1:8822

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/ecomfe/santd/pulls)

We welcome all contributions. You can submit any ideas as [pull requests](https://github.com/ecomfe/santd/pulls) or as [GitHub issues](https://github.com/ecomfe/santd/issues).

If you're new to posting issues, we ask that you read [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## ☀️ License

MIT