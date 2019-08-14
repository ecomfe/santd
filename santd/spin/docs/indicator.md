<text lang="cn">
#### 自定义指示符
使用自定义指示符。
</text>

```html
<template>
    <div>
        <s-spin>
            <s-icon slot="indicator" type="loading" style="font-size: 24px;"/>
        </s-spin>
    </div>
</template>

<script>
import icon from 'santd/icon';
import spin from 'santd/spin';

export default {
    components: {
        's-icon': icon,
        's-spin': spin
    }
}
</script>
```
