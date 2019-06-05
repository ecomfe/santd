<cn>
#### 讨嫌的小红点
没有具体的数字。
</cn>

```html
<template>
    <div>
        <s-badge dot>
          <s-icon type="notification" />
      </s-badge>
        <s-badge count={{0}} dot>
          <s-icon type="notification" />
      </s-badge>
        <s-badge dot>
          <a href="#">Link something</a>
      </s-badge>
    </div>
</template>
<script>
import badge from 'santd/badge';
import icon from 'santd/icon';
export default {
    components: {
        's-badge': badge,
        's-icon': icon
    }
}
</script>
```
