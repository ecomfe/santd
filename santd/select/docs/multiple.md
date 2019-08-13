<text lang="cn">
#### 多选
多选，从已有条目中选择
</text>

```html
<template>
    <div>
        <s-select defaultValue="{{defValue}}" mode="multiple" style="width: 100%;" placeholder="Please select" on-change="onChange">
            <s-select-option s-for="i in baseData" value="{{i.value}}">{{i.label}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
let data = [{label: 'test1', value: 't1'}, {label: 'test2', value: 't2'}, {label: 'test3', value: 't3'}];
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            defValue: ['t1', 't3'],
            baseData: data
        }
    },
    onChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
