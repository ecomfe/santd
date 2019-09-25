## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 菜单是否禁用 | boolean | - |
| getPopupContainer| 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode) | `() => document.body` |
| overlay | 菜单 | slot | - |
| overlayClassName | 下拉根元素的类名称 | string | - |
| overlayStyle | 下拉根元素的样式 | object | - |
| placement | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | string | `bottomLeft` |
| trigger | 触发下拉的行为：`hover` `click` `contextMenu`, 移动端不支持 hover | string | `hover` |
| visible | 菜单是否显示 | boolean | - |
| on-visibleChange | 菜单显示状态改变时调用,参数为 visible | Function(visible) | - |

`overlay` 菜单使用 Menu，还包括菜单项 `Menu.Item`，分割线 `Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
>
> Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 `<Menu selectable>`.

## Dropdown.Button

| 参数             | 说明                                                                                     | 类型       | 默认值         |
| ---              | ---                                                                                      | ---        | ---            |
| disabled         | 菜单是否禁用                                                                             | boolean    | -              |
| icon             | 右侧的 icon 类型                                                                         | string     | -              |
| overlay          | 菜单                                                                                     | 同dropdown | -              |
| placement        | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | string     | `bottom-start` |
| size             | 按钮大小，和 `Button` 一致                                                               | string     | `default`      |
| trigger          | 触发形式,可选值: `hover`, `click`                                                        | string     | -              |
| type             | 按钮类型，和 `Button` 一致                                                               | string     | `default`      |
| visible          | 菜单是否显示                                                                             | boolean    | -              |
| on-click         | 点击左侧按钮的回调，和 `Button` 一致                                                     | function           |                |
| on-visibleChange | 菜单显示状态改变时调用                                                                   | function           |                |

