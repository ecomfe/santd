<codebox>
#### 反向
设置 reverse 可以将滑动条置反。

```html
<template>
    <div>
        <s-slider range="{{true}}" reverse="{{reverse}}"  marks="{{marks}}" defaultValue="{{[26, 37]}}"  tooltipPlacement="bottom"/>
        <s-slider range="{{true}}" defaultValue="{{[0, 50]}}" reverse="{{reverse}}" tooltipPlacement="bottom"/>
        Reversed: <s-switch size="small" on-change='handleDisabledChange'/>
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
        this.data.set('reverse', checked);
    },
    initData() {
        return {
            reverse: false,
            marks: {
                0: '0°C',
                26: '26°C',
                37: '37°C',
                100: {
                    style: 'color: #f50',
                    label: '100°C'
                }
            }
        };
    }
}
</script>
```
</codebox>
