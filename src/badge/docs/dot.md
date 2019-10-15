<text lang="cn">
#### 讨嫌的小红点
没有具体的数字。
</text>

```html
<template>
    <div>
        <s-badge dot="{{true}}">
          <s-icon type="notification" />
      </s-badge>
        <s-badge count={{0}} dot="{{true}}">
          <s-icon type="notification" />
      </s-badge>
        <s-badge dot="{{true}}">
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
