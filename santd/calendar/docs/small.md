<cn>
####  卡片模式
用于嵌套在空间有限的容器中。
</cn>

```html
<template>
    <div style="width: 300px;border: 1px solid #ddd;border-radius: 4px">
        <s-calendar fullscreen="{{false}}" on-panelChange="panelChange" />
    </div>
</template>
<script>
import calendar from 'santd/calendar';
import * as moment from 'moment';
export default {
    components: {
        's-calendar': calendar
    },
    initData() {
        return {
            validRange: [moment.default(), moment.default().add(10, 'd')]
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
