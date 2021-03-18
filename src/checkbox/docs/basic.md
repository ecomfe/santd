<codebox>
#### 基本用法
简单的checkbox

```html
<template>
    <div>
        <s-checkbox on-change="handleChange">checkbox</s-checkbox>
    </div>
</template>

<script>
import {Checkbox} from 'santd';

export default {
    components:{
       's-checkbox': Checkbox
    },
    handleChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
}
</script>
```
</codebox>
