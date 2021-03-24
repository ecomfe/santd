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
import dayjs from 'dayjs';
import {TimePicker} from 'santd';

dayjs.extend(require('dayjs/plugin/customParseFormat'));

export default {
    components: {
        's-timepicker': TimePicker
    },
    initData() {
        return {
            defaultValue: dayjs('2:08:23', 'HH:mm:ss')
        };
    }
}
</script>
```
