<cn>
#### loading态
匹配内容列表为异步返回时。
</cn>

```html
<template>
  <div>
    <s-mention
    loading="{{true}}"
    />
  </div>
</template>
<script>
import Mention from 'santd/mention';
export default {
    components: {
        's-mention': Mention
    }
}
</script>
```