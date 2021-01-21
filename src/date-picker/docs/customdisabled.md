<text lang="cn">
#### 不可选择日期和时间
可用 `disabledDate` 和 `disabledTime` 分别禁止选择部分日期和时间，其中 `disabledTime` 需要和 `showTime` 一起使用。
</text>

```html
<template>
    <div>
        <s-datepicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate="{{disabledDate}}"
            disabledTime="{{disabledDateTime}}"
            showTime="{{showTime}}"
        />
        <br /><br />
        <s-monthpicker placeholder="Select Month" disabledDate="{{disabledDate}}" />
        <br /><br />
        <s-rangepicker
            disabledDate="{{disabledDate}}"
            disabledTime="{{disabledRangeTime}}"
            showTime="{{rangeShowTime}}"
            format="YYYY-MM-DD HH:mm:ss"
        />
    </div>
</template>


<script>
import moment from 'moment';
import {DatePicker} from 'santd';

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

const dateFormat = 'YYYY-MM-DD';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            showTime: { 
                defaultValue: moment('00:00:00', 'HH:mm:ss'),
            },
            disabledDate(current) {
                return current && current < moment().endOf('day');
            },
            disabledDateTime() {
                return {
                    disabledHours: () => range(0, 24).splice(4, 20),
                    disabledMinutes: () => range(30, 60),
                    disabledSeconds: () => [55, 56]
                };
            },
            disabledRangeTime(_, type) {
                if (type === 'start') {
                    return {
                        disabledHours: () => range(0, 60).splice(4, 20),
                        disabledMinutes: () => range(30, 60),
                        disabledSeconds: () => [55, 56]
                    };
                }
                return {
                    disabledHours: () => range(0, 60).splice(20, 4),
                    disabledMinutes: () => range(0, 31),
                    disabledSeconds: () => [55, 56]
                };
            },
            rangeShowTime: {
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
            }
        };
    }
}
</script>

```
