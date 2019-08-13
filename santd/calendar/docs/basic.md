<text lang="cn">
#### 基本
一个通用的日历面板，支持年/月切换。
</text>

```html
<template>
    <div>
        <s-calendar on-panelChange="panelChange" />
    </div>
</template>
<script>
import Calendar from 'santd/calendar';

export default {
    components: {
        's-calendar': Calendar
    },
    panelChange({value, mode}) {
        console.log(value, mode);
    }
}
</script>
```
