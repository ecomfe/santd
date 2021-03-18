<codebox>
#### 带移除图标
带移除图标的输入框，点击图标删除所有内容

```html
<template>
<div>
    <s-input placeholder="input with clear icon" allowClear="{{true}}" on-change="onChange"/>
</div>
</template>
<script>
import {Input, Icon} from 'santd';

export default {
    components: {
        's-input': Input
    },
    onChange(value) {
        console.log(value);
    }
}
</script>
```
</codebox>
