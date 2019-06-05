<cn>
#### 带徽标的头像
通常用于消息提示。
</cn>

```html
<template>
    <div>
        <span style="margin-right:24px">
            <s-badge count="1"><s-avatar shape="square" icon="user" /></s-badge>
        </span>
        <span>
            <s-badge dot><s-avatar shape="square" icon="user" /></s-badge>
        </span>
    </div>
</template>
<script>
import Avatar from 'santd/avatar';
import Badge from 'santd/badge';

export default {
    components: {
        's-avatar': Avatar,
        's-badge': Badge
    }
}
</script>
```
