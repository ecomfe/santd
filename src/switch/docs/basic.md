<text lang="cn">
#### 基本
最简单的用法
</text>
```html
<template>
    <div>
        <s-switch on-change='onChange' defaultChecked="{{true}}" />
    </div>
</template>
<script>
import {Switch} from 'santd';

export default {
    components: {
        's-switch': Switch
    },
    initData() {
        return {
            checked: true,
        }
    },
    onChange(checked) {
        console.log(checked);
    }
}
</script>
```
