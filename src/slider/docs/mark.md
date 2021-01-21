<text lang="cn">
#### 带标签的滑块
使用 `marks` 属性标注分段式滑块，使用 `value` / `defaultValue` 指定滑块位置。当 `included=false`时，表明不同标记间为并列关系。当 `step=null` 时，Slider 的可选值仅有 `marks` 标出来的部分。
</text>

```html
<template>
    <div>
        <h4>included=true</h4>
        <s-slider marks="{{marks}}" defaultValue="{{37}}" />
        <s-slider range="{{true}}" marks="{{marks}}" defaultValue="{{[26, 37]}}" />
        <h4>included=false</h4>
        <s-slider marks="{{marks}}" included="{{false}}" defaultValue="{{37}}" />
        <h4>marks & step</h4>
        <s-slider marks="{{marks}}" step="{{10}}" defaultValue="{{37}}" />
        <h4>step=null</h4>
        <s-slider marks="{{marks}}" step="{{noStep}}" defaultValue="{{37}}" />
    </div>
</template>
<script>
import {Slider} from 'santd';

export default {
    components: {
        's-slider': Slider
    },
    initData() {
        return {
            noStep: null,
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
