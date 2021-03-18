<codebox>
#### 预设范围
可以预设常用的日期范围以提高用户体验。

```html
<template>
    <div>
        <div>
            <s-rangepicker on-change="handleChange" ranges="{{ranges}}" />
            <br /><br />
            <s-rangepicker on-change="handleChange" ranges="{{ranges}}" showTime format="YYYY/MM/DD HH:mm:ss" />
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import {DatePicker} from 'santd';

export default {
    components: {
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            ranges: {
                Today: [dayjs(), dayjs()],
                'This Month': [dayjs().startOf('month'), dayjs().endOf('month')]
            }
        }
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
</codebox>
