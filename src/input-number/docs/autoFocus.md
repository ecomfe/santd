<codebox>
#### autoFocus

自动获得焦点


```html
<template>
  <div>
    <s-input-number min="0" max="10" defaultValue="3" on-change="onChange" autoFocus></s-input-number>
  </div>
</template>
<script>
import {InputNumber, Icon} from 'santd';

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
</codebox>
