<cn>
#### 受控组件
value 和 on-change 需要配合使用。
</cn>

```html
<template>
    <div>
        <s-timepicker value="{{value}}" on-change="handleChange"/>
    </div>
</template>
<script>
import timepicker from 'santd/timepicker';
import moment from 'moment';

export default {
    components: {
        's-timepicker': timepicker
    },
    handleChange({time}) {
        console.log(time);
        this.data.set('value', time);
    }
}
</script>
```
