<text lang="cn">
#### 含有辅助性文字介绍
含有辅助性文字介绍的警告提示。
</text>

```html
<template>
    <div>
        <s-alert
            message="Success Text"
            description="Success Description Success Description Success Description"
            type="success"
        />
        <s-alert
            message="Info Text"
            description="Info Description Info Description Info Description Info Description"
            type="info"
        />
        <s-alert
            message="Warning Text"
            description="Warning Description Warning Description Warning Description Warning Description"
            type="warning"
        />
        <s-alert
            message="Error Text"
            description="Error Description Error Description Error Description Error Description"
            type="error"
        />
    </div>
</template>

<script>
import alert from 'santd/alert';

export default {
    components: {
        's-alert': alert
    }
}
</script>
```
