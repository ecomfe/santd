<cn>
#### 带搜索框
展开后可对选项进行搜索。
</cn>

```html
<template>
    <div>
        <s-select
            showSearch
            style="width: 200px;"
            placeholder="Select a person"
            on-change="onChange"
            optionFilterProp="children"
            filterOption="{{filterOption}}"
        >
            <s-select-option value="jake">Jake</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-select-option value="jason">Jason</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            filterOption: function(inputValue, option) {
                return option.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
            }
        }
    },
    onChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
