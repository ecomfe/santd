<cn>
#### 日期时间选择
增加选择时间功能，当 `showTime` 为一个对象时，其属性会传递给内建的 `TimePicker`。
</cn>

```html
<template>
    <div>
        <s-datepicker showTime placeholder="Select Time" on-change="handleChange" on-ok="handleOk"/>
        <br /><br />
        <s-rangepicker
            showTime="{{showTime}}"
            format="YYYY-MM-DD HH:mm"
            placeholder="{{['Start Time', 'End Time']}}"
            on-change="handleChange"
            on-ok="handleOk"
        />
    </div>
</template>

<script>
import DatePicker from 'santd/date-picker';

export default {
    components: {
        's-datepicker': DatePicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            showTime: {
                format: 'HH:mm'
            }
        };
    },
    handleChange({date, dateString}) {
        console.log('Selected Time: ', date);
        console.log('Formatted Selected Time: ', dateString);
    },
    handleOk(value) {
        console.log('onOk: ', value);
    }
}
</script>

```
