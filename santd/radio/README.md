## API

### Radio

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | `false` |
| checked | 指定当前是否选中 | boolean |`1false` |
| defaultChecked | 初始是否选中 | boolean | `false` |
| value | 根据 value 进行比较，判断是否选中 | any | - |

### RadioGroup

单选框组合，用于包裹一组 `Radio`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的值 | any | - |
| disabled | 禁选所有子单选器 | boolean | `false` |
| name | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性 | string | - |
| options | 以配置形式设置子元素 | string\[] \| Array&lt;{ label: string value: string disabled?: boolean }> | - |
| size | 大小，只对按钮样式生效 | `large` \| `default` \| `small` | `default` |
| value | 用于设置当前选中的值 | any | - |
| on-change | 选项变化时的回调函数 | Function(e:Event) | - |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | `outline` \| `solid` | `outline` |

## 方法

### Radio

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |
