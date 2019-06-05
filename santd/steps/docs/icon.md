<cn>
#### 带图标的步骤条
通过设置 Steps.Step 的 icon 属性，可以启用自定义图标。
</cn>

```html
<template>
    <div>
        <s-steps current="2">
            <s-step title="Login"><s-icon type="user" slot="icon" /></s-step>
            <s-step title="Verification"><s-icon type="solution" slot="icon" /></s-step>
            <s-step title="Play"><s-icon type="loading" slot="icon" /></s-step>
            <s-step title="Done"><s-icon type="smile-o" slot="icon" /></s-step>
      </s-steps>
    </div>
</template>
<script>
import Steps from 'santd/steps';
import Icon from 'santd/icon';
export default {
    components: {
        's-steps': Steps,
        's-step': Steps.Step,
        's-icon': Icon
    }
}
</script>
```
