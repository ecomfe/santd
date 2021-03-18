<codebox>
#### 受控面板
通过组合 `mode` 与 `on-panelChange` 控制要展示的面板。

```html
<template>
    <div>
        <s-controlleddatepicker />
        <br /><br />
        <s-controlledrangepicker />
    </div>
</template>

<script>
import san from 'san';
import {DatePicker} from 'santd';

const ControlledDatePicker = san.defineComponent({
    components: {
        's-datepicker': DatePicker,
    },
    initData() { 
        return {
            mode: 'time'
        }
    },
    handleOpenChange(open) {
        if (open) {
            this.data.set('mode', 'time');
        }
    },
    handlePanelChange({value, mode}) {
        this.data.set('mode', mode);
    },
    template: `<div>
        <s-datepicker
            mode="{{mode}}"
            showTime
            on-openChange="handleOpenChange"
            on-panelChange="handlePanelChange"
        />
    </div>`
});

const ControlledRangePicker = san.defineComponent({
    components: {
        's-rangepicker': DatePicker.RangePicker,
    },
    initData() { 
        return {
            mode: ['month', 'month'],
            value: []
        }
    },
    handleChange({date}) {
        console.log(date);
        this.data.set('value', date);
    },
    handlePanelChange({value, mode}) {
        this.data.set('mode', [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]]);
        this.data.set('value', value);
    },
    template: `<div>
        <s-rangepicker
            placeholder="{{['Start month', 'End month']}}"
            format="YYYY-MM"
            value="{{value}}"
            mode="{{mode}}"
            on-change="handleChange"
            on-panelChange="handlePanelChange"
        />
    </div>`
});

export default {
    components: {
        's-controlleddatepicker': ControlledDatePicker,
        's-controlledrangepicker': ControlledRangePicker
    }
}
</script>

```
</codebox>
