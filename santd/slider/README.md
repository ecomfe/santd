## API


详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 设置初始取值。当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]` | number\|number\[] | `0` or `[0, 0]` |
| disabled | 值为 `true` 时，滑块为禁用状态 | boolean | `false` |
| included | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 | boolean | `true` |
| marks | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 | object | { number: string } or { number: { style: string, label: string } } |
| max | 最大值 | number | `100` |
| min | 最小值 | number | `0` |
| range | 双滑块模式 | boolean | `false` |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 Slider 的可选值仅有 marks 标出来的部分。 | number\|null | 1 |
| tipFormatter | Slider 会把当前值传给 `tipFormatter`，并在 Tooltip 中显示 `tipFormatter` 的返回值，若为 null，则隐藏 Tooltip。 | string\|null |  |
| value | 设置当前取值。当 `range` 为 `false` 时，使用 `number`，否则用 `[number, number]` | number\|number\[] |  |
| vertical | 值为 `true` 时，Slider 为垂直方向 | Boolean | `false` |
| afterChange | 与 `onmouseup` 触发时机一致，把当前值作为参数传入。 | Function(value) | NOOP |
| change | 当 Slider 的值发生改变时，会触发 change 事件，并把改变后的值作为参数传入。 | Function(value) | NOOP |

