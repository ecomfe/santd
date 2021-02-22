## API

```bash
const dataSource = ['12345', '23456', '34567'];
<s-auto-complete dataSource={{dataSource}} />;
```


详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 支持清除, 单选模式有效 | boolean | false |
| autoFocus | 自动获取焦点 | boolean | false |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | boolean | false |
| dataSource | 自动完成的数据源 | [] | |
| dropdownMenuStyle | dropdown 菜单自定义样式 | string | |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean |true |
| defaultValue | 指定默认选中的条目 | string \| string[] | |
| disabled | 是否禁用 | boolean | false |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。|boolean or function | true |
| placeholder | 输入框提示 | string | - |
| value | 指定当前选中的条目 | string\|string[] | 无 |
| on-blur | 失去焦点时的回调 | function() | - |
| on-change | 选中 option，或 input 的 value 变化时，调用此函数 | function (value) | - |
| on-focus | 获得焦点时的回调 | function() | - |
| on-search | 搜索补全项的时候调用 | function(value) | 无 |
| on-select | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无 |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |
| open | 是否展开下拉菜单 | boolean | - |
| on-dropdownVisibleChange | 展开下拉菜单的回调 | function(open) | - |

## auto-complete 方法

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |
