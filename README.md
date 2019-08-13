# santd

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*An enterprise-class UI components based on Ant Design and San.*

## 使用指南

1. 通过 npm 安装
    ```sh
    $ npm i santd --save
    ```

2. 在代码中引入
    ```js
    // 引入需要的组件
    import {Button, Layout, Affix} from 'santd';

    // 引入单个需要的组件
    import Button from 'santd/button';
    import Layout from 'santd/layout';
    import Affix from 'santd/affix';
    ```

## 开发指南

### 组件开发的一些约定
1. 代码规范遵循 [fecs](https://github.com/ecomfe/fecs) 规范
2. 公共方法放到santd/core/util下
3. 公共组件放到santd/core下
4. 引用其他组件已有样式，使用相对路径
5. style下由index.js统一导出样式
6. 单个组件导出多个对象时，{组件名}.{对象} = XXX; export default {组件名};

### 版本依赖

组件编译需要node 9以上版本，注意升级

### 安装全局依赖

> karma-cli ---测试执行过程管理工具,提供一个方便运行测试的环境, 可全局执行karma命令

```bash
npm i -g karma-cli
```

### 安装依赖

```bash
npm i
# 本地运行
npm start button
# 如果想看button组件，那么后面加button，如果是看icon组件，那执行 npm start icon,以此类推
```

### 开发组件
全局安装cli --- hulk-cli

```bash
npm i -g @baidu/hulk-cli
hulk init hulk/antd-san-component-template my-component-folder
cd my-component-folder
```

### 测试

```bash
# 与本地开发同理
npm run test button
# 如果不传参数，那么默认的是all
npm run test
```

### check 目录规范
如果组件不是通过cli生成的，那最好需要进行一次目录规范的check，防止发生问题

```bash
# 遍历所有组件进行规范检查
npm run check

# 或者指定检查哪个组件
npm run check button
```

### 启动文档

```bash
npm run docs
```

## License

[MIT](./LICENSE)
