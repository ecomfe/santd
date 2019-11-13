## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 显示清除按钮 | boolean | false |
| autoClearSearchValue | 当多选模式下值被选择，自动清空搜索框 | boolean | true |
| defaultValue | 指定默认选中的条目 | string/string[] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的样式 | object | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | () => document.body |
| loadData | 异步加载数据 | Function(node) | - |
| maxTagCount | 最多显示多少个 tag | number | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | string |
| multiple | 支持多选（当设置 treeCheckable 时自动变为true） | boolean | false |
| placeholder | 选择框默认文字 | string | - |
| searchPlaceholder | 搜索框默认文字 | string | - |
| showCheckedStrategy | 定义选中项回填的方式。`TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点). `TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点. | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD |
| size | 选择框大小，可选 `large` `small` | string | 'default' |
| suffixIcon | 自定义的选择框后缀图标 | slot | - |
| treeCheckable | 显示 checkbox | boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） | array&lt;{value, label, children, [disabled, disableCheckbox, selectable]}> | [] |
| treeDefaultExpandAll | 默认展开所有树节点 | boolean | false |
| treeDefaultExpandedKeys | 默认展开的树节点 | string[] | - |
| treeExpandedKeys | 设置展开的树节点 | string[] | - |
| value | 指定当前选中的条目 | string/string[] | - |
| on-change | 选中树节点时调用此函数 | function(value, node, info) | - |
| on-search | 文本框值变化时回调 | function(value) | - |
| on-select | 被选中时调用 | function(value, node, info) | - |
| on-treeExpand | 展示节点时调用 | function(expandedKeys) | - |

### Tree 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| foucs() | 获取焦点 |

### TreeNode props

> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数            | 说明                                               | 类型    | 默认值 |
| ---             | ---                                                | ---     | ---    |
| selectable      | 是否可选                                           | boolean | true   |
| disableCheckbox | 禁掉 checkbox                                      | boolean | false  |
| disabled        | 是否禁用                                           | boolean | false  |
| isLeaf          | 设置为叶子节点                                     | boolean | false  |
| key             | 此项必须设置（其值在整个树范围内唯一）             | string  | -      |
| title           | 树节点显示的内容                                   | string\|slot        | - |
| value           | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | string  | -      |
