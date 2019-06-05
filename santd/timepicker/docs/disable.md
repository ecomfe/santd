<cn>
#### 禁用
禁用时间选择。
</cn>

```html
<template>
    <div>
        <s-timepicker defaultValue="{{defaultValue}}" disabled/>
    </div>
</template>
<script>
import timepicker from 'santd/timepicker';
import moment from 'moment';

export default {
    components: {
        's-timepicker': timepicker
    },
    initData() {
        return {
            defaultValue: moment('12:08:23', 'HH:mm:ss'),
        };
    }
}
</script>
```
