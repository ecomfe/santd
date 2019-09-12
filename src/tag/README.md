## API

### Tag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 标签是否可以关闭 | boolean | false |
| color | 标签色 | string | - |
| on-close | 关闭时回调 | function | -|
| visible| 是否显示标签 | boolean | `true` |

### Tag.CheckableTag
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 设置标签的选中状态 | boolean | false |
| on-change | 点击标签时触发的回调,回调中的参数是选中状态 | (checked) => {} |
