<codebox>
#### 受控组件
value 和 on-change 需要配合使用。

```html
<template>
    <div>
        <s-timepicker value="{{value}}" on-change="handleChange"/>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import {TimePicker} from 'santd';

export default {
    components: {
        's-timepicker': TimePicker
    },
    handleChange({time}) {
        console.log(time);
        this.data.set('value', time);
    }
}
</script>
```
</codebox>
