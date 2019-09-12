## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页数 | number | - |
| defaultCurrent | 默认的当前页数 | number | 1 |
| defaultPageSize | 默认的每页条数 | number | 10 |
| disabled | 禁用分页 | boolean | - |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |
| itemRender | 用于自定义页码的结构，可用于优化 SEO | slot {type: 'page' \| 'prev' \| 'next', page: number} | - |
| pageSize | 每页条数 | number | - |
| pageSizeOptions | 指定每页可以显示多少条 | string[] | [10, 20, 30, 40] |
| showLessItems | 展示较少的分页数 | boolean | false |
| showQuickJumper | 显示快速跳转至某页 | boolean | false |
| showSizeChanger | 是否可以改变 pageSize | boolean | false |
| showTotal | 用于显示数据总量和当前数据顺序 | Function(total, range) | - |
| simple | 当添加该属性时，显示为简单分页 | boolean | - |
| size | 当为「small」时，是小尺寸分页 | string | '' |
| total | 数据总数 | number | 0 |
| hasNext | 是否还有下一页，与`simple`同时用 | boolean | - |

### 事件

| 事件名            | 说明                                         | 类型 | 默认值 |
| ---               | ---                                          | ---     |  ---      |
| on-change         | 页码改变的回调，参数是改变后的页码及每页条数 |  Function({page, pageSize})    |    noop    |
| on-showSizeChange | pageSize 变化的回调                          |  Function({current, size})    |    noop    |
