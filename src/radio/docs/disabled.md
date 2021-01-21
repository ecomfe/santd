<text lang="cn">
#### 不可用
Radio不可用。
</text>

```html
<template>
    <div>
        <s-radio value="{{3}}" disabled="{{disabled}}">Disabled</s-radio>
        <br/>
        <s-radio value="{{3}}" disabled="{{disabled}}" defaultChecked="{{true}}">Disabled</s-radio>
        <div style="margin-top: 20px;">
            <s-button on-click="toggleDisabled">Toggle Disabled</s-button>
        </div>
    </div>
</template>
<script>
import {Radio, Button} from 'santd';

export default {
    components: {
        's-radio': Radio,
        's-button': Button
    },
    initData() {
        return {
            disabled: true
        };
    },
    toggleDisabled() {
        this.data.set('disabled', !this.data.get('disabled'));
    }
}
</script>
```
