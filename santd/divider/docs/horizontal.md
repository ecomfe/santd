<cn>
#### 水平分割线
默认为水平分割线，可在中间加入文字。
</cn>

```html
<template>
    <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <s-divider />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <s-divider>With Text</s-divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <s-divider dashed />
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
