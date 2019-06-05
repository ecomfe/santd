<cn>
#### 标签
tags select，随意输入的内容,然后按回车键即可
</cn>

```html
<template>
    <div>
        <s-select
            defaultValue="{{test}}"
            maxTagCount="{{3}}"
            mode="tags"
            style="width: 100%;"
            placeholder="Please select"
            maxTagPlaceholder="{{maxTagPlaceholder}}"
            on-change="onChange"
        >
            <s-select-option s-for="data in baseData" value="{{data.value}}">{{data.label}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import san from 'san';
import Icon from 'santd/icon';
import Select from 'santd/select';
const data = [{label: 'test1', value: 't1'}, {label: 'test2', value: 't2'}, {label: 'test3', value: 't3'}]
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            baseData: data,
            test: 't1',
            maxTagPlaceholder: function(omitted) {
                return `+ ${omitted.length}...`;
            }
        }
    },
    onChange(val) {
        console.log(val)
    }
}
</script>
```
