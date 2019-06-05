<cn>
#### 不可用
Switch 失效状态
</cn>
```html
<template>
    <div>
        <s-switch disabled="{{disabled}}" defaultChecked/>
        <br /><br />
        <s-button type="primary" on-click="handleToggle">Toggle disabled</s-button>
    </div>
</template>
<script>
import Switch from 'santd/switch';
import Button from 'santd/button';

export default {
    components: {
        's-switch': Switch,
        's-button': Button
    },
    initData() {
        return {
            disabled: true
        }
    },
    handleToggle() {
        this.data.set('disabled', !this.data.get('disabled'));
    }
}
</script>
```
