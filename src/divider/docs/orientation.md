<text lang="cn">
#### 带文字的分割线
分割线中带有文字，可以用 `orientation` 指定文字位置。
</text>

```html
<template>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <s-divider>Text</s-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <s-divider orientation="left">Left Text</s-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <s-divider orientation="right">Right Text</s-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    </div>
</template>
<script>
import Divider from 'santd/divider';
export default {
    components: {
        's-divider': Divider
    }
}
</script>
```
