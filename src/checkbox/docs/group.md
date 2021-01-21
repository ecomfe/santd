<text lang="cn">
#### Checkbox组
方便的从数组生成Checkbox组。
</text>

```html
<template>
    <div class="checkbox-demo">
        <s-checkboxgroup options="{{plainOptions}}" defaultValue="{{['Apple']}}" on-change="handleChange"></s-checkboxgroup>
        <br /><br />
        <s-checkboxgroup options="{{options}}" defaultValue="{{['Pear']}}" on-change="handleChange"></s-checkboxgroup>
        <br /><br />
        <s-checkboxgroup options="{{optionsWithDisabled}}" disabled="{{true}}" defaultValue="{{['Apple']}}" on-change="handleChange"></s-checkboxgroup>
    </div>
</template>

<script>
import {Checkbox} from 'santd';

const plainOptions = ['Apple', 'Pear', 'Orange'];

const options = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'}
];
const optionsWithDisabled = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: false}
];

export default {
    components:{
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
            options,
            optionsWithDisabled
        };
    },
    handleChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
}
</script>
```
