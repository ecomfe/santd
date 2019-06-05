<cn>
#### 不可用
点击按钮切换可用状态。
</cn>

```html
<template>
    <div>
        <s-input-number min="1" max="10" defaultValue="3" disabled="{{disabled}}"></s-input-number>
        <br/><br/>
        <s-button type="primary" on-click="toggle">Toggle disabled</s-button>
    </div>
</template>
<script>
import InputNumber from 'santd/input-number';
import Button from 'santd/button';

export default {
    components: {
        's-input-number': InputNumber,
        's-button': Button
    },
    initData() {
        return {
            disabled: true
        }
    },
    toggle() {
        this.data.set('disabled', !this.data.get('disabled'));
    }
}
</script>
```
