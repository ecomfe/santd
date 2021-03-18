<codebox>
#### 自定义指示符
使用自定义指示符。

```html
<template>
    <div>
        <s-spin>
            <s-icon slot="indicator" type="loading" style="font-size: 24px;"/>
        </s-spin>
    </div>
</template>

<script>
import {Spin, Icon} from 'santd';

export default {
    components: {
        's-icon': Icon,
        's-spin': Spin
    }
}
</script>
```
</codebox>
