<cn>
####  选择功能
一个通用的日历面板，支持年/月切换。
</cn>

```html
<template>
    <div>
        <s-alert message="You selected date: {{displayDate}}" />
        <s-calendar on-panelChange="panelChange" on-select="handleSelect" />
    </div>
</template>
<script>
import Calendar from 'santd/calendar';
import Alert from 'santd/alert';
import moment from 'moment';

export default {
    components: {
        's-calendar': Calendar,
        's-alert': Alert
    },
    computed: {
        displayDate() {
            const selectedValue = this.data.get('selectedValue');
            return selectedValue && selectedValue.format('YYYY-MM-DD');
        }
    },
    initData() {
        return {
            value: moment('2017-01-25'),
            selectedValue: moment('2017-01-25')
        }
    },
    handleSelect(value) {
        this.data.set('value', value);
        this.data.set('selectedValue', value);
    },
    panelChange({value}) {
        this.data.set('value', value);
    }
}
</script>
```
