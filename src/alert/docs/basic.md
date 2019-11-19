<text lang="cn">
#### 基本
最简单的用法，适用于简短的警告提示。
</text>

```html
<template>
    <div>
        <s-alert message="Success Text" type="success"/>
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
