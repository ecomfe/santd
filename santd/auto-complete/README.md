## API

A AntDesign-San Component


详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children (自动完成的数据源) | 自动完成的数据源 | AutoComplete.Group / Array&lt;AutoComplete.Option> | - |
| dataSource | 自动完成的数据源 | Array |  |
| disabled | 是否禁用 | boolean | false |
| placeholder | 输入框提示 | string | - |
| value | 指定当前选中的条目 | string\|string\[]\|{ key: string, label: string\|ReactNode }\|Array&lt;{ key: string, label: string\|ReactNode }> | 无 |
| on-blur | 失去焦点时的回调 | function() | - |
| on-focus | 获得焦点时的回调 | function() | - |
| on-search | 搜索补全项的时候调用 | function(value) | 无 |
| on-select | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无 |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |
| open | 是否展开下拉菜单 | boolean | - |
| on-dropdownVisibleChange | 展开下拉菜单的回调 | function(open) | - |

