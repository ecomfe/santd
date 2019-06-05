<cn>
#### 多行
多行模式，多行模式必须指定高度。
</cn>

```html
<template>
  <div>
    <s-mention
        style="width: 100%; height: 100px;"
        multiLines
        defaultSuggestions="{{ ['liyanhong666', 'mayun', 'mahuateng', 'zhouhongyi', 'leijun666', 'ww233'] }}"
    />
  </div>
</template>
<script>
import mention from 'santd/mention';
export default {
    components: {
        's-mention': mention
    }
}
</script>
```