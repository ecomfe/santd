<text lang="cn">
#### 自定义 icon
自定义 icon。
</text>

```html
<template>
    <div>
        <s-result title="Great, we have done all the operations!">
            <s-icon type="smile" theme="twoTone" slot="icon" />
            <s-button type="primary" slot="extra">Next</s-button>
        </s-result>
    </div>
</template>
<script>
import Result from 'santd/result';
import Button from 'santd/button';
import Icon from 'santd/icon';
import san from 'san';

export default {
    components: {
        's-result': Result,
        's-icon': Icon,
        's-button': Button
    }
}
</script>
```
