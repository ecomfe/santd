## API

### Tabs

| 属性               | 说明                                                     | 类型                                | 默认值     |
| ---                | ---                                                      | ---                                 | ---        |
| activeKey          | 当前激活 tab 面板的 key                                  | string                              | 无         |
| animated           | 是否使用动画切换 Tabs，在 tabPosition=top \| bottom 时有效                       | boolean \| {tabPane:boolean, inkBar:boolean} | true, 当 type="card" 时为 false |
| renderTabBar       | 替换TabBar，用于二次封装标签头                           | slot | 无         |
| defaultActiveKey   | 初始化选中面板的 key，如果没有设置 activeKey             | string                              | 第一个面板 |
| hideAdd            | 是否隐藏加号图标，在 `type="editable-card"` 时有效       | boolean                             | false      |
| size               | 大小，提供 `large` `default` 和 `small` 三种大小         | string                              | 'default'  |
| tabBarExtraContent | tab bar 上额外的元素                                     | slot                             | 无         |
| tabBarGutter       | tabs 之间的间隙                                          | number                              | 无         |
| tabBarStyle        | tab bar 的样式对象                                       | object                              | -          |
| tabPosition        | 页签位置，可选值有 `top` `right` `bottom` `left`         | string                              | 'top'      |
| type               | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string                              | 'line'     |
| on-change          | 切换面板的回调                                           | Function(activeKey) {}              |   无         |
| on-edit            | 新增和删除页签的回调，在 `type="editable-card"` 时有效   | ({key, action}): void               |   无         |
| on-nextClick       | next 按钮被点击的回调                                    | Function                            |   无         |
| on-prevClick       | prev 按钮被点击的回调                                    | Function                            |   无         |
| on-tabClick        | tab 被点击的回调                                         | Function                            |   无         |

### Tabs.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应 activeKey | string | 无 |
| tab | 选项卡头显示文字 | string | 无 |
