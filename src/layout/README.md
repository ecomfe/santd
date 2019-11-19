## API

```html
<s-layou>
    <s-header>header</s-header>
    <s-layout>
        <s-sider>left sidebar</s-sider>
        <s-content>main content</s-content>
        <s-sider>right sidebar</s-sider>
    </s-layout>
    <Footer>footer</Footer>
</s-layout>
```

### Layout

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | - |
| style | layout样式 | CSSProperties | - |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的断点 | `Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' }` | - |
| collapsed | 当前收起状态 | boolean | - |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | number | 80 |
| collapsible | 是否可收起 | boolean | false |
| defaultCollapsed | 是否默认收起 | boolean | false |
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | boolean | false |
| style | 指定样式 | object | - |
| theme | 主题颜色 | string: `light` `dark` | `dark` |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | string,如 `search` `copy` 等合法icon的type | - |
| width | 宽度 | number | 200 |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}

```

### 事件
| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| on-collapse | 展开-收起时的回调函数，当点击时，可获得当前的状态 | - |
| on-breakpoint | 触发响应式布局断点时的回调 | - |
