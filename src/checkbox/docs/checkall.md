<text lang="cn">
#### 全选
在实现全选效果时，你可能会用到 indeterminate 属性。
</text>

```html
<template>
    <div>
        <div style="border-bottom: 1px solid #E9E9E9">
            <s-checkbox indeterminate="{{indeterminate}}" on-change="handleAllChange" checked="{{checkAll}}">Check All</s-checkbox>
        </div>
        <br />
        <s-checkboxgroup options="{{plainOptions}}" value="{{checkedList}}" on-change="handleChange"></s-checkboxgroup>
    </div>
</template>

<script>
import {Checkbox} from 'santd';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

export default {
    components:{
        's-checkbox': Checkbox,
       's-checkboxgroup': Checkbox.Group
    },
    computed: {
        groupValueAllJson() {
            let groupValue = this.data.get('groupValueAll');
            return JSON.stringify(groupValue);
        }
    },
    initData() {
        return {
            plainOptions,
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false
        };
    },
    handleChange(checkedList) {
        const plainOptions = this.data.get('plainOptions');
        this.data.set('checkedList', checkedList);
        this.data.set('indeterminate', !!checkedList.length && (checkedList.length < plainOptions.length));
        this.data.set('checkAll', checkedList.length === plainOptions.length);
    },
    handleAllChange(e) {
        const plainOptions = this.data.get('plainOptions');
        this.data.set('checkedList', e.target.checked ? plainOptions : []);
        this.data.set('indeterminate', false);
        this.data.set('checkAll', e.target.checked);
    }
}
</script>
```
