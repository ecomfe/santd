<codebox>
#### 隐藏已选择选项
隐藏下拉列表中已选择的选项。

```html
<template>
    <div>
        <s-select
            mode="multiple"
            placeholder="Inserted are removed"
            value="{{selectedItems}}"
            style="width: 100%;"
            on-change="handleChange"
        >
            <s-select-option
                s-for="item in filteredOptions trackBy item"
                value="{{item}}"
            >{{item}}</s-select-option>
        </s-select>
    </div>
</template>

<script>

import {Select} from 'santd';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    computed: {
        filteredOptions() {
            const selectedItems = this.data.get('selectedItems');
            return OPTIONS.filter(o => !selectedItems.includes(o));
        }
    },
    initData() {
        return {
            selectedItems: []
        };
    },
    handleChange(selectedItems) {
        this.data.set('selectedItems', selectedItems);
    }
}
</script>
```
</codebox>
