## API

### Anchor props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| affix | 固定模式 | boolean | true |
| bounds | 锚点区域边界 | number | 5(px) |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | |
| showInkInFixed | 固定模式是否显示小圆点 | boolean | false |
| wrapperClass | 容器的类名 | string | - |
| wrapperStyle | 容器样式 | string \| object | - |
| on-click | `click` 事件的 handler | Function(e: Event, link: Object) | |
| on-change | 监听锚点链接改变 | Function(currentActiveLink: string) |
| getCurrentAnchor | 自定义高亮的锚点 | () => string | - |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同 | number | - |

### Link props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | string | |
| title | 文字内容 | string | |
| target | 该属性指定在何处显示链接的资源 | string | |