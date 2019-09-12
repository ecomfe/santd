<text lang="cn">
#### 竖直方向的小型步骤条
简单的竖直方向的小型步骤条。
</text>

```html
<template>
    <div>
        <s-steps current="{{1}}" direction="vertical" size="small">
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
