<text lang="cn">
#### 状态点
用于表示状态的小圆点。
</text>

```html
<template>
    <div>
        <s-badge status="success"></s-badge>
        <s-badge status="error"></s-badge>
        <s-badge status="default"></s-badge>
        <s-badge status="processing"></s-badge>
        <s-badge status="warning"></s-badge>
        <br />
        <s-badge status="success" text="Success" />
        <br />
        <s-badge status="error" text="Error" />
        <br />
        <s-badge status="default" text="Default" />
        <br />
        <s-badge status="processing" text="Processing" />
        <br />
        <s-badge status="warning" text="Warning" />
    </div>
</template>
<script>
import badge from 'santd/badge';
export default {
    components: {
        's-badge': badge
    }
}
</script>
```
