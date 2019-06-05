## API


详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类 | string | - |
| dataSource | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。 | TransferItem[] | `\[]` |
| disabled | 是否禁用 | boolean | `false` |
| filterOption | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | (inputValue, option): boolean | - |
| footer | 底部渲染函数 | slot | - |
| listStyle | 两个穿梭框的自定义样式 | object | - |
| operations | 操作文案集合，顺序从上至下 | string\[] | `\['>', '<']` |
| render | 每行数据渲染函数，该函数的入参为 `dataSource` 中的项，返回值为 String。或者取值为san组件的定义，组件data默认绑定`TransferItem` | Function(item) | - |
| selectedKeys | 设置哪些项应该被选中 | string\[] | `\[]` |
| showSearch | 是否显示搜索框 | boolean | `false` |
| targetKeys | 显示在右侧框数据的key集合 | string\[] | `\[]` |
| titles | 标题集合，顺序从左至右 | string\[] | `\['', '']` |
| on-change | 选项在两栏之间转移时的回调函数 | (targetKeys, direction, moveKeys): void | - |
| on-scroll | 选项列表滚动时的回调函数 | (direction, event): void | - |
| on-search | 搜索框内容时改变时的回调函数 | (direction: 'left'\|'right', value: string): void | - |
| on-selectChange | 选中项发生改变时的回调函数 | (sourceSelectedKeys, targetSelectedKeys): void | - |

### TransferItem
| 属性 | 说明 | 类型 | 是否必须 |
| --- | --- | --- | --- |
| key | 键 | string | 是 |
| title | 标题 | string | 是 |
| description | 描述 | string | 否 |
| disabled | 是否可选 | boolean | 否 |