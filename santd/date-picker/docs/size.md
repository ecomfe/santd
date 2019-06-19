<cn>
#### 三种大小
三种大小的输入框，若不设置，则为 default。
</cn>

```html
<template>
    <div>
        <div>
            <s-radiogroup value="{{size}}" on-change="handleSizeChange">
                <s-radiobutton value="large">Large</s-radiobutton>
                <s-radiobutton value="default">Default</s-radiobutton>
                <s-radiobutton value="small">Small</s-radiobutton>
            </s-radiogroup>
            <br /><br />
            <s-datepicker on-change="handleChange" size="{{size}}"/>
            <br /><br />
            <s-monthpicker placeholder="Select month" on-change="handleChange" size="{{size}}"/>
            <br /><br />
            <s-rangepicker on-change="handleChange" size="{{size}}"/>
            <br /><br />
            <s-weekpicker placeholder="Select week" on-change="handleChange" size="{{size}}"/>
        </div>
    </div>
</template>


<script>
import DatePicker from 'santd/date-picker';
import Radio from 'santd/radio';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-weekpicker': DatePicker.WeekPicker,
        's-rangepicker': DatePicker.RangePicker,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button
    },
    initData() {
        return {
            size: 'default'
        };
    },
    handleSizeChange(e) {
        this.data.set('size', e.target.value);
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
