<cn>
#### 基本用法
简单的步骤条。
</cn>

```html
<template>
    <div>
        <s-steps current="1">
            <s-step title="Finished" description="This is a description." />
            <s-step title="In Progress" description="This is a description." />
            <s-step title="Waiting" description="This is a description." />
      </s-steps>
    </div>
</template>
<script>
import Steps from 'santd/steps';
export default {
    components: {
        's-steps': Steps,
        's-step': Steps.Step
    }
}
</script>
```
