<cn>
#### 密码框
密码框
</cn>

```html
<template>
  <div>
    <s-input-password placeholder="input password" on-change="onChange"/>
  </div>
</template>
<script>
import Input from 'santd/input';
export default {
    components: {
        's-input-password': Input.Password
    },
    onChange(value) {
        console.log('the value is: ', value);
    },
}
</script>
```
