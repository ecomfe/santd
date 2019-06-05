<cn>
#### 禁用状态
增加disabled属性，可以对日历组件进行禁用
</cn>

```html
<template>
    <div>
        <s-date-picker disabled value="{=datePicker.value=}" range="{{datePicker.range}}"/>
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
