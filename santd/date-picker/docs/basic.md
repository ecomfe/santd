<text lang="cn">
#### 基本使用
最简单的用法，在浮层中可以选择或者输入日期。
</text>

```html
<template>
    <div>
        <s-datepicker on-change="handleChange" />
        <br /><br />
        <s-monthpicker placeholder="Select month" on-change="handleChange"/>
        <br /><br />
        <s-rangepicker on-change="handleChange" />
        <br /><br />
        <s-weekpicker placeholder="Select week" on-change="handleChange" />
    </div>
</template>

<script>
import DatePicker from 'santd/date-picker';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-weekpicker': DatePicker.WeekPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
