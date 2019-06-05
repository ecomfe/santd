<cn>
#### 不可用
checkbox不可用。
</cn>

```html
<template>
    <div class="checkbox-demo">
        <s-checkbox defaultChecked="{{false}}" disabled />
        <br />
        <s-checkbox defaultChecked disabled />
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
