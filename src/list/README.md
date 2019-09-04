## API

### List

| 参数       | 说明                                                          | 类型        | 默认值     |
| ---        | ---                                                           | ---         | ---        |
| bordered   | 是否展示边框                                                  | boolean     | false      |
| footer     | 列表底部                                                      | string\|slot       | -       |
| grid       | 列表栅格配置                                                  | object      | -          |
| header     | 列表头部                                                      | string\|slot       | -       |
| itemLayout | 设置 List.Item 布局, 设置成`vertical`则竖直样式显示, 默认横排 | string      | -          |
| loading    | 当卡片内容还在加载中时，可以用 loading 展示一个占位           | boolean     | false      |
| loadMore   | 加载更多                                                      | boolean\|slot       | false   |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示                 | boolean\|object            | false    |
| size       | list 的尺寸                                                   | `default` \| `middle` \| `small` | default |

### pagination

分页的配置项

| 参数     | 说明               | 类型   | 默认值    |
| ---      | ---                | ---    | ---       |
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' \| 'bottom' |

更多配置项，请查看 Pagination

#### List grid props
| 参数   | 说明               | 类型   | 默认值 |
| ---    | ---                | ---    | ---    |
| column | 列数               | number | -      |
| gutter | 栅格间隔           | number | 0      |
| xs     | <576px 展示的列数  | number | -      |
| sm     | ≥576px 展示的列数  | number | -      |
| md     | ≥768px 展示的列数  | number | -      |
| lg     | ≥992px 展示的列数  | number | -      |
| xl     | ≥1200px 展示的列数 | number | -      |
| xxl    | ≥1600px 展示的列数 | number | -      |


### List.Item

| 参数    | 说明                                                                                              | 类型             | 默认值    |
| ---     | ---                                                                                               | ---              | ---       |
| actions | 列表操作组对应的slot名称，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧                                      | Array | -         |
| extra   | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | slot | - |

#### List.Item.Meta
| 参数        | 说明               | 类型    | 默认值 |
| ---         | ---                | ---     | ---    |
| avatar      | 列表元素的图标     | slot    | -      |
| description | 列表元素的描述内容 | string\|slot   | - |
| title       | 列表元素的标题     | string\|slot   | - |
