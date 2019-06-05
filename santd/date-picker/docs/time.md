<cn>
#### Todo: 显示时间
通过添加time属性，可以增加时间的设置
</cn>

```html
<template>
    <div>
        <s-date-picker time value="{=datePicker.value=}" range="{{datePicker.range}}"/>
        <span>
            Value is: {{datePicker.value | datetime('YYYY-MM-DD HH:mm:ss')}}
        </span>
    </div>
</template>


<script>
import DatePicker from 'santd/date-picker';
import format from 'date-fns/format';
export default {
    components: {
        's-date-picker': DatePicker
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return format(value, f);
        }
    },
    initData() {
        return {
            datePicker: {
                value: new Date(),
                range: {
                    begin: new Date(2014, 4, 1),
                    end: new Date()
                }
            }
        };
    }
}
</script>

```
