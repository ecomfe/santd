## API

```
<s-cascader options={{options}} on-change={{onChange}}></s-cascader>
```

| 参数                  | 说明                                                                                   | 类型                                            | 默认值                                                     |
| ---                   | ---                                                                                    | ---                                             | ---                                                        |
| allowClear            | 是否支持清除                                                                           | boolean                                         | true                                                       |
| autoFocus             | 自动获取焦点                                                                           | boolean                                         | false                                                      |
| changeOnSelect        | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示                     | boolean                                         | false                                                      |
| defaultValue          | 默认的选中项                                                                           | string[] \                                      | Array                                                      | - |
| disabled              | 禁用                                                                                   | boolean                                         | false                                                      |
| displayRender         | 选择后展示的渲染函数                                                                   | (label, selectedOptions) =>sanComponentInstance | `label => label.join(' / ')`                               |
| expandTrigger         | expandTrigger 次级菜单的展开方式，可选 `click` 和 `hover`                              | string                                          | 'click'                                                    |
| fieldNames            | 自定义 options 中 label name children 的字段                                           | object                                          | `{ label: 'label', value: 'value', children: 'children' }` |
| getPopupContainer     | 菜单渲染父节点。默认渲染到dropdown上，也可以选择渲染到body上,比如`() => document.body` | function                                        | -                                                          |
| loadData              | 用于动态加载选项，无法与 showSearch 一起使用                                           | (selectedOptions) => void                       | -                                                          |
| notFoundContent       | 当下拉列表为空时显示的内容                                                             | string                                          | 'Not Found'                                                |
| options               | 可选项数据源                                                                           | Array                                           | -                                                          |
| placeholder           | 输入框占位文本                                                                         | string                                          | -                                                          |
| popupVisible          | 控制浮层显隐                                                                           | boolean                                         | -                                                          |
| showSearch            | 在选择框中显示搜索框                                                                   | boolean                                         | false                                                      |
| size                  | 输入框大小，可选 `large`<br> `default`<br> `small`                                     | string                                          | default                                                    |
| style                 | 自定义样式                                                                             | cssProperty                                     | -                                                          |
| suffixIcon            | 自定义的选择框后缀图标type                                                             | string                                          | -                                                          |
| value                 | 指定选中项                                                                             | Array                                           | -                                                          |
| on-change             | 选择完成后的回调                                                                       | ({value, selectedOptions}) => void                                                |                           -                                 |
| on-popupVisibleChange | 显示/隐藏浮层的回调                                                                    | (value) => void                                               |                                               -             |

`showSearch` 为对象时，其中的字段：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| filter | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false。 | `function(inputValue, path): boolean` |  |
| limit | 搜索结果展示数量 | number \| false | 50 |
| matchInputWidth | 搜索结果列表是否与输入框同宽 | boolean |  |
| render | 用于渲染 filter 后的选项 | `function({inputValue, path})` |  |
| sort | 用于排序 filter 后的选项 | `function(a, b, inputValue)` |  |

### 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
