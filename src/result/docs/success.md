<codebox>
#### Success
成功的结果。

```html
<template>
    <div>
        <s-result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        >
            <template slot="extra">
                <s-button type="primary" key="console">Go Console</s-button>
                <s-button key="buy">Buy Again</s-button>
            </template>
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
</codebox>
