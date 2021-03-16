## API

日期类组件包括以下四种形式。

* DatePicker
* MonthPicker
* RangePicker
* WeekPicker

### 共同的API

以下 API 为 DatePicker、MonthPicker、RangePicker, WeekPicker 共享的 API。

| 参数                 | 说明                                                                       | 类型                                                    | 默认值  |
| ---                  | ---                                                                        | ---                                                     | ---     |
| allowClear           | 是否显示清除按钮                                                           | boolean                                                 | true    |
| autoFocus            | 自动获取焦点                                                               | boolean                                                 | false   |
| dateRender           | 自定义日期单元格的内容                                                     | slot | -       |
| disabled             | 禁用                                                                       | boolean                                                 | false   |
| disabledDate         | 不可选择的日期                                                             | (currentDate: dayjs) => boolean                        | -       |
| dropdownClassName    | 额外的弹出日历 className                                                   | string                                                  | ''      |
| getCalendarContainer | 定义浮层的容器，默认为 body 上新建 div                                     | function(trigger)                                       | -       |
| locale | 国际化配置	                                     | [object](https://github.com/ecomfe/santd/tree/master/src/date-picker/example.json)                                       |    -    |
| open                 | 控制弹层是否展开                                                           | boolean                                                 | -       |
| placeholder          | 输入框提示文字                                                             | string\|RangePicker[]         | - |
| popupStyle                 | 额外的弹出日历样式      | object                                                  | {} |
| size               | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | string                                                  | -       |
| suffixIcon               | 自定义的选择框后缀图标 | slot                                                  | -       |
| inputReadOnly               | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean                                                  | -       |
| align               | 该值将合并到 placement 的配置中，设置参考 dom-align | [object](https://github.com/yiminghe/dom-align)                                                  | -       |
| on-openChange               | 弹出日历和关闭日历的回调 | function(status)                                                  | -       |
| on-panelChange               | 日历面板切换的回调 | function({value, mode})                                                  | -       |

### 共同的方法

| 名称                 | 描述                                                                       |
| ---                  | ---                                                                        |
| blur()           | 移除焦点                                                           |
| focus()            | 获取焦点                                                               |

### DatePicker

| 参数                 | 说明                                                                                              | 类型                                  | 默认值        |
| ---                  | ---                                                                                               | ---                                   | ---           |
| defaultValue         | 默认日期，如果开始时间或结束时间为 `null` 或者 `undefined`，日期范围将是一个开区间                | [dayjs](https://day.js.org)         | -             |
| disabledTime         | 不可选择的时间                                                                                    | function(date) => boolean             | -             |
| format               | 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 [dayjs.js](https://day.js.org) | string\|string[]      | 'YYYY-MM-DD'     |
| mode                 | 日期面板的状态                                                                                    | `time` `date` `month` `year` `decade` | 'date'        |
| renderExtraFooter    | 在面板中添加额外的页脚                                                                            | slot                     | -             |
| monthRender    | 自定义的月份内容渲染方法                                                                            | slot                     | -             |
| showTime             | 增加时间选择功能                                                                                  | Object\|boolean               | - |
| showTime.defaultValue    | 设置用户选择日期时默认的时分秒                                                                          | [dayjs](https://day.js.org)                                | dayjs()            |
| showToday |  是否展示“今天”按钮                                                           | boolean                     | true             |
| value    | 日期                                                                          | [dayjs](https://day.js.org)                                | -            |
| on-change          | 时间发生变化的回调                                                                                    | function({date: dayjs, dateString: string}) | -     |
| on-ok        | 点击确定按钮的回调                                                                          | function()                      | -             |
| on-panelChange       | 日历面板切换的回调                                                                                | function({value, mode})               | -             |

### MonthPicker

| 参数                 | 说明                                                                                              | 类型                                  | 默认值        |
| ---                  | ---                                                                                               | ---                                   | ---           |
| defaultValue         | 默认日期                | [dayjs](https://day.js.org)         | -             |
| disabledTime         | 不可选择的时间                                                                                    | function(date) => boolean             | -             |
| format               | 设置日期格式，配置参考 [dayjs.js](https://day.js.org) | string      | 'YYYY-MM'     |
| renderExtraFooter    | 在面板中添加额外的页脚                                                                            | slot                     | -             |
| value    | 日期                                                                          | [dayjs](https://day.js.org)                                | -            |
| on-change          | 时间发生变化的回调                                                                                    | function({date: dayjs, dateString: string}) | -     |

### WeekPicker

| 参数                 | 说明                                                                                              | 类型                                  | 默认值        |
| ---                  | ---                                                                                               | ---                                   | ---           |
| defaultValue         | 默认日期                | [dayjs](https://day.js.org)         | -             |
| format               | 设置日期格式，配置参考 [dayjs.js](https://day.js.org) | string      | 'YYYY-wo'     |
| renderExtraFooter    | 在面板中添加额外的页脚                                                                            | slot                     | -             |
| value    | 日期                                                                          | [dayjs](https://day.js.org)                                | -            |
| on-change          | 时间发生变化的回调                                                                                    | function({date: dayjs, dateString: string}) | -     |

### RangePicker

| 参数                  | 说明                                                                                              | 类型                                               | 默认值   |
| ---                   | ---                                                                                               | ---                                                | ---      |
| defaultValue          | 默认日期                                                                                          | [dayjs](https://day.js.org)[]                    | -        |
| disabledTime          | 不可选择的时间                                                                                    | function(date: [dayjs, dayjs], partial: `'start'\|'end'`)       | -            |
| format                | 展示的日期格式 | string | 'YYYY-MM-DD HH:mm:ss' |
| ranges                  | 预设时间范围快捷选择                                                                                    |  { [range: string]: dayjs[] } \| { [range: string]: () => dayjs[] }             | -   |
| renderExtraFooter     | 在面板中添加额外的页脚                                                                            | slot                               | -        |
| separator     | 设置分隔符                                                                            | string                                  | '~'        |
| showTime              | 增加时间选择功能                                                                                  | Object\|boolean  | -            |
| showTime.defaultValue | 设置用户选择日期时默认的时分秒                                                                    | [dayjs](https://day.js.org)[]                      | [dayjs(), dayjs()] |
| value                 | 日期                                                                                              | [dayjs](https://day.js.org)[]                      | -        |
| on-change             | 时间发生变化的回调                                                                                | function({date: [dayjs, dayjs], dateString: [string, string]})       | -        |
| on-ok                 | 点击确定按钮的回调                                                                                | function(date: [dayjs](https://day.js.org)[])                                         | -        |
