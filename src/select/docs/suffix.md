<codebox>
#### 后缀图标
使用`Icon`组件定义的`suffixIcon`插槽, 添加`class`名`san-select-arrow-icon`时，将实现与箭头图标相同的旋转动画。

```html
<template>
    <div>
        <s-select defaultValue="lucy" style="width: 120px;" on-change="handleChange">
            <s-select-option value="jack">Jack</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-select-option value="disabled" disabled="{{true}}">Disabled</s-select-option>
            <s-select-option value="yiminghe">Yiminghe</s-select-option>
            <s-icon slot="suffixIcon" type="smile" class="san-select-arrow-icon"/>
        </s-select>
        <s-select defaultValue="lucy" style="width: 120px;" disabled="{{true}}">
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-icon slot="suffixIcon" type="meh"/>
        </s-select>
    </div>
</template>

<script>
import {Select, Icon} from 'santd';

export default {
    components: {
        's-icon': Icon,
        's-select': Select,
        's-select-option': Select.Option
    },
    handleChange(value) {
        console.log(`selected ${value}`);
    }
}
</script>
```
</codebox>
