<text lang="cn">
#### 附加内容
在 TimePicker 选择框底部显示自定义的内容。
</text>

```html
<template>
    <div>
        <s-timepicker addon="{{addon}}" open="{{open}}" on-openChange="handleOpenChange">
            <s-button type="primary" size="small" on-click="handleClose" slot="addon">Ok</s-button>
        </s-timepicker>
    </div>
</template>
<script>
import timepicker from 'santd/timepicker';
import button from 'santd/button'

export default {
    components: {
        's-timepicker': timepicker,
        's-button': button
    },
    initData() {
        return {
            open: false
        };
    },
    handleClose() {
        this.data.set('open', false);
    },
    handleOpenChange(open) {
        this.data.set('open', open);
    }
}
</script>
```
