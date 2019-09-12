<text lang="cn">
#### 三种大小
三种大小的输入框，大的用在表单中，中的为默认。
</text>

```html
<template>
    <div>
        <s-timepicker defaultValue="{{defaultValue}}" size="large"/>
        <s-timepicker defaultValue="{{defaultValue}}"/>
        <s-timepicker defaultValue="{{defaultValue}}" size="small"/>
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
            defaultValue: moment('2:08:23', 'HH:mm:ss')
        };
    }
}
</script>
```
