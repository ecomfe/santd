<text lang="cn">
#### 类型
支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。
</text>

```html
<template>
    <div>
        <s-avatar icon="user" />
        <s-avatar>U</s-avatar>
        <s-avatar>USER</s-avatar>
        <s-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <s-avatar style="color: #f56a00; backgroundColor: #fde3cf">U</s-avatar>
        <s-avatar style="backgroundColor:#87d068" icon="user" />
    </div>
</template>
<script>
import {Avatar} from 'santd';

export default {
    components: {
        's-avatar': Avatar
    }
}
</script>
```
