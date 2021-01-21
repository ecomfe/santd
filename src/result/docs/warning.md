<text lang="cn">
#### Warning
警告类型的结果。
</text>

```html
<template>
    <div>
        <s-result
            status="warning"
            title="There are some problems with your operation."
        >
            <s-button type="primary" key="console" slot="extra">Go Console</s-button>
        </s-result>
    </div>
</template>
<script>
import {Result, Button} from 'santd';

export default {
    components: {
        's-result': Result,
        's-button': Button
    }
}
</script>
```
