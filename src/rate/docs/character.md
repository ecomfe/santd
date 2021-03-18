<codebox>
#### 其他字符
可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。

```html
<template>
    <div class="san-rate">
        <s-rate allowHalf="{{true}}">
            <s-icon type="heart" theme="filled" slot="character" />
        </s-rate>
        <br />
        <s-rate character="A" allowHalf="{{true}}" />
        <br />
        <s-rate character="好" allowHalf="{{true}}" />
    </div>
</template>
<script>

import {Rate, Icon} from 'santd';

export default {
    components: {
        's-rate': Rate,
        's-icon': Icon
    }
}
</script>
```
</codebox>
