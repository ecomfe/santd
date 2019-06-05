## API

### Card
| 参数                | 说明                                                | 类型          | 默认值        |
| ---                 | ---                                                 | ---           | ---           |
| actions             | 卡片操作组，位置在卡片底部                          | Slot(Element\ | SanComponent) | - |
| activeTabKey        | 当前激活页签的 key                                  | string        | -             |
| headStyle           | 自定义标题区域样式                                  | string        | -             |
| bodyStyle           | 内容区域自定义样式                                  | string        | -             |
| bordered            | 是否有边框                                          | boolean       | `true`        |
| cover               | 卡片封面                                            | slot          | -             |
| defaultActiveTabKey | 初始化选中页签的 key，如果没有设置 activeTabKey     | string        | 第一个页签    |
| extra               | 卡片右上角的操作区域                                | string\       | slot          | - |
| hoverable           | 鼠标移过时可浮起                                    | boolean       | `false`       |
| loading             | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean       | `false`       |
| tabList             | 页签标题列表                                        | Array         | -             |
| size                | card 的尺寸                                         | default\|small               | default |
| title               | 卡片标题                                            | string        | -             |
| type                | 卡片类型，可设置为 `inner` 或 不设置                | string        | -             |
| on-tabChange         | 页签切换的回调                                      | (key) => void | -             |

### Card.Grid

| 属性 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| className | 网格容器类名 | string | - |
| style | 定义网格容器类名的样式 | string | - |

### Card.Meta

| 属性 | 说明 | 类型 | 默认值 |
| -------- | ----------- | ---- | ------- |
| avatar | 头像/图标 | slot | - |
| className | 容器类名 | string | - |
| description | 描述内容 | string\|slot | - |
| style | 定义容器类名的样式 | string | - |
| title | 标题内容 | string\|slot | - |
