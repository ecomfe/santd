<text lang="cn">
####  卡片模式
用于嵌套在空间有限的容器中。
</text>

```html
<template>
    <div style="width: 300px;border: 1px solid #ddd;border-radius: 4px">
        <s-calendar fullscreen="{{false}}" on-panelChange="panelChange" />
    </div>
</template>
<script>
import * as dayjs from 'dayjs';
import {Calendar} from 'santd';

export default {
    components: {
        's-calendar': Calendar
    },
    initData() {
        return {
            validRange: [dayjs.default(), dayjs.default().add(10, 'd')]
        }
    },
    getValue(value) {
        return value.format('YYYY-MM-DD');
    },
    selectDate(param) {
        console.log('on select', param.format('YYYY-MM-DD'));
    },
    panelChange(param) {
        console.log('on panel change', param.value, param.mode);
    },
    change(param) {
        console.log('on change', param);
    }
}
</script>
```
