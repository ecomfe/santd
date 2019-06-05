<cn>
#### 其他字符
可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。
</cn>

```html
<template>
    <div class="san-rate">
        <s-rate allowHalf>
            <s-icon type="heart" theme="filled" slot="character" />
        </s-rate>
        <br />
        <s-rate character="A" allowHalf />
        <br />
        <s-rate character="好" allowHalf />
    </div>
</template>
<script>

import rate from 'santd/rate';
import icon from 'santd/icon';

export default {
    components: {
        's-rate': rate,
        's-icon': icon
    }
}
</script>
```
