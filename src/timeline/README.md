## API

### Timeline

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pending | 指定最后一个幽灵节点是否存在或内容 | slot | - |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | slot | `<s-icon type="loading" />` |
| reverse | 节点排序 | boolean | false |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置  | `left` \| `alternate` \| `right` | - |

### Timeline.Item：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `blue, red, green`，或自定义的色值 | string | blue |
| dot | 自定义时间轴点 | slot | - |
| position | 自定义节点位置 | `left` \| `right` | - |
