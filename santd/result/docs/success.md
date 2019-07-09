<cn>
#### Success
成功的结果。
</cn>

```html
<template>
    <div>
        <s-result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra="{{extra}}"
        />
    </div>
</template>
<script>
import Result from 'santd/result';
import Button from 'santd/button';
import san from 'san';

export default {
    components: {
        's-result': Result,
        's-button': Button
    },
    initData() {
        return {
            extra: san.defineComponent({
                components: {
                    's-button': Button
                },
                template: `<div>
                    <s-button type="primary" key="console">Go Console</s-button>
                    <s-button key="buy">Buy Again</s-button>
                </div>`
            })
        }
    }
}
</script>
```
