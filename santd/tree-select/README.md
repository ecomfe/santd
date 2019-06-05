## API

树选择组件

### 选择框

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 显示清除按钮 | boolean | false |
| autoClearSearchValue | 当多选模式下值被选择，自动清空搜索框 | boolean | true |
| defaultValue | 指定默认选中的条目 | string/string\[] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的样式 | object | - |
| filterTreeNode(暂无实现) | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | boolean\|Function(inputValue: string, treeNode: TreeNode) (函数需要返回bool值) | Function |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | () => document.body |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 `{value: string, label: string}` 的格式 | boolean | false |
| loadData(暂无实现) | 异步加载数据 | function(node) | - |
| maxTagCount | 最多显示多少个 tag | number | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | sanNode |
| multiple | 支持多选（当设置 treeCheckable 时自动变为true） | boolean | false |
| placeholder | 选择框默认文字 | string | - |
| searchPlaceholder | 搜索框默认文字 | string\|slot | - |
| searchValue(暂无实现，因为ant实现有问题) | 搜索框的值，可以通过 `search` 事件获取用户输入 | string | - |
| treeIcon | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 | boolean | false |
| showCheckedStrategy | 定义选中项回填的方式。`TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点). `TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点. | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD |
| showSearch | 在下拉中显示搜索框(仅在单选模式下生效) | boolean | false |
| size | 选择框大小，可选 `large` `small` | string | 'default' |
| suffixIcon | 自定义的选择框后缀图标 | sanNode | - |
| treeCheckable | 显示 checkbox | boolean | false |
| treeCheckStrictly | checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 `labelInValue` 强制为 true | boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） | array&lt;{value, label, children, [disabled, disableCheckbox, selectable]}> | \[] |
| treeDataSimpleMode(暂无实现) | 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', label:"test1",...},...], `pId` 是父节点的 id) | false\|Array&lt;{ id: string, pId: string, rootPId: null }> | false |
| treeDefaultExpandAll | 默认展开所有树节点 | boolean | false |
| treeDefaultExpandedKeys | 默认展开的树节点 | string\[] \| number\[] | - |
| treeExpandedKeys(.sync) | 设置展开的树节点 | string\[] \| number\[] | - |
| treeNodeFilterProp(暂无实现) | 输入项过滤对应的 treeNode 属性 | string | 'value' |
| treeNodeLabelProp（暂无实现） | 作为显示的 prop 设置 | string | 'title' |
| value | 指定当前选中的条目 | string/string\[] | - |
| on-change | 选中树节点时调用此函数 | function | - |
| on-search | 文本框值变化时回调 | function | - |
| on-select | 被选中时调用 | function | - |
| on-treeExpand | 展示节点时调用 | function | - |


### Tree 方法

| 名称 | 描述 |
| --- | --- |
| blur | 移除焦点 |
| foucs | 获取焦点 |


### TreeNode props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selectable | 是否可选 | boolean | true |
| disableCheckbox | 禁掉 checkbox | boolean | false |
| disabled | 是否禁用 | boolean | false |
| isLeaf | 设置为叶子节点 | boolean | false |
| key | 此项必须设置（其值在整个树范围内唯一） | string | - |
| title | 树节点显示的内容 | string | - |
| value | 默认根据此属性值进行筛选（其值在整个树范围内唯一）| string | - |
