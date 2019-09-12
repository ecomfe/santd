<text lang="cn">
#### 附加内容
在 TimePicker 选择框底部显示自定义的内容。
</text>

```html
<template>
    <div>
        <s-timepicker addon="{{addon}}" open="{{open}}" on-openChange="handleOpenChange"/>
    </div>
</template>
<script>
import timepicker from 'santd/timepicker';
import button from 'santd/button'
import moment from 'moment';
import san from 'san';

const addon = function () {
    return san.defineComponent({
        template: `
            <template>
                <s-button type="primary" size="small" on-click="handleClose">OK</s-button>
            </template>
        `,
        handleClose: this.handleClose.bind(this),
        components: {
            's-button': button
        }
    });
}

export default {
    components: {
        's-timepicker': timepicker
    },
    initData() {
        return {
            open: false,
            addon: addon.bind(this)
        };
    },
    handleClose() {
        this.data.set('open', false);
    },
    handleOpenChange(open) {
        console.log(open)
        this.data.set('open', open);
    }
}
</script>
```
