<text lang="cn">
#### 基本
点击 TimePicker，然后可以在浮层中选择或者输入某一时间
</text>

```html
<template>
    <div>
        <s-timepicker defaultOpenValue="{{defaultOpenValue}}" on-change="handleChange"/>
    </div>
</template>
<script>
import moment from 'moment';
import {TimePicker} from 'santd';

export default {
    components: {
        's-timepicker': TimePicker
    },
    initData() {
        return {
            defaultOpenValue: moment('00:00:00', 'HH:mm:ss')
        };
    },
    handleChange({time, timeString}) {
        console.log(time, timeString);
    }
}
</script>
```
