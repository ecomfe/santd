## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 自定义标题文字 | String | - |
| subTitle | 自定义的二级标题文字 | String | - |
| backIcon | 自定义 back icon ，如果为 false 不渲染 back icon | 同IconType | arrow-left |
| tags | title 旁的 tag 列表 | slot | - |
| extra | 操作区，位于 title 行的行尾 | slot | - |
| breadcrumb | 面包屑的配置 |  详见Breadcrumb  | - |
| footer | PageHeader 的页脚，一般用于渲染 TabBar | slot | - |
| onBack | 返回按钮的点击事件 | `()=>void` | `()=>history.back()` |
