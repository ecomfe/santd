<text lang="cn">
#### 选择不超过七天的范围
这里举例如何用 `on-calendarChange` 和 `disabledDate` 来限制动态的日期区间选择。
</text>

```html
<template>
    <s-range-picker
        disabledDate="{{disabledDate}}"
        on-calendarChange="handleCalendarChange"
        on-openChange="handleOpenChange">
    </s-range-picker>
</template>

<script>
import {DatePicker} from 'santd';

export default {
    components: {
        's-range-picker': DatePicker.RangePicker
    },
    initData() {
        const that = this;
        return {
            disabledDate(current) {
                const dates = that.data.get('dates');
                if (!dates) {
                    return false;
                }
                const tooLate = current.diff(dates[0], 'days') >= 7;
                const tooEarly = dates[0].diff(current, 'days') >= 7;
                return tooLate || tooEarly;
            }
        }
    },
    handleCalendarChange({dates}) {
        this.data.set('dates', dates);
    },
    handleOpenChange(open) {
        if (open) {
            this.data.set('dates', undefined);
        }
    }
}
</script>
```
