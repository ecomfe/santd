# 更新日志

`ant-design-san` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：带有新特性的向下兼容的版本
- 主版本号：含有破坏性更新和新特性，不在发布周期内

---

## 1.0.2
`2020-3-24`
- 🐞 修复 1.0.0 版本把 Moment.js 换成 Day.js 后引起的和时间日期相关的组件的一系列 bug，涉及的组件包括 Calendar、DatePicker、LocaleProvider、TimePicker [#48](https://github.com/ecomfe/santd/pull/48)

## 1.0.1
`2020-3-23`
- Menu
    - 🐞 修复 MenuItem 溢出折叠时的可用空间的计算逻辑 [#47](https://github.com/ecomfe/santd/pull/47)
    - 🐞 修复 MenuItem 的 padding 没有正常生效的问题 [#47](https://github.com/ecomfe/santd/pull/47)
    - 🐞 修复 MenuItem 之间有间隙导致溢出折叠的计算不精确的问题 [#47](https://github.com/ecomfe/santd/pull/47)
    - 🐞 修复折叠图标的空间的计算逻辑 [#47](https://github.com/ecomfe/santd/pull/47)
- Table
    - 🐞 修复当存在子表格时展开子表格的按钮默认隐藏的问题，改为了默认显示 [#45](https://github.com/ecomfe/santd/pull/45)
- 其它
    - 🐞 修复发布 NPM 包的脚本因外部依赖 @octokit/rest 的 API 更改导致脚本运行失败的问题 [#44](https://github.com/ecomfe/santd/pull/44)

## 1.0.0
`2020-3-15`
- Affix
    - 🆕 新增 target 属性：设置 Affix 需要监听其滚动事件的元素 [#27](https://github.com/ecomfe/santd/pull/27)
- AutoComplete
    - 🆕 新增 backfill 属性：使用键盘选择选项的时候把选中项回填到输入框中 [#24](https://github.com/ecomfe/santd/pull/24)
- Menu
    - 🆕 新增 overflowedIndicator 属性：自定义 Menu 折叠时的图标 [#30](https://github.com/ecomfe/santd/pull/30)
    - 🆕 新增菜单项过多而溢出时会自动折叠的功能 [#29](https://github.com/ecomfe/santd/pull/29)
    - 💄 子菜单统一为垂直菜单 [#29](https://github.com/ecomfe/santd/pull/29)
    - 🐞 修复展开收起箭头某些情况下会遮盖文字的问题 [#29](https://github.com/ecomfe/santd/pull/29)
- Select
    - 🌟 默认根据 value 筛选改为默认同时根据 value 和内嵌内容筛选 [34](https://github.com/ecomfe/santd/pull/34)
- Space
    - 🆕 新增 Space 组件：设置组件之间的间距 [#25](https://github.com/ecomfe/santd/pull/25)
- Tabs
    - 🆕 新增 forceRender 属性：被隐藏时是否渲染 DOM 结构 [#28](https://github.com/ecomfe/santd/pull/28)
    - 🆕 Tabpane 的内容支持 slot [#32](https://github.com/ecomfe/santd/pull/32)
- Tree
    - 🆕 新增 height 和 virtual 属性：支持虚拟滚动 [#35](https://github.com/ecomfe/santd/pull/35)
    - 🆕 支持通过 treeData 属性自定义图标 [#40](https://github.com/ecomfe/santd/pull/40)
    - 🐞 修复子节点是否可选的判断逻辑 [#35](https://github.com/ecomfe/santd/pull/35)
    - 🐞 修复 disableCheckbox 属性没有生效的问题 [#40](https://github.com/ecomfe/santd/pull/40)
- TreeSelect
    - 🆕 新增 showSearch 属性：支持搜索框 [#33](https://github.com/ecomfe/santd/pull/33)
    - 🆕 新增 searchValue 属性：手动控制搜索框的值 [#33](https://github.com/ecomfe/santd/pull/33)
- 其它
    - 🛠 把 Moment.js 换成 Day.js [#38](https://github.com/ecomfe/santd/pull/38)
    - 🛠 组件文件的命名统一为帕斯卡命名法 [#37](https://github.com/ecomfe/santd/pull/37)
    - 🌟 使用内部实现用到 s-show 的组件要求 San 版本至少 3.9.3 [#29](https://github.com/ecomfe/santd/pull/29)

## 0.2.9
`2020-10-10`
- 🐞 新增 Avatar支持gap设置字符距离左右两侧边界单位像素
- 🐞 新增 collapse支持expandIconPosition设置图标位置
- 🐞 新增 list支持locale设置空数据文案
- 🐞 新增 Tooltip支持color预设色彩的文字提示样式
- 🐞 新增 Timeline支持label设置标签
- 🐞 新增 Tag属性
    -  closeIcon设置图标
    -  icon自定义关闭标签
- 🐞 新增 Notification支持closeIcon自定义关闭图标
- 🐞 新增 Steps属性
    -  initial支持设置起始序号，从 0 开始记数
    -  type步骤条支持两种类型（默认和navigate类型）
    -  subTitle支持每个步骤支持设置子标题
    -  disabled支持每个步骤支持禁用点击
- 🐞 新增 Tabs属性
    -  centered支持标签居中
    -  addIcon自定义添加按钮
    -  closeIcon自定义关闭标签
    -  keyboard开启键盘切换tab功能   
- 🐞 新增 Input Search 支持搜索 loading
- 🐞 新增 Modal支持closeIcon自定义关闭图标
- 🐞 新增 Drawer属性
    -  closeIcon自定义关闭标签
    -  forceRender预渲染drawer里子元素
    -  drawerStyl、headerStyle设置弹出层、头部样式
    -  keyboard是否支持键盘关闭
    -  afterVisibleChange动画结束回调
    -  footer、footerStyle自定义抽屉页脚及样式
- 🐞 新增 Table属性
    -  position指定分页显示的位置
    -  locale设置默认文案
    -  ellipsis列内容超过宽度将自动省略
    -  checkStrictly设置父子数据选中状态是否关联
    -  type单选/多选设置
    -  rowExpandable点击展开图标时触发事件
- 🐞 新增 Layout属性
    -  Layout 的 class，支持布局容器 class
    -  Layout.Sider 的 class，支持侧边栏自定义 class
    -  Layout.Sider 的 zeroWidthTriggerStyle支持设置侧边栏特殊 trigger 的样式
- 🐞 新增 PageHeader属性
    -  avatar标题栏旁的头像
    -  backIcon自定义 back icon ，如果为 false 不渲染 back icon
- 🐞 新增 Anchor属性
    -  wrapperClass支持容器类名设置
    -  wrapperStyle支持容器样式设置
    -  getCurrentAnchor支持自定义高亮的锚点
    -  targetOffset支持锚点滚动偏移量的设置
    -  target支持点击时在何处显示链接的资源
- 🐞 新增 AutoComplete属性
    -  dropdownMenuStyle支持 dropdown 菜单自定义样式
    -  defaultActiveFirstOption是否默认高亮第一个选项
    -  blur、focus焦点管理（移除与获取）
- 🐞 新增 Cascader属性
    -  popupClassName自定义浮层类名
    -  popupStyle自定义浮层样式
    -  popupPlacement浮层预设位置
    -  search输入框变化时的回调
- 🐞 新增 InputNumber支持pressEnter按下回车的回调
- 🐞 新增 Slider属性
    -  autoFocus自动获取焦点
    -  reverse反向坐标轴
    -  tooltipPlacement支持设置 Tooltip 展示位置
    -  getTooltipPopupContainer设置 Tooltip 渲染到某个 dom 节点
- 🐞 新增 TimePicker 支持autoFocus自动获取焦点
- 🐞 新增 Transfer属性
    -  locale支持默认文案
    -  itemSelectRender Props 支持勾选条目
    -  itemSelectAll Render Props 勾选一组条目
-   新增TreeSelect属性
    -  treeIcon支持对 TreeNode title 前的图标的展示控制
    -  treeCheckStrictly 支持checkable 状态下节点选择完全受控
    -  replaceFields 换 treeNode 中 title,value,key,children,label 字段为 treeData 中对应的字段
    -  treeNodeLabelProp 作为显示的 prop 设置

## 0.2.8

`2020-6-30`

- 🐞 修复 `Tree-select` 组件中可勾选功能删除无效问题

## 0.2.7

`2020-5-21`

- 🐞 修复 `Spin` 组件中 spin-text 丢失问题

## 0.2.6

`2020-5-15`

- 🐞 修复 `Table` 组件中 `scopedSlots` 在有 `render` 属性时不生效的问题

## 0.2.5

`2020-4-30`

- 🐞 修复 `Pagination` 组件中点击样式问题
- 🐞 修复 `List` 组件中slot renderItem没有对外暴露index问题

## 0.2.3

`2020-01-09`

- 🐞 修复 `Collapse` 组件中on-change没有被触发的问题

## 0.2.2

`2020-01-08`

- 🐞 修复 `Table` 组件中dropdown位置不正确的问题
- 🐞 修复 `Icon` 组件 `@ant-design/icons` 升级后无法使用问题

## 0.2.1

`2019-12-20`

- 🐞 修复 `Button` 组件存在 `shape` 属性时slot无效问题
- 🐞 修复 `Button` 组件 `shape` 为 `round` 时样式无效问题
- 🐞 修复 `Dropdown` 组件中 `menu` 默认点击不关闭问题
- 🐞 修复 `Dropdown` 组件中 `menu` 位置不正确问题
- 🐞 使用 `@ant-design/icons` 替换本地 `icons`

## 0.2.0

`2019-12-10`

#### Features

对外第一个版本，提供 61 个常用[组件](https://github.com/ecomfe/santd/blob/master/src/index.js)
