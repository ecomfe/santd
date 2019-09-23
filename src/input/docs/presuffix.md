<text lang="cn">
#### 前缀和后缀
在输入框上添加前缀或后缀图标。
</text>

```html
<template>
<div>
    <div style="margin-bottom: 16px">
        <s-input>
            <s-icon type="user" style="color: rgba(0, 0, 0, .25);" slot="prefix" />
            <s-tooltip title="Extra information" slot="suffix">
                <s-icon type="info-circle" style="color: rgba(0, 0, 0, .45);" />
            </s-tooltip>
        </s-input>
    </div>
    <div style="margin-bottom: 16px">
        <s-input suffix="RMB" prefix="￥" />
    </div>
</div>
</template>
<script>
import Input from 'santd/input';
import Icon from 'santd/icon';
import Tooltip from 'santd/tooltip';

export default {
    components: {
        's-input': Input,
        's-icon': Icon,
        's-tooltip': Tooltip
    }
}
</script>
```
