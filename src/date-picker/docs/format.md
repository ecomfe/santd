<codebox>
#### 日期格式
使用 `format` 属性，可以自定义日期显示格式。

```html
<template>
    <div>
        <div>
            <s-datepicker defaultValue="{{value1}}" format="{{dateFormat}}" />
            <br /><br />
            <s-datepicker defaultValue="{{value2}}" format="{{dateFormatList[0]}}" />
            <br /><br />
            <s-monthpicker defaultValue="{{value3}}" format="{{monthFormat}}" />
            <br /><br />
            <s-rangepicker defaultValue="{{value4}}" format="{{dateFormat}}" />
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import {DatePicker} from 'santd';

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            dateFormat,
            monthFormat,
            dateFormatList,
            value1: dayjs('2019/01/01', dateFormat),
            value2: dayjs('01/01/2019', dateFormatList[0]),
            value3: dayjs('2019/01/01', monthFormat),
            value4: [dayjs('2019/10/01', dateFormat), dayjs('2019/10/20', dateFormat)]
        };
    }
}
</script>

```
</codebox>
