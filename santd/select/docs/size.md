<text lang="cn">
#### 三种大小
三种大小的选择框，当 size 分别为 `large` 和 `small` 时，输入框高度为 `40px` 和 `24px` ，默认高度为 `32px`。
</text>

```html
<template>
    <div>
        <s-radio-group value="{{size}}" on-change="onRadioChange($event)" button-style="outline">
            <s-radio-button value="large">Large</s-radio-button>
            <s-radio-button value="default">Default</s-radio-button>
            <s-radio-button value="small">Small</s-radio-button>
        </s-radio-group>
        <br/><br/>
        <s-select
            defaultValue="lucy"
            style="width:120px;"
            size="{{size}}"
        >
            <s-select-option value="jake" title="jake">Jake</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-select-option value="disabled" disabled>Disabled</s-select-option>
            <s-select-option value="jason">Jason</s-select-option>
        </s-select>
        <br/>
        <s-select defaultValue="{{['test1']}}" mode="multiple" style="width: 100%;" size="{{size}}">
            <s-select-option s-for="i in baseData" value="{{i}}">{{i}}</s-select-option>
        </s-select>
        <br/>
        <s-select defaultValue="{{['test1']}}" mode="tags" style="width: 100%;" size="{{size}}">
            <s-select-option s-for="i in baseData" value="{{i}}">{{i}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
import Radio from 'santd/radio';
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-radio-group': Radio.Group,
        's-radio-button': Radio.Button
    },
    initData() {
        return {
            baseData: ['test1','test2 ','test3','test4'],
            size: 'default'
        }
    },
    onRadioChange(e) {
        console.log(e.target.value);
        this.data.set('size', e.target.value);
    }
}
</script>
```
