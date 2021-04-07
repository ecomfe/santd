<text lang="cn">
#### 不可用
Switch 失效状态
</text>
```html
<template>
    <div>
        <s-switch disabled="{{disabled}}" defaultChecked="{{true}}"/>
        <br /><br />
        <s-button type="primary" on-click="handleToggle">Toggle disabled</s-button>
    </div>
</template>
<script>
import {Switch, Button} from 'santd';

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
