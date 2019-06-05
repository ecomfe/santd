<cn>
#### RadioGroup 垂直
垂直的 RadioGroup，配合更多输入框选项。
</cn>

```html
<template>
    <div>
        <s-group name="radiogroup" value="{{value}}" on-change="handleChange">
            <s-radio value="{{1}}" style="{{radioStyle}}">Option A</s-radio>
            <s-radio value="{{2}}" style="{{radioStyle}}">Option B</s-radio>
            <s-radio value="{{3}}" style="{{radioStyle}}">Option C</s-radio>
            <s-radio value="{{4}}" style="{{radioStyle}}">
                More...
                <s-input s-if="value === 4" style="width: 100px; margin-left: 10px;"/>
            </s-radio>
        </s-group>
    </div>
</template>
<script>
import Radio from 'santd/radio';
import Input from 'santd/input';

export default {
    components: {
        's-radio': Radio,
        's-group': Radio.Group,
        's-input': Input
    },
    initData() {
        return {
            radioStyle: {
                'display': 'block',
                'height': '30px',
                'line-height': '30px'
            },
            value: 1
        }
    },
    handleChange(e) {
        console.log('radio checked', e.target.value);
        this.data.set('value', e.target.value);
    }
}
</script>
```
