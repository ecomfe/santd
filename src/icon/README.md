## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型。遵循图标的命名规范 | string | - |
| style | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties | - |
| theme | 图标主题风格。可选实心、描线、双色等主题风格，适用于官方图标 | 'filled' \| 'outlined' \| 'twoTone' | `outlined` |
| spin | 是否有旋转动画 | boolean | false |
| rotate | 图标旋转角度 | number | - |
| component | 控制如何渲染图标，通常是一个渲染根标签为 svg 的 San 组件，会使 type 属性失效 | SanNode | - |
| loading | 显示loading图标 | boolean | false |
| twoToneColor | 双色icon。设置双色图标的主要颜色 | string(十六进制颜色) | - |

## SVG图标

我们使用了 `SVG` 图标，从而带来了以下优势：

* 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
* 在低端设备上 SVG 有更好的清晰度。
* 支持多色图标。
* 对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。

其中 `theme`, `twoToneColor` 是新增加的属性。最佳实践是给使用的 `<s-icon />` 组件传入属性 theme 以明确图标的主题风格。例如：

```html
<s-icon type="star" theme="filled" />
```

所有的图标都会以 `<svg>` 标签渲染，可以使用 `style` 和 `class` 设置图标的大小和单色图标的颜色。例如：
```html
<s-icon type="message" style="fontSize: 16px; color: #08c;"/>
```

## 双色图标主色
对于双色图标，可以通过使用 Icon.getTwoToneColor() 和 Icon.setTwoToneColor(colorString) 来全局设置图标主色。

```html
Icon.setTwoToneColor('#eb2f96');
Icon.getTwoToneColor(); // #ebef96
```

## 自定义 font 图标
我们提供了一个 `createFromIconfontCN` 方法，方便开发者调用在 [iconfont.cn](http://www.iconfont.cn) 上自行管理的图标。

```html
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js' // 在 iconfont.cn 上生成
});

const CustomIcon = san.defineComponent({
    components: {
        'myicon': MyIcon
    },
    template: '<div><myicon type="icon-example"></myicon></div>'
});

(new CustomIcon()).attach(mountedNode);

```

其本质上是创建了一个使用 `<use>` 标签来渲染图标的组件。

`options` 的配置项如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| scriptUrl | [iconfont.cn](http://www.iconfont.cn) 项目在线生成的 `js` 地址 | string | - |
| extraCommonProps | 给所有的 `svg` 图标 `<s-icon />` 组件设置额外的属性 | {[key: string]: any} | {} |

在 `scriptUrl` 都设置有效的情况下，组件在渲染前会自动引入 [iconfont.cn](http://www.iconfont.cn) 项目中的图标符号集，无需手动引入。

见 [iconfont.cn 使用帮助](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 查看如何生成 js 地址。
