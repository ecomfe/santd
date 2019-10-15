<text lang="cn">
#### 12 小时制
12 小时制的时间选择器，默认的 format 为 `h:mm:ss a`。
</text>

```html
<template>
    <div>
        <s-timepicker use12Hours="{{true}}" on-change="handleChange"/>
        <s-timepicker use12Hours="{{true}}" format="h:mm:ss A" on-change="handleChange"/>
        <s-timepicker use12Hours="{{true}}" format="h:mm a" on-change="handleChange"/>
    </div>
</template>
<script>
import timepicker from 'santd/timepicker';
import moment from 'moment';

export default {
    components: {
        's-timepicker': timepicker
    },
    handleChange(param) {
        console.log(param);
    }
}
</script>
```
