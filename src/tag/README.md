## API

### Tag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 标签是否可以关闭 | boolean | false |
| color | 标签色 | string | - |
| closeIcon| 自定义关闭按钮 | slot | - |
| on-close | 关闭时回调, closable为true时有效 | function | -|
| visible| 是否显示标签 | boolean | `true` |
| icon| 设置图标 | string | - |

### Tag.CheckableTag
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 设置标签的选中状态 | boolean | false |
| on-change | 点击标签时触发的回调,回调中的参数是选中状态 | (checked) => {} |
