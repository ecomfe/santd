<codebox>
#### 导航步骤
导航类型的步骤条。

```html
<template>
    <div>
        <s-steps current="{{1}}" type="navigation">
            <s-step title="Finished" subTitle="subTitle" description="This is a description." />
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
