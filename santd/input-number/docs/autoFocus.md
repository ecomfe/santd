<text lang="cn">
#### autoFocus

自动获得焦点

</text>

```html
<template>
  <div>
    <s-input-number min="0" max="10" defaultValue="3" on-change="onChange" autoFocus></s-input-number>
  </div>
</template>
<script>
import InputNumber from 'santd/input-number';
import Icon from 'santd/icon';
export default {
    components: {
        's-input-number': InputNumber,
        's-icon': Icon
    },
    onChange(value) {
        console.log('the value is: ', value);
    }
}
</script>
```
