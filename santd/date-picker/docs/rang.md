<cn>
#### RangePicker
选择范围时间
</cn>

```html
<template>
    <div>
        <s-range-picker value="{=rangePicker.value=}" />
        <span>
            Value is: {{rangePicker.value.begin | datetime('YYYY-MM-DD')}} - {{rangePicker.value.end | datetime('YYYY-MM-DD')}}
        </span>
    </div>
</template>


<script>
import {DatePicker, RangePicker} from 'santd/date-picker';
import format from 'date-fns/format';
export default {
    components: {
        's-range-picker': RangePicker
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return format(value, f);
        }
    },
    initData() {
        return {
            rangePicker: {
                value: {
                    begin: new Date(2017, 9, 10),
                    end: new Date(2018, 11, 12)
                }
            }
        };
    }
}
</script>

```
