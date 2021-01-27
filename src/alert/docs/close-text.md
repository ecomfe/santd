<text lang="cn">
#### 自定义关闭
可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`。
</text>

```html
<template>
    <div>
        <s-alert message="Info Text" type="info" closeText="Close Now"/>
    </div>
</template>

<script>
import {Alert} from 'santd';

export default {
    components: {
        's-alert': Alert
    }
}
</script>
```
