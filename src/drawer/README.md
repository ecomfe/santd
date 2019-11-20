## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bodyStyle | 可用于设置 Drawer 的样式，调整浮层位置等 | string \| object | - |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| destroyOnClose | (todo) 关闭时销毁 Drawer 里的子元素 | boolean | false |
| getContainer | (todo) 指定 Drawer 挂载的 HTML 节点 | HTMLElement \| `() => HTMLElement` \| selectors | 'body' |
| mask | 是否展示遮罩 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 遮罩样式 | string \| object | {} |
| width | 宽度 | string \| number | 256 |
| height | 高度, 在 `placement` 为 `top` 或 `bottom` 时使用 | string \| number | 256 |
| placement | 抽屉的方向 | 'top'  \| 'right' \| 'bottom' \| 'left' | 'right'
| title | 标题 | string | - |
| visible | Drawer 是否可见 | boolean | - |
| zIndex | 设置 Drawer 的 `z-index` | number | 1000 |

## 回调 && 事件
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| on-close | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 |

## 插槽
| 名称 | 说明 |
| --- | --- |
| (default) 默认插槽 | 主体内容 |
