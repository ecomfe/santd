<cn>
#### 基本
头像有三种尺寸，两种形状可选。
</cn>

```html
<template>
    <div>
        <div>
            <s-avatar size="{{64}}" icon="user" />
            <s-avatar size="large" icon="user"/>
            <s-avatar icon="user"/>
            <s-avatar size="small" icon="user"/>
        </div>
        <div>
            <s-avatar shape="square" size="{{64}}" icon="user" />
            <s-avatar shape="square" size="large" icon="user" />
            <s-avatar shape="square" icon="user" />
            <s-avatar shape="square" size="small" icon="user" />
        </div>
    </div>
</template>
<script>
import Avatar from 'santd/avatar';
export default {
    components: {
        's-avatar': Avatar
    }
}
</script>
```
