## API

### Transfer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。 | TransferItem[] | `[]` |
| disabled | 是否禁用 | boolean | `false` |
| filterOption | 接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | (inputValue, option): boolean | - |
| footer | 底部插槽 | slot | - |
| listStyle | 两个穿梭框的自定义样式 | object | - |
| operations | 操作文案集合，顺序从上至下 | string\[] | `\['>', '<']` |
| render | 每行数据渲染插槽| slot | - |
| leftRenderList | 左边栏整体渲染插槽| slot | - |
| rightRenderList | 右边栏整体渲染插槽| slot | - |
| selectedKeys | 设置哪些项应该被选中 | string\[] | `\[]` |
| showSearch | 是否显示搜索框 | boolean | `false` |
| showSelectAll | 是否显示全选勾选框 | boolean | `true` |
| targetKeys | 显示在右侧框数据的key集合 | string\[] | `\[]` |
| titles | 标题集合，顺序从左至右 | string\[] | `\['', '']` |
| on-change | 选项在两栏之间转移时的回调函数 | ({targetKeys, direction, moveKeys}): void | - |
| on-scroll | 选项列表滚动时的回调函数 | ({direction, event}): void | - |
| on-search | 搜索框内容时改变时的回调函数 | ({direction: 'left'\|'right', value: string}): void | - |
| on-selectChange | 选中项发生改变时的回调函数 | ({sourceSelectedKeys, targetSelectedKeys}): void | - |

### leftRenderList & rightRenderList Props

Transfer支持leftRenderList和rightRenderList插槽来自定义渲染列表，在组件里面可以使用以下参数：

| 参数        | 说明           | 类型    |
| ---         | ---            | ---     |
| direction   | 渲染列表的方向 | 'left' \| 'right'          |
| disabled       | 是否禁用列表           | boolean |
| filteredItems | 过滤后的数据           | TransferItem[]  |
| selectedKeys    | 选中的条目       | string[] |
