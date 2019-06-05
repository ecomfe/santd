<cn>
#### 不可用
Radio不可用。
</cn>

```html
<template>
    <div>
        <s-radio value="{{3}}" disabled="{{disabled}}">Disabled</s-radio>
        <br/>
        <s-radio value="{{3}}" disabled="{{disabled}}" defaultChecked>Disabled</s-radio>
        <div style="margin-top: 20px;">
            <s-button on-click="toggleDisabled">Toggle Disabled</s-button>
        </div>
    </div>
</template>
<script>
import radio from 'santd/radio';
import button from 'santd/button';

export default {
    components: {
        's-radio': radio,
        's-button': button
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
