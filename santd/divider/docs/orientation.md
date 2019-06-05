<cn>
#### 标题位置
修改分割线标题的位置。
</cn>

```html
<template>
    <div>
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
