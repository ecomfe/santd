## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dateCellRender | 自定义渲染日期单元格，返回内容会被追加到单元格 | SanNode | 无 |
| dateFullCellRender | 自定义渲染日期单元格，返回内容覆盖单元格 | SanNode | 无 |
| defaultValue | 默认展示的日期 | [moment](http://momentjs.com/) | 默认日期 |
| disabledDate | 不可选择的日期 | (currentData: moment) => bool | 无 |
| fullscreen | 是否全屏显示 | boolean | `true` |
| mode | 初始模式，`month/year` | string | `month` |
| monthCellRender | 自定义渲染月单元格，返回内容会被追加到单元格 | SanNode | 无 |
| monthFullCellRender | 自定义渲染月单元格，返回内容覆盖单元格 | SanNode | 无 |
| validRange | 设置可以显示的日期 | \[[moment](http://momentjs.com/), [moment](http://momentjs.com/)] | 无 |
| value | 展示日期 | [moment](http://momentjs.com/) | 当前日期 |
| on-panelChange | 日期面板变化回调 | function(date: moment, mode: string) | 无 |
| on-select | 点击选择日期回调 | function(date: moment） | 无 |
| on-change | 日期变化回调 | function(date: moment） | 无 |
| headerRender | 自定义头部内容 | SanNode | 无 |
