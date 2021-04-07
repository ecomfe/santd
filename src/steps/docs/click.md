<text lang="cn">
#### 可点击
设置 on-change 后，Steps 变为可点击状态。
</text>

```html
<template>
    <div>
        <s-steps current="{{current}}" on-change="handleChange">
            <s-step title="Step 1" description="This is a description." />
            <s-step title="Step 2" description="This is a description." />
            <s-step title="Step 3" description="This is a description." />
        </s-steps>
        <s-divider />
        <s-steps current="{{current}}" on-change="handleChange" direction="vertical">
            <s-step title="Step 1" description="This is a description." />
            <s-step title="Step 2" description="This is a description." />
            <s-step title="Step 3" description="This is a description." />
        </s-steps>
    </div>
</template>
<script>
import {Steps, Divider} from 'santd';

export default {
    initData() {
        return {
            current: 0
        };
    },
    components: {
        's-steps': Steps,
        's-step': Steps.Step,
        's-divider': Divider
    },
    handleChange(current) {
        console.log('on-change:', current);
        this.data.set('current', current);
    }
}
</script>
```
