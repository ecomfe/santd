<text lang="cn">
#### 自定义日期范围选择
当 `RangePicker` 无法满足业务需求时，可以使用两个 `DatePicker` 实现类似的功能。

> * 通过设置 disabledDate 方法，来约束开始和结束日期。
> * 通过 open onOpenChange 来优化交互。
</text>

```html
<template>
    <div>
        <s-datepicker
            disabledDate="{{disabledStartDate}}"
            format="YYYY-MM-DD"
            value="{{startValue}}"
            placeholder="Start"
            on-change="handleStartChange"
            on-openChange="handleStartOpenChange"
        />
        <br /><br />
        <s-datepicker
            disabledDate="{{disabledEndDate}}"
            format="YYYY-MM-DD"
            value="{{endValue}}"
            placeholder="End"
            open="{{endOpen}}"
            on-change="handleEndChange"
            on-openChange="handleEndOpenChange"
        />
    </div>
</template>

<script>
import DatePicker from 'santd/date-picker';

export default {
    components: {
        's-datepicker': DatePicker
    },
    initData() {
        const that = this;
        return {
            startValue: null,
            endValue: null,
            endOpen: false,
            disabledStartDate(startValue) {
                const endValue = that.data.get('endValue');
                if (!startValue || !endValue) {
                    return false;
                }
                return startValue.valueOf() > endValue.valueOf();
            },
            disabledEndDate(endValue) {
                const startValue = that.data.get('startValue');
                if (!endValue || !startValue) {
                    return false;
                }
                return endValue.valueOf() <= startValue.valueOf();
            }
        }
    },
    handleChange(field, value) {
        this.data.set(field, value);
    },
    handleStartChange({date, dateString}) {
        this.handleChange('startValue', date);
    },
    handleEndChange({date, dateString}) {
        this.handleChange('endValue', date);
    },
    handleStartOpenChange(open) {
        if (!open) {
            this.data.set('endOpen', true);
        }
    },
    handleEndOpenChange(open) {
        this.data.set('endOpen', open);
    }
}
</script>

```
