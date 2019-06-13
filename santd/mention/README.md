## API

提及组件，用于在输入中提及某事或某人

详细属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false | |
| disabled | 是否禁用状态. | boolean | false | |
| loading | 加载中 | boolean | false | - |
| baseStyle | 输入位置的样式 | object | - |
| multiLines | 多行模式 | boolean | false |
| notFoundContent | 未找到时的内容 | string | '无匹配结果，轻敲空格完成输入' |
| placeholder | 输入框默认文字 | string | null |
| placement | 建议框位置，可选 `top` `bottom` | string | 'bottom' |
| prefix | 触发弹出下拉框的字符 | string or Array<string> | '@' |
| readOnly | 是否只读. | boolean | false |
| defaultValue | 默认值 | string | '' | |
| value | 值 | string | '' |
| defaultSuggestions | 默认建议内容 | Array&lt;string> | \[] | |
| suggestions | 建议内容 | Array&lt;string> | \[] |
| suggestionStyle | 弹出下拉框样式 | string | '' |
| on-blur | 失去焦点时回调 | function(e) | null |
| on-focus | 获得焦点时回调 | function(e) | null |
| on-change | 输入框内容变化时回调 | function(e) | null |
| on-searchChange | 输入框中 @ 变化时回调 | function(value:string, trigger: string) | \[] |
| on-select | 下拉框选择建议时回调 | function(suggestion: string) | null |

## mention Methods
| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |
