<cn>
#### 禁用状态
增加disabled属性，可以对日历组件进行禁用
</cn>

```html
<template>
    <div>
        <s-datepicker disabled defaultValue="{{dateDefaultValue}}"/>
        <br /><br />
        <s-monthpicker disabled defaultValue="{{monthDefaultValue}}"/>
        <br /><br />
        <s-rangepicker disabled defaultValue="{{rangeDefaultValue}}" />
    </div>
</template>


<script>
import DatePicker from 'santd/date-picker';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            dateDefaultValue: moment('2019-06-06', 'YYYY-MM-DD'),
            monthDefaultValue: moment('2019-06', 'YYYY-MM'),
            rangeDefaultValue: [moment('2019-06-06', 'YYYY-MM-DD'), moment('2019-06-06', 'YYYY-MM-DD')]
        };
    }
}
</script>

```
