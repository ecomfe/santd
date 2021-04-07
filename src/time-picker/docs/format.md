<text lang="cn">
#### 选择时分
TimePicker 浮层中的列会随着 `format` 变化，当略去 `format` 中的某部分时，浮层中对应的列也会消失。
</text>

```html
<template>
    <div>
        <s-timepicker format="HH:mm" defaultValue="{{defaultValue}}" on-change="handleChange"/>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import {TimePicker} from 'santd';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default {
    components: {
        's-timepicker': TimePicker
    },
    initData() {
        return {
            defaultValue: dayjs('12:08', 'HH:mm')
        };
    },
    handleChange(param) {
        console.log('time change', param);
    }
}
</script>
```
