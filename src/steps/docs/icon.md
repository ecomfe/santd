<text lang="cn">
#### 带图标的步骤条
通过设置 Steps.Step 的 icon slot，可以启用自定义图标。
</text>

```html
<template>
    <div>
        <s-steps current="{{2}}">
            <s-step title="Login" icon="user" />
            <s-step title="Verification" icon="solution" />
            <s-step title="Play">
                <s-icon type="loading" slot="icon" />
            </s-step>
            <s-step title="Done" icon="smile-o" />
      </s-steps>
    </div>
</template>
<script>
import san from 'san';
import {Steps, Icon} from 'santd';

export default {
    components: {
        's-steps': Steps,
        's-step': Steps.Step,
        's-icon': Icon
    }
}
</script>
```
