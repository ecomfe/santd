<cn>
#### 步骤运行错误
使用 steps 的 `status` 属性来指定当前步骤的状态。
</cn>

```html
<template>
    <div>
        <s-steps current="1"  status="error">
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
