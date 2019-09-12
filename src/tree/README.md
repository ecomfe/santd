## API

### tree组件


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoExpandParent | 是否自动展开父节点 | boolean | true |
| blockNode | 是否节点占据一行 | boolean | false |
| checkable | 节点前添加 Checkbox 复选框 | boolean | false |
| checkedKeys | (受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 | [] \| {checked: [], halfChecked: []} | [] |
| treeNodeData | 节点的配置描述, 具体项与TreeNode props一致，可见下表 | array | -- |
| customTitle(新加) | 自定义title | sanNode | - |
| searchValue (新加) | 搜索input的value | string | - |  
| defaultCheckedKeys| 默认选中复选框的树节点| string[]\|[] | - |
| defaultExpandAll | 默认展开所有树节点 | boolean | false |
| defaultExpandedKeys | 默认展开指定的树节点 | string[] \| []| - |
| defaultExpandParent | 默认展开父节点 | boolean | true |
| defaultSelectedKeys| 默认选中的树节点| string[]\|[] | - |
| disabled | 将树禁用 | boolean | false |
| draggable(未实现) | 设置节点可拖拽（IE>8） | boolean | false |
| expandedKeys | （受控）展开指定的树节点 | string[] \| [] | -|
| filterTreeNode | 按需筛选树节点（高亮），返回true | function(node) | - |
| checkStrictly | checkable状态下节点选择完全受控（父子节点选中状态不再关联 | boolean | false |
| loadData | 异步加载数据 | function(node) | - |
| loadedKeys(未实现) | （受控）已经加载的节点，需要配合 `loadData` 使用 | string[] | [] |
| multiple | 支持点选多个节点（节点本身）| boolean | false |
| selectedKeys | 选中的树节点| string[] | - |
| showIcon | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 | boolean | false |
| switcherIcon | 自定义树节点的展开/折叠图标 | sanNode | - |
| showLine | 是否展示连接线| boolean | false |
| on-expand | 展开/收起节点时触发 | function({expandedKeys,e: {expanded, node}}) | - |
| on-select | 点击树节点触发 | function({selectedKeys, e: {selected, selectedNodes, node}}) | - |
| on-load | 节点加载完毕时触发 | function({loadedKeys, e: {node}}) | - |
| on-check | 点击复选框触发 | function({checkedKeys, e: {checked, checkedNodes, node, event}}) | - |

### TreeNode props


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disableCheckbox | 禁掉 checkbox | boolean | false |
| disabled | 禁掉响应 | boolean | false |
| icon | 自定义图标,可接收组件 | sanNode | - |
| isLeaf | 设置为叶子节点(设置了loadData时有效) | boolean | false |
| key | `必填`<br>被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | string | 内部计算出的节点位置 |
| selectable | 设置节点是否可被选中 | boolean | true |
| title | `必填`<br>标题 | string |  |

### DirectoryTree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandAction | 目录展开逻辑，可选 `false` 'click' | string | 'click' |
