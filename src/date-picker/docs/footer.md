<codebox>
#### 额外的页脚
在浮层中加入额外的页脚，以满足某些定制信息的需求。

```html
<template>
    <div>
        <div>
            <s-datepicker>
                <div slot="renderExtraFooter">extra footer</div>
            </s-datepicker>
            <br /><br />
            <s-datepicker showTime>
                <div slot="renderExtraFooter">extra footer</div>
            </s-datepicker>
            <br /><br />
            <s-rangepicker>
                <div slot="renderExtraFooter">extra footer</div>
            </s-rangepicker>
            <br /><br />
            <s-rangepicker showTime>
                <div slot="renderExtraFooter">extra footer</div>
            </s-rangepicker>
            <br /><br />
            <s-monthpicker placeholder="Select month">
                <span slot="renderExtraFooter">extra footer</span>
            </s-monthpicker>
        </div>
    </div>
</template>

<script>
import {DatePicker} from 'santd';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
</codebox>
