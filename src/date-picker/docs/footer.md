<text lang="cn">
#### 额外的页脚
在浮层中加入额外的页脚，以满足某些定制信息的需求。
</text>

```html
<template>
    <div>
        <div>
            <s-datepicker renderExtraFooter="{{extraFooter}}"/>
            <br /><br />
            <s-datepicker renderExtraFooter="{{extraFooter}}" showTime />
            <br /><br />
            <s-rangepicker renderExtraFooter="{{extraFooter}}" />
            <br /><br />
            <s-rangepicker renderExtraFooter="{{extraFooter}}" showTime />
            <br /><br />
            <s-monthpicker renderExtraFooter="{{extraFooter}}" placeholder="Select month" />
        </div>
    </div>
</template>

<script>
import san from 'san';
import DatePicker from 'santd/date-picker';

export default {
    components: {
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return {
            extraFooter() {
                return san.defineComponent({
                    template: `<span>extra footer</span>`
                });
            }
        }
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
