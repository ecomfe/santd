<text lang="cn">
#### 可关闭的警告提示
显示关闭按钮，点击可关闭警告提示。
</text>

```html
<template>
    <div>
        <s-alert
            message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
            type="warning"
            closable="{{true}}"
            on-close="onClose"
        />
        <s-alert
            message="Error Text"
            description="Error Description Error Description Error Description Error Description Error Description Error Description"
            type="error"
            closable="{{true}}"
            on-close="onClose"
        />
    </div>
</template>

<script>
import alert from 'santd/alert';

export default {
    components: {
        's-alert': alert
    },
    onClose(e) {
        console.log(e, 'I was closed.');
    }
}
</script>
```
