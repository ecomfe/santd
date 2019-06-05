<cn>
#### 日期格式
使用 `format` 属性，可以自定义日期显示格式。
</cn>

```html
<template>
    <div>
        <div>
            <s-date-picker value="{=datePicker.value=}" range="{{datePicker.range}}" format="YYYY/MM/DD"/>
        </div>
        <br>
        <div>
            <s-range-picker value="{=rangePicker.value=}" format="YYYY/MM/DD"/>
        </div>
    </div>
</template>


<script>
import {DatePicker, RangePicker} from 'santd/date-picker';
import format from 'date-fns/format';
export default {
    components: {
        's-date-picker': DatePicker,
        's-range-picker': RangePicker
    },
    initData() {
        return {
            datePicker: {
                value: new Date(),
                range: {
                    begin: new Date(2014, 4, 1),
                    end: new Date()
                }
            },
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
