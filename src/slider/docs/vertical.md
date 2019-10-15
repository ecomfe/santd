<text lang="cn">
#### 垂直
垂直方向的 Slider。
</text>

```html
<template>
    <div style="height: 300px;">
        <div style="height: 300px; float: left; margin-left: 70px;">
            <s-slider vertical="{{true}}" defaultValue="{{30}}" />
        </div>
        <div style="height: 300px; float: left; margin-left: 70px;">
            <s-slider vertical="{{true}}" range defaultValue="{{[20,50]}}" step="{{10}}" />
        </div>
        <div style="height: 300px; float: left; margin-left: 70px;">
            <s-slider vertical="{{true}}" range defaultValue="{{[26, 37]}}" marks="{{marks}}" />
        </div>
    </div>
</template>
<script>
import Slider from 'santd/slider';
export default {
    components: {
        's-slider': Slider
    },
    initData() {
        return {
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
