<text lang="cn">
#### 预设范围
可以预设常用的日期范围以提高用户体验。
</text>

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
import moment from 'moment';
import {DatePicker} from 'santd';

export default {
    components: {
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            ranges: {
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')]
            }
        }
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
