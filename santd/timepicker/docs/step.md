<cn>
#### 步长选项
可以使用 `hourStep` `minuteStep` `secondStep` 按步长展示可选的时分秒。
</cn>

```html
<template>
    <div>
        <s-timepicker minuteStep="{{15}}" secondStep="{{10}}"/>
    </div>
</template>
<script>
import timepicker from 'santd/timepicker';
import moment from 'moment';

export default {
    components: {
        's-timepicker': timepicker
    }
}
</script>
```
