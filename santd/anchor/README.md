## API

### Anchor props

| 参数         | 说明           | 类型              | 默认值       |
| ---          | ---            | ---               | ---          |
| affix        | 固定模式       | boolean           | true         |
| bounds       | 锚点区域边界   | number            | 5(px)        |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
| offsetBottom             | 距离窗口底部达到指定偏移量后触发 | number |  |
| offsetTop             | 距离窗口顶部达到指定偏移量后触发 | number |  |
| showInkInFixed             | 固定模式是否显示小圆点 | boolean | false |
| on-click             | `click` 事件的 handler | Function(e: Event, link: Object) |  |

### Link props

| 参数         | 说明           | 类型              | 默认值       |
| ---          | ---            | ---               | ---          |
| href        | 锚点链接       | string           |          |
| title       | 文字内容   | string            |         |
