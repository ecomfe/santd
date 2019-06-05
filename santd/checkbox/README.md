## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 失效状态 | boolean | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | false |
| on-change | 变化时回调函数 | Function(e:Event) | - |

### Checkbox Group
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的项 | string[] | [] |
| disabled | 整组失效 | boolean | false |
| name | `CheckboxGroup` 下所有 `input[type="checkbox"]` 的 `name` 属性 | string | - |
| options | 指定可选项 | string[] | [] |
| value | 指定选中的选项 | string[] | [] |
| on-change | 变化时回调函数 | Function(checkedValue) | - |

## 方法

### Checkbox
| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
