<text lang="cn">
#### mini版
迷你版的步骤条，通过设置 `<s-steps size="small">` 启用
</text>

```html
<template>
    <div>
        <s-steps current="{{1}}" size="small">
            <s-step title="Finished" />
            <s-step title="In Progress" />
            <s-step title="Waiting" />
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
