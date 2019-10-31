<text lang="cn">
#### 带搜索框
展开后可对选项进行搜索。
</text>

```html
<template>
    <div>
        <s-select
            showSearch="{{true}}"
            style="width: 200px;"
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption="{{filterOption}}"
            on-change="onChange"
            on-focus="onFocus"
            on-blur="onBlur"
            on-search="onSearch"
        >
            <s-select-option value="jack">Jack</s-select-option>
            <s-select-option value="lucy">Lucy</s-select-option>
            <s-select-option value="tom">Tom</s-select-option>
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
            filterOption(inputValue, option) {
                // console.log({inputValue, option});
                return option.data.get('value').toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
            }
        }
    },
    onChange(value) {
        console.log(`selected ${value}`);
    },
    onBlur() {
        console.log('blur');
    },
    onFocus() {
        console.log('focus');
    },
    onSearch(val) {
        console.log('search:', val);
    }
}
</script>
```
