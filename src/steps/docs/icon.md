<text lang="cn">
#### 带图标的步骤条
通过设置 Steps.Step 的 icon 属性，可以启用自定义图标。
</text>

```html
<template>
    <div>
        <s-steps current="2">
            <s-step title="Login" icon="{{user}}" />
            <s-step title="Verification" icon="{{solution}}" />
            <s-step title="Play" icon="{{loading}}" />
            <s-step title="Done" icon="{{smile}}" />
      </s-steps>
    </div>
</template>
<script>
import san from 'san';
import Steps from 'santd/steps';
import Icon from 'santd/icon';

const user = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<span><s-icon type="user" /></span>`
});

const solution = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<span><s-icon type="solution" /></span>`
});

const loading = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<span><s-icon type="loading" /></span>`
});

const smile = san.defineComponent({
    components: {
        's-icon': Icon
    },
    template: `<span><s-icon type="smile-o" /></span>`
});

export default {
    initData() { 
        return { 
            user,
            solution,
            loading,
            smile
        };
    },
    components: {
        's-steps': Steps,
        's-step': Steps.Step
    }
}
</script>
```
