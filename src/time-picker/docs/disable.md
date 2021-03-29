<text lang="cn">
#### 禁用
禁用时间选择。
</text>

```html
<template>
    <div>
        <s-timepicker defaultValue="{{defaultValue}}" disabled="{{true}}"/>
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
            defaultValue: dayjs('12:08:23', 'HH:mm:ss'),
        };
    }
}
</script>
```
