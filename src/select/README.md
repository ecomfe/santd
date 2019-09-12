## API

### select选择框

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoClearSearchValue | 是否在选中项后清空搜索框，只在mode为`multiple` 或 `tags` 时有效。 | boolean | true |
| autoFocus | 默认获取焦点,用在`multiple`和`tags`模式下 | boolean | false |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true |
| defaultValue | 指定默认选中的条目 | string\|string[]<br>array<br>object | true |
| disabled | 是否禁用 | boolean | false |
| value | 指定当前选中的条目,当有value时，defaultValue会被覆盖  | string<br>string[]<br>array<br>object | - |
| dropdownClassName | 下拉菜单的 className 属性 | 	string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。 | boolean | true |
| dropdownRender | 自定义下拉框内容 | function(sanNode){} | - |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。| `boolean or function(inputValue, option)` | true |
| firstActiveValue(未实现) | 默认高亮的选项 | string \| [string] | - |
| getPopupContainer| 菜单渲染父节点。默认渲染到dropdown上，也可以选择渲染到body上,比如`() => document.body` | function | - |
| mode | 设置 Select 的模式为多选或标签，简单模式时不要增加这个属性 | `'multiple' \| 'tags'` | - |
| notFoundContent | 当下拉列表为空时显示的内容 | string \| sanComponetInstance | 'Not Found' |
| placeholder | 选择框默认文字 | string | - |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: string} 的格式 | boolean | false |
| maxTagCount | 最多显示多少个 tag | number | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | `function(omittedValues){return string}` | - |
| optionFilterProp(暂无实现) | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索 | string | value |
| optionLabelProp(暂无实现) | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。 | string | - |
| showArrow | 是否显示下拉小箭头  | boolean | true|
| showSearch | 使单选模式可搜索 | boolean | false |
| dropHeight | 定义下拉菜单的高度,默认200 | number | 200 |
| size | 选择框大小，可选 `large` `small`  | string | default|
| suffixIcon | 自定义的选择框后缀图标 | sanNode | - |
| removeIcon | 自定义的多选框清除图标 | sanNode | - |
| clearIcon | 自定义的多选框清空图标 | sanNode | - |
| menuItemSelectedIcon | 自定义当前选中的条目图标 | sanNode | - |
| tokenSeparat | 在 tags 和 multiple 模式下自动分词的分隔符 | string[] | - |
| on-blur | 失去焦点的时回调  | function | -|
| on-change | 选中 option，或 input 的 value 变化  | function({value,option}) | -|
| on-deselect | 取消选中时调用，参数为选中项的 value 值，仅在 multiple 或 tags 模式下生效 | `function(value)` | - |
| on-focus | 获得焦点时回调  | function | -|
| on-mouseEnter | 鼠标移入时回调  | function | -|
| on-mouseLeave | 鼠标移出时回调 | function | - |
| on-popupScroll | 下拉列表滚动时的回调 | function | - |
| on-search | 文本框值变化时回调  | function | -|
| on-select | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value) | - |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |
| open | 是否展开下拉菜单 | boolean | - |
| on-dropdownVisibleChange | 展开下拉菜单的回调   | function | -|
| loading | 加载中状态 | Boolean | false |

## Select Methods
| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

## option Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用| boolean | false|
| value | 默认根据此属性值进行筛选 | string|number\| -|
| className | Option 器类名| string | -|
| title | 选中该 Option 后，Select 的 title | string | - |


### OptGroup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key |  | string | - |
| label | 组名 | string | 无 |
