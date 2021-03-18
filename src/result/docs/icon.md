<codebox>
#### 自定义 icon
自定义 icon。

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
import san from 'san';
import {Result, Button, Icon} from 'santd';

export default {
    components: {
        's-result': Result,
        's-icon': Icon,
        's-button': Button
    }
}
</script>
```
</codebox>
