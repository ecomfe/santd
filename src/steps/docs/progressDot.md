<codebox>
#### 点状步骤条 
包含步骤点的进度条。

```html
<template>
    <div>
        <s-steps progressDot="{{true}}" current="{{1}}">
            <s-step title="Finished" description="This is a description." />
            <s-step title="In Progress" description="This is a description." />
            <s-step title="Waiting" description="This is a description." />
      </s-steps>
    </div>
</template>
<script>
import {Steps} from 'santd';

export default {
    components: {
        's-steps': Steps,
        's-step': Steps.Step
    }
}
</script>
```
</codebox>
