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
import dayjs from 'dayjs';
import {TimePicker} from 'santd';

dayjs.extend(require('dayjs/plugin/customParseFormat'));

export default {
    components: {
        's-timepicker': TimePicker
    },
    initData() {
        return {
            defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss')
        };
    },
    handleChange({time, timeString}) {
        console.log('docs', time, timeString);
    }
}
</script>
```
