<text lang="cn">
#### Info
展示处理结果。
</text>

```html
<template>
    <div>
        <s-result title="Your operation has been executed">
            <s-button type="primary" key="console" slot="extra">Go Console</s-button>
        </s-result>
    </div>
</template>
<script>
import Result from 'santd/result';
import Button from 'santd/button';

export default {
    components: {
        's-result': Result,
        's-button': Button
    }
}
</script>
```
