## API

### 设置面包屑

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemRender| 自定义链接函数,跟 routes配合使用，返回san组件 | Function | - |
| params | 路由参数，处理routes数组中的path路径 | object | - |
| routes | router的路由信息 | Array | - |
| separator | 分隔符自定义 | string | `/` |

## breadcrumbItem组件属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | breadcrumbItem组件属性，如果有href，则会进行a标签的跳转 | string | - |

## 和san-router配合使用
和 san-router 一起使用时，能够更方便的进行单页路由的管理。
