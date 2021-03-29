<text lang="cn">
#### 步长选项
可以使用 `hourStep` `minuteStep` `secondStep` 按步长展示可选的时分秒。
</text>

```html
<template>
    <div>
        <s-timepicker minuteStep="{{15}}" secondStep="{{10}}"/>
    </div>
</template>
<script>
import {TimePicker} from 'santd';

export default {
    components: {
        's-timepicker': TimePicker
    }
}
</script>
```
