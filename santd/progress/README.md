## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 内容的模板函数 | function(percent, successPercent) | `percent => percent + '%'` |
| gapDegree `(type=circle)` | 圆形进度条缺口角度，可取值 0 ~ 360 | number | 0 |
| gapPosition `(type=circle)` | 圆形进度条缺口位置 | Enum{ 'top', 'bottom', 'left', 'right' } | `top` |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true |
| status | 状态，可选：`success` `exception` `active` | string | - |
| strokeWidth `(type=line)` | 进度条线的宽度，单位 px | number | 8 |
| strokeWidth `(type=circle)` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 |
| strokeLinecap | | Enum{ 'round', 'square' } | `round` |
| strokeColor | 进度条的色彩 | string | - |
| successPercent | 已完成的分段百分比，`type="line"` 时有效 | number | 0 |
| type | 类型，可选 `line` `circle` `dashboard` | string | `line` |
| width `(type=circle)` | 圆形进度条画布宽度，单位 px | number | 132 |
