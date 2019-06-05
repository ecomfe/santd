<cn>
#### 隐藏已选择选项
隐藏下拉列表中已选择的选项。
</cn>

```html
<template>
    <div>
        <s-select
            mode="multiple"
            placeholder="Inserted are removed"
            value="{{selectedItems}}"
            style="width: 100%;"
            on-change="onChange"
            on-deselect="onDeselect"
        >
            <s-select-option s-for="d,index in selectTarget" value="{{d}}">{{d}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';

const OPTIONS = ['Apples', 'Nails', 'Helicopters', 'Bananas'];

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    computed: {
        selectTarget() {
            let selectedItems = this.data.get('selectedItems');
            const res = OPTIONS.filter(item => {
                return !selectedItems.includes(item);
            });
            console.log('过滤的结果', res);
            return res;
        }
    },
    initData() {
        return {
            selectedItems: []
        }
    },
    onChange(value) {
        this.data.set('selectedItems', value);
    },
    onDeselect(val) {
        let selectedItems = this.data.get('selectedItems');
        selectedItems.splice(selectedItems.indexOf(val), 1);
        this.data.set('selectedItems', [...selectedItems]);
    }
}
</script>
```
