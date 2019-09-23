## API

### input


### 基本api

| 属性          | 说明                                                                                                                                                                                        | 类型      | 默认值  |
| ---           | ---                                                                                                                                                                                         | ---       | ---     |
| addonAfter    | 设置后置标签                                                                                                                                                                                | string \| slot    | - |
| addonBefore   | 设置前置标签                                                                                                                                                                                | string \| slot    | - |
| defaultValue  | 输入框默认内容                                                                                                                                                                              | string    | -       |
| placeholder   | placeholder                                                                                                                                                                                 | string    | -       |
| disabled      | 是否禁用状态，默认为 false                                                                                                                                                                  | boolean   | false   |
| id            | 输入框的 id                                                                                                                                                                                 | string    | -       |
| prefix        | 带有前缀图标的 input                                                                                                                                                                        | string \| slot    | - |
| size          | 控件大小。注：标准表单内的输入框大小限制为 large。可选`large` `small`                                                                                                                       | string  | default |
| suffix        | 带有后缀图标的 input                                                                                                                                                                        | string \| slot         | - |
| type          | 默认为text，支持input原生type类型,但最好只用text，其它type参照对应实现的组件<br>注意：textarea直接用`Input.TextArea`代替`type="textarea"`<br>并且`type="number"`有单独的inputNumber组件实现 | string    | text    |
| value         | 输入框内容                                                                                                                                                                                  | string    | -       |
| allowClear    | 可以点击清除图标删除内容                                                                                                                                                                    | boolean   | -       |
| on-change     | 输入框内容变化时的回调                                                                                                                                                                      | function  | -       |
| on-pressEnter | 按下回车的回调                                                                                                                                                                              | function  | -       |
| on-blur       | 失去焦点时的回调                                                                                                                                                                            | function  | -       |


### Input.TextArea

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autosize | 自适应内容高度，可设置为 `true\|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object| - |
|defaultValue| 输入框默认内容  | string | -|
|value| 输入框内容     | string | -|
|on-pressEnter| 按下回车的回调   | function | -|

> 注：其他属性和浏览器自带的 textarea 一致

### Input.Search

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 addon 冲突。 | string| -|
| on-search | 当点击搜索时执行 | function| -|

### Input.Group

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| compact | 是否用紧凑模式 | boolean | false |
| size | Input.Group 中所有的 Input 的大小，可选 `large` `default` `small` | string | `default` |

> 例子：

```html
<s-input-group compact>
    <s-input style="width: 20%" defaultValue="0571"/>
    <s-input style="width: 30%" defaultValue="26888888"/>
</s-input-group>
```

### Input.Password

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibilityToggle | 是否显示切换按钮 | boolean | true |
