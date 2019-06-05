<cn>
#### 基本使用
最简单的用法，在浮层中选择日期。
</cn>

```html
<template>
    <div>
        <div>
            <s-date-picker value="{=datePicker.value=}" range="{{datePicker.range}}" size="large"/>
            <span>
                Value is: {{datePicker.value | datetime('YYYY-MM-DD')}}
            </span>
        </div>
        <br>
        <div>
            <s-range-picker value="{=rangePicker.value=}" />
            <span>
                Value is: {{rangePicker.value.begin | datetime('YYYY-MM-DD')}} - {{rangePicker.value.end | datetime('YYYY-MM-DD')}}
            </span>
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
