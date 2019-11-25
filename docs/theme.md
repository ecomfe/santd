# 定制主题

Santd 的组件结构及样式和 Antd React 完全一致，你可以参考 Antd React 的定制方式进行配置。

Ant Design 设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于全局样式（主色、圆角、边框）和指定组件的视觉定制。

![theme](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Ant Design San 的样式变量

antd 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整。

以下是一些最常用的通用变量，所有样式变量可以在 [这里](https://github.com/ecomfe/santd/blob/master/src/core/styles/themes/default.less) 找到。

```javascript
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary : rgba(0, 0, 0, .45); // 次文本色
@disabled-color : rgba(0, 0, 0, .25); // 失效色
@border-radius-base: 4px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
```

如果以上变量不能满足你的定制需求，可以给我们提 issue。

## 定制方式

原理上是使用 less 提供的 [modifyVars](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 的方式进行覆盖变量。下面将针对不同的场景提供一些常用的定制方式。

### 在 webpack 中定制主题

我们以 webpack@4 为例进行说明，以下是一个 webpack.config.js 的典型例子，对 [less-loader](https://github.com/webpack-contrib/less-loader) 的 options 属性进行相应配置。

```javascript
// webpack.config.js
module.exports = {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader', // translates CSS into CommonJS
        }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                    // or
                    'hack': `true; @import "your-less-file-path.less";`, // Override with less file
                },
                javascriptEnabled: true,
            },
        }],
        // ...other rules
    }],
    // ...other config
}
```

注意 less-loader 的处理范围不要过滤掉 node_modules 下的 santd 包

### 配置 less 变量文件

另外一种方式是建立一个单独的 less 变量文件，引入这个文件覆盖 santd.less 里的变量。

```javascript
@import '~santd/dist/santd.less'; // 引入官方提供的 less 样式入口文件
@import 'your-theme-file.less'; // 用于覆盖上面定义的变量
```

注意，这种方式已经载入了所有组件的样式，不需要也无法和按需加载插件 babel-plugin-import 的 style 属性一起使用。
