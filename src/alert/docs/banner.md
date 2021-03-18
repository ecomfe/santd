<codebox>
#### 顶部公告
页面顶部通告形式，默认有图标且`type` 为 'warning'。

```html
<template>
    <div>
        <s-alert message="Warning text" banner="{{true}}"/>
        <s-alert message="Very long warning text warning text text text text text text text" banner="{{true}}" closable="{{true}}"/>
        <s-alert message="Warning text without icon" banner="{{true}}" showIcon="{{false}}"/>
        <s-alert message="Error text" type="error" banner="{{true}}"/>
    </div>
</template>

<script>
import {Alert} from 'santd';

export default {
    components: {
        's-alert': Alert
    }
}
</script>
```
</codebox>
