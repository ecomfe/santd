<codebox>
#### 气泡框位置
tooltip气泡框位置

```html
<template>
    <div>
        <s-slider defaultValue="{{30}}" disabled="{{disabled}}" tooltipPlacement="left"/>
        <s-slider range="{{true}}" defaultValue="{{[20, 50]}}" disabled="{{disabled}}" tooltipPlacement="bottom"/>
        
    </div>
</template>
<script>
import {Slider, Switch} from 'santd';

export default {
    components: {
        's-slider': Slider,
        's-switch': Switch
    },
    handleDisabledChange(checked)  {
        this.data.set('disabled', checked);
    }
}
</script>
```
</codebox>
