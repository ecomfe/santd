<text lang="cn">
#### 带输入框的滑块
和数字输入框组件保持同步。
</text>

```html
<template>
    <div>
        <s-row>
            <s-col span="12">
                <s-slider min="{{1}}" max="{{20}}" on-change="handleIntegerChange" value="{{integerValue}}" />
            </s-col>
            <s-col span="4">
                <s-inputnumber min="{{1}}" max="{{20}}" value="{{inputIntegerValue}}" on-change="handleChange" style="margin-left: 16px;" />
            </s-col>
        </s-row>
        <s-row>
            <s-col span="12">
                <s-slider min="{{0}}" max="{{1}}" on-change="handleDecimalChange" value="{{decimalValue}}" step="{{0.01}}"/>
            </s-col>
            <s-col span="4">
                <s-inputnumber min="{{0}}" max="{{1}}" step="{{0.01}}" value="{{inputDecimalValue}}" on-change="handleChange" style="margin-left: 16px;" />
            </s-col>
        </s-row>
    </div>
</template>
<script>
import Slider from 'santd/slider';
import InputNumber from 'santd/input-number';
import Grid from 'santd/grid';

export default {
    components: {
        's-slider': Slider,
        's-inputnumber': InputNumber,
        's-row': Grid.Row,
        's-col': Grid.Col
    },
    initData() {
        return {
            inputIntegerValue: 1,
            inputDecimalValue: 0
        }
    },
    computed: {
        decimalValue() {
            const inputDecimalValue = this.data.get('inputDecimalValue');
            return typeof inputDecimalValue === 'number' ? inputDecimalValue : 0;
        }
    },
    handleIntegerChange(value)  {
        if (Number.isNaN(value)) {
            return;
        }
        this.data.set('inputIntegerValue', value);
    },
    handleDecimalChange(value)  {
        if (Number.isNaN(value)) {
            return;
        }
        this.data.set('inputDecimalValue', value);
    }
}
</script>
```
