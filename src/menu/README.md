## Menu API


### 详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultOpenKeys | 默认展开的menu菜单 | [] \| string[] | - |
| defaultSelectedKeys | 默认选中的item项 | string(单选) \| []（多选） | - |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | boolean | true |
| inlineCollapsed | inline 时菜单是否收起状态 | boolean | - |
| inlineIndent | inline 模式的菜单缩进宽度 | number | 24 |
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | string `vertical` `horizontal` `inline` | `vertical` |
| multiple | 是否允许多选 | boolean | false |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | [] \| string[] | - |
| selectable | 是否允许选中 | boolean | true |
| selectedKeys | 当前选中的菜单项 key | string(单选) \| []（多选） | - |
| style | 根节点样式 | object | - |
| subMenuCloseDelay | 用户鼠标离开子菜单后关闭延时，单位：秒 | number | 0.1 |
| subMenuOpenDelay | 用户鼠标进入子菜单后开启延时，单位：秒 | number | 0 |
| theme | 主题颜色 | string `dark` `light` | `light` |


### Menu事件

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| on-click | 点击 MenuItem 调用此函数 | function({key, item, keyPath}) |
| on-deselect | 取消选中时调用，仅在 multiple 生效 | function({key, item, keyPath}) |
| on-openChange | SubMenu 展开/关闭的回调 | function(openKeys)


### Menu.Item

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| key | item 的唯一标志 | string | - |
| title | 设置收缩时展示的悬浮标题 | string |


### Menu.SubMenu
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| key | 唯一标识 | string | - |
| title | 子菜单项值 | slot | - |
| on-titleClick | 点击子菜单标题 | function(key) |


### Menu.ItemGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 子菜单项值 | string \| slot | - |

### Menu.Divider

菜单项分割线，只用在弹出菜单内。
