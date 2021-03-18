<codebox>
#### 附加内容
在 TimePicker 选择框底部显示自定义的内容。

```html
<template>
    <div>
        <s-timepicker addon="{{addon}}" open="{{open}}" on-openChange="handleOpenChange">
            <s-button type="primary" size="small" on-click="handleClose" slot="addon">Ok</s-button>
        </s-timepicker>
    </div>
</template>
<script>
import {TimePicker, Button} from 'santd';

export default {
    components: {
        's-timepicker': TimePicker,
        's-button': Button
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
</codebox>
