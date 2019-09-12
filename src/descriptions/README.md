## API

### Descriptions

| 参数     | 说明                                                                                            | 类型        | 默认值  |
| ---      | ---                                                                                             | ---         | ---     |
| title    | 描述列表的标题，显示在最顶部                                                                    | string      | -       |
| bordered | 是否展示边框                                                                                    | boolean     | false   |
| column   | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number      | 3       |
| size     | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered="{{true}}"` 生效）    | default\|middle\|small | false |
| layout   | 描述布局                                                                                        | horizontal\|vertical         | horizontal     |

### DescriptionItems

| 参数     | 说明                                                                                            | 类型        | 默认值  |
| ---      | ---                                                                                             | ---         | ---     |
| label    | 内容的描述                                                                    | string      | -       |
| span | 包含列的数量                                                                                    | number     | 1   |

> 由于san框架机制及组件实现的问题，`DescriptionItems` 的属性值不支持插值语法写入，只支持如下写法：

```
<s-descriptionsitems label="Price" span="3">$80.00</s-descriptionsitems>
```
