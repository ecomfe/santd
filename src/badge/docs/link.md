<codebox>
#### 可点击
用 a 标签进行包裹即可。

```html
<template>
    <div>
        <a href="#">
            <s-badge showZero={{true}} count="{{5}}">
                <span class="head-example"></span>
            </s-badge>
        </a>
    </div>
</template>
<script>
import {Badge} from 'santd';

export default {
    components: {
        's-badge': Badge
    }
}
</script>
```
</codebox>
