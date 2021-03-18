<codebox>
#### 单选组合
一组互斥的 Radio 配合使用。

```html
<template>
    <div>
        <s-group name="radiogroup" value="{{value}}" on-change="handleChange">
            <s-radio value="{{1}}">A</s-radio>
            <s-radio value="{{2}}">B</s-radio>
            <s-radio value="{{3}}">C</s-radio>
            <s-radio value="{{4}}">D</s-radio>
        </s-group>
    </div>
</template>
<script>
import {Radio} from 'santd';

export default {
    components: {
        's-radio': Radio,
        's-group': Radio.Group
    },
    initData() {
        return {
            value: 1
        }
    },
    handleChange(e) {
        console.log('radio checked', e.target.value);
        this.data.set('value', Number(e.target.value));
    }
}
</script>
```
</codebox>
