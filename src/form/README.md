## API

### Form：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 经 Form.create() 包装过的组件会自带 this.data.get('form') 属性 | object | - |
| hideRequiredMark | 隐藏所有表单项的必选标记 | boolean | false |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | object | - |
| layout | 表单布局 | 'horizontal'\|'vertical'\|'inline' | 'horizontal' |
| on-submit | 数据验证成功后回调事件 | Function(e:Event) | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | object | - |
| colon |  配置 Form.Item 的 colon 的默认值 | boolean | true |

### Form.create(options)

使用方式如下

```javascript
CustomizedForm = Form.create({})({
    template: '<div>customized form</div>'
});
```

`options` 的配置如下

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| mapPropsToFields | 把父组件的属性映射到表单项上（如：把 Redux store 中的值读出），需要对返回值中的表单域数据用 Form.createFormField 标记，注意表单项将变成受控组件, error 等也需要一并手动传入 | (form) => ({ [fieldName]: FormField { value } }) |
| name |  设置表单域内字段 id 的前缀 | - |
| validateMessages | 默认校验信息，可用于把默认错误信息改为中文等，格式与 newMessages 返回值一致 | Object { [nested.path]: String } |
| onFieldsChange | 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store| Function(form, changedFields, allFields) |
| onValuesChange | 任一表单域的值发生改变时的回调 | Function(form, changedValues, allValues) => void |

经过 `Form.create` 包装的组件将会自带 `form` 属性，供外部组件在 `computed` 内使用，在方法内可以直接使用 `this` 调用， `form` 提供的API如下：

注意：使用 `getFieldsValue` `getFieldValue` `setFieldsValue` 等时，应确保对应的 field 已经用 `decorator`属性 注册过了。


| 方法              | 说明                                                                        | 类型                             |
| ---               | ---                                                                         | ---                              |
| getFieldError     | 获取某个输入控件的 Error                                                    | Function(name)                   |
| getFieldsError    | 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error             | Function([names: string[]])      |
| getFieldsValue    | 获取一组输入控件的值，如不传入参数，则获取全部组件的值                      | Function([fieldNames: string[]]) |
| getFieldValue     | 获取一个输入控件的值                                                        | Function(fieldName: string)      |
| isFieldsTouched   | 判断是否任一输入控件经历过 getFieldDecorator 的值收集时机 options.trigger   | (names?: string[]) => boolean    |
| isFieldTouched    | 判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger   | (name: string) => boolean        |
| isFieldValidating | 判断一个输入控件是否在校验状态                                              | Function(name)                   |
| resetFields       | 重置一组输入控件的值（为 initialValue）与状态，如不传入参数，则重置所有组件 | Function([names: string[]])      |
| setFields         | 设置一组输入控件的值与错误状态：代码                                        | ({[fieldName]: {value: any, errors: [Error] }}) => void|
| setFieldsValue|设置一组输入控件的值| ({ [fieldName]: value }) => void|
| validateFields|校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件|([fieldNames: string[]],[options: object],callback(errors, values)) => void|
| validateFieldsAndScroll|与 validateFields 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围|参考 validateFields|

### validateFields/validateFieldsAndScroll
```javascript
const validateFields = this.validateFields;
validateFields((errors, values) => {
    // ...
});
validateFields(['field1', 'field2'], (errors, values) => {
    // ...
});
validateFields(['field1', 'field2'], options, (errors, values) => {
    // ...
});
```

| 参数                | 说明                                                                            | 类型     | 默认值 |
| ---                 | ---                                                                             | ---      | ---    |
| options.first       | 若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验             | boolean  | false  |
| options.firstFields | 指定表单域会在碰到第一个失败了的校验规则后停止校验                              | String[] | []     |
| options.force       | 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验               | boolean  | false  |
| options.scroll      | 定义 validateFieldsAndScroll 的滚动行为，详细配置见 (dom-scroll-into-view config)[https://github.com/yiminghe/dom-scroll-into-view#function-parameter] | Object   | {}     |

### validateFields 的 callback 参数示例

errors:

```javascript
{
  "userName": {
    "errors": [
      {
        "message": "Please input your username!",
        "field": "userName"
      }
    ]
  },
  "password": {
    "errors": [
      {
        "message": "Please input your Password!",
        "field": "password"
      }
    ]
  }
}
```

values:

```javascript
{
  "userName": "username",
  "password": "password",
}
```

Form.createFormField

用于标记 `mapPropsToFields` 返回的表单域数据

### decorator['options']

经过 decorator 包装的控件，数据同步将被 Form 接管，这会导致以下结果：

1. 你需要在组件内部dispatch `UI:form-item-interact` 事件，参数为`{filedValue, type}` `filedValue` 为组件内部派发的值，`type` 为触发动作，如 `change`。
2. 你不能用控件的 `value` `defaultValue` 等属性来设置表单域的值，默认值可以用 `decorator` 里的 `initialValue`。
3. 你不应该用双向绑定，可以使用 `this.setFieldsValue` 来动态改变表单值。

### decorator['options']参数

| 参数                      | 说明                                                                                                                                   | 类型                                       | 默认值     |
| ---                       | ---                                                                                                                                    | ---                                        | ---        |
| options.name                        | 必填输入控件唯一标志。支持嵌套式的写法。                                                                                               | string                                     |            |
| options.getValueFromEvent | 可以把 change 的参数（如 event）转化为控件的值                                                                                         | function(..args)                           | reference  |
| options.initialValue      | 子节点的初始值，类型、可选值均由子节点决定 |                                            |
| options.normalize         | 转换默认的 value 给控件                                                                                            | function(value, prevValue, allValues): any | -          |
| options.preserve          | 即便字段不再使用，也保留该字段的值                                                                                                     | boolean                                    | -          |
| options.rules             | 校验规则，参考下方文档                                                                                                                 | object[]                                   |
| options.trigger           | 收集子节点的值的时机                                                                                                                   | string                                     | 'change' |
| options.validateFirst     | 当某一规则校验不通过时，是否停止剩下的规则的校验                                                                                       | boolean                                    | false      |
| options.validateTrigger   | 校验子节点值的时机                                                                                                                     | string\|string[]                                     | 'change' |
| options.valuePropName     | 子节点的值的属性，如 Switch 的是 'checked'                                                                                             | string                                     | 'value'    |

### Form.FormItem

注意：一个 Form.FormItem 建议只放一个被 decorator属性 装饰过的 child，当有多个被装饰过的 child 时，help required validateStatus 无法自动生成。

| 参数           | 说明                                                                                                                                                                                                            | 类型      | 默认值 |
| ---            | ---                                                                                                                                                                                                             | ---       | ---    |
| colon          | 配合 label 属性使用，表示是否显示 label 后面的冒号                                                                                                                                                              | boolean   | true   |
| extra          | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。                                                                                                                                | string\|slot   |  |
| hasFeedback    | 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用                                                                                                                                       | boolean   | false  |
| help           | 提示信息，如不设置，则会根据校验规则自动生成                                                                                                                                                                    | string\|slot   |  |
| label          | label 标签的文本                                                                                                                                                                                                | string\|slot       |  |
| labelCol       | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}`。你可以通过 `Form` 的 `labelCol` 进行统一设置。当和 `Form` 同时设置时，以 `FormItem` 为准。 | object    |        |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                                                                                                                                                    | boolean   | false  |
| validateStatus | 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'                                                                                                                    | string    |        |
| wrapperCol     | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`。你可以通过 `Form` 的 `labelCol` 进行统一设置。当和 `Form` 同时设置时，以 `FormItem` 为准。                                                         | object    |        |

### 校验规则

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enum | 枚举类型 | string | - |
| len | 字段长度 | number | - |
| max | 最大长度 | number | - |
| message | 校验文案 | string | - |
| min | 最小长度 | number | - |
| pattern | 正则表达式校验 | RegExp | - |
| required | 是否必选 | boolean | `false` |
| transform | 校验前转换字段值 | function(value) => transformedValue:any | - |
| type | 内建校验类型，[可选项](https://github.com/yiminghe/async-validator#type) | string | 'string' |
| whitespace | 必选时，空格是否会被视为错误 | boolean | `false` |

更多高级用法可研究 [async-validator](https://github.com/yiminghe/async-validator)。

