<text lang="cn">
#### 不可用
checkbox不可用。
</text>

```html
<template>
    <div class="checkbox-demo">
        <s-checkbox defaultChecked="{{false}}" disabled="{{true}}" />
        <br />
        <s-checkbox defaultChecked="{{true}}" disabled="{{true}}" />
    </div>
</template>

<script>
import Checkbox from 'santd/checkbox';
export default {
    components:{
       's-checkbox': Checkbox
    }

}
</script>
```
