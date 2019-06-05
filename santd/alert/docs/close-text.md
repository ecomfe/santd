<cn>
#### 自定义关闭
可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`。
</cn>

```html
<template>
    <div>
        <s-alert message="Info Text" type="info" closeText="Close Now"/>
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
