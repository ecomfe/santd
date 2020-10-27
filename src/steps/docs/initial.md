<text lang="cn">
#### 起始序号
设置步骤条起始序号。
</text>

```html
<template>
    <div>
        <s-steps current="{{1}}" initial="{{4}}">
            <s-step title="Finished" subTitle="subTitle" description="This is a description." ></s-step>
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
