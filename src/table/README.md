## API

table组件


详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 是否展示外边框和列边框 | boolean | false |
| columns | 表格列的配置描述，具体项见下表 | ColumnProps[] | - |
| data | 数据数组 | any[] |  |
| defaultExpandAllRows | 初始时，是否展开所有行 | boolean | false |
| defaultExpandedRowKeys | 默认展开的行 | string[] | - |
| expandedRowKeys | 展开的行，控制属性 | string[] | - |
| expandedRowRender | 额外的展开行 | slot | - |
| expandIcon | 自定义展开图标 | slot | - |
| expandRowByClick | 通过点击行来展开子行 | boolean | false |
| footer | 表格尾部 | slot | - |
| indentSize | 展示树形数据时，每层缩进的宽度，以 px 为单位 | number | 15 |
| loading | 是否加载中 | boolean | false |
| pagination | 分页器，设置为false时不展示 | object | - |
| rowClassName | 表格行的类名 | Function(record, index):string | - |
| rowSelection | 表格行是否可选择 | object | null |
| scroll | 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，建议为 `x` 设置一个数字，如果要设置为 `true`，需要配合样式 `.san-table td { white-space: nowrap; }` | { x: number \| true, y: number } | - |
| showHeader | 是否显示表头 | boolean | true |
| size | 表格大小 | default \| middle \| small | default |
| title | 表格标题 | slot | - |
| on-change | 分页、排序、筛选变化时触发 | Function(pagination, filters, sorter, extra: { currentDataSource: [] }) | - |

### Column

列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 设置列内容的对齐方式 | 'left', 'right', 'center'| 'left' |
| colSpan | 表头列合并,设置为 0 时，不渲染 | number | - |
| dataIndex | 列数据在数据项中对应的 key。注意：比如key或者dataIndex='name', 那么tbody中的data数据中也必须有name字段与之对应 | string | - |
| defaultSortOrder | 默认排序顺序 | 'ascend' \| 'descend' | - |
| filterDropdown | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互 | slot | - |
| filterDropdownVisible | 用于控制自定义筛选菜单是否可见 | boolean | - |
| filtered | 标识数据是否经过过滤，筛选图标会高亮 | boolean | false |
| filteredValue | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组 | string[] | - |
| filterIcon | 自定义 filter 图标。| slot | - |
| filterMultiple | 是否多选 | boolean | true |
| filters | 表头的筛选菜单项 | object[] | - |
| key | 如果设置了唯一的dataIndex，则可以忽略这个属性 | string| -|
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并 | Function(text, record, index) {} | - |
| sorter | 排序函数，本地排序使用一个函数(参考 [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的 compareFunction) | Function | - |
| sortOrder | 排序的受控属性，外界可用此控制列的排序，可设置为 `'ascend'` `'descend'` `false` | boolean\|string | - |
| sortDirections | 支持的排序方式，取值为 `'ascend'` `'descend'` | Array | `['ascend', 'descend']` |
| title | 列头显示文字 | string | - |
| width | 列宽度 | string | - |
| onFilter | 本地模式下，确定筛选的运行函数 | Function(record) | - |
| slots | 使用 columns 时，可以通过该属性配置columns中的属性支持 slot，如 `slots: { filterIcon: 'XXX'}` | object | - |
| scopedSlots | 使用 columns 时，可以通过该属性配置支持绑定数据的 slot，如 `scopedSlots: { customRender: 'XXX'}` | object | - |
| left | 左侧距离，用于固定左侧列 | string | - |
| right | 右侧距离，用于固定右侧列 | string | - |

### pagination
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pageSize | 分页大小 | number | |
| current | 当前页数 | number | |

### rowSelection

选择功能的配置。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnWidth | 自定义列表选择框宽度 | string<number> \| number | |
| columnTitle | 自定义列表选择框标题 | string |  - |
| getCheckboxProps | 选择框的默认属性配置 | Function(record) |  - |
| hideDefaultSelections | 去掉『全选』『反选』两个默认选项	 | Boolean | false |
| selectedRowKeys | 指定选中项的 key 数组，需要和 on-change 进行配合 | string[] | [] |
| selections | 自定义选择配置项, 设为 true 时使用默认选择项 | object[] |boolean | true |
| onChange | 选中项发生变化时的回调 | Function(selectedRowKeys, selectedRows) | - |
| onSelect | 用户手动选择/取消选择某行的回调 | Function(record, selected, selectedRows, nativeEvent) | - |
| onSelectAll | 用户手动选择/取消选择所有行的回调 | Function(selected, selectedRows, changeRows) | - |
| onSelectInvert | 用户手动选择反选的回调 | Function(selectedRows) | - |

### selection

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | San 需要的 key，建议设置 | string | - |
| text | 选择项显示的文字| string | - |
| onSelect | 选择项点击回调 | Function(changeableRowKeys) | - |

## 注意

在 Table 中，data 和 columns 里的数据值都需要指定 key 值。对于 data 默认将每列数据的 key 属性作为唯一的标识。
