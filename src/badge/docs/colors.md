<codebox>
#### 多彩徽标
我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

```html
<template>
    <div>
        <h4 style="margin-bottom: 16px">Presets:</h4>
        <div>
            <div s-for="color in colors" key="{{color}}">
                <s-badge color="{{color}}" text="{{color}}" />
            </div>
        </div>
        <h4 style="margin: 16px 0;">Custom:</h4>
        <div>
            <s-badge color="#f50" text="#f50" />
            <br />
            <s-badge color="#2db7f5" text="#2db7f5" />
            <br />
            <s-badge color="#87d068" text="#87d068" />
            <br />
            <s-badge color="#108ee9" text="#108ee9" />
        </div>
    </div>
</template>
<script>
import {Badge} from 'santd';

const colors = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'];
export default {
    components: {
        's-badge': Badge
    },
    initData() {
        return {
            colors: colors
        };
    }
}
</script>
```
</codebox>
