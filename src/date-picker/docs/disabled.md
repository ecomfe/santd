<text lang="cn">
#### 禁用状态
增加disabled属性，可以对日历组件进行禁用
</text>

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
import dayjs from 'dayjs';
import {DatePicker} from 'santd';

dayjs.extend(require('dayjs/plugin/customParseFormat'));

const dateFormat = 'YYYY-MM-DD';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            dateDefaultValue: dayjs('2019-06-06', 'YYYY-MM-DD'),
            monthDefaultValue: dayjs('2019-06', 'YYYY-MM'),
            rangeDefaultValue: [dayjs('2019-06-06', 'YYYY-MM-DD'), dayjs('2019-06-06', 'YYYY-MM-DD')]
        };
    }
}
</script>

```
