<text lang="cn">
#### 定制日期单元格
使用 `dateRender` 可以自定义日期单元格的内容和样式。
</text>

```html
<template>
    <div>
        <div>
            <s-datepicker>
                <div class="san-calendar-date" slot="dateRender" style="{{getDateStyle(current)}}">{{getDate(current)}}</div>
            </s-datepicker>
            <br /><br />
            <s-rangepicker>
                <div class="san-calendar-date" slot="dateRender" style="{{getDateStyle(current)}}">{{getDate(current)}}</div>
            </s-rangepicker>
        </div>
    </div>
</template>

<script>
import {DatePicker} from 'santd';

export default {
    components: {
        's-datepicker': DatePicker,
        's-rangepicker': DatePicker.RangePicker
    },
    getDate(current) {
        return current.date();
    },
    getDateStyle(current) {
        if (current.date() === 1) {
            return 'border: 1px solid #1890ff; border-radius: 50%';
        }
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
