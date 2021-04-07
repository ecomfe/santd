<text lang="cn">
#### RadioGroup 组合 - 配置方式
通过配置 `options` 参数来渲染单选框。
</text>

```html
<template>
    <div>
        <s-group value="{{value1}}" options="{{plainOptions}}" on-change="onChange1($event)" name="group1"/>
        <s-group value="{{value2}}" options="{{options}}" on-change="onChange2($event)" name="group2"/>
        <s-group value="{{value3}}" options="{{optionsWithDisabled}}" on-change="onChange3($event)" name="group3"/>
    </div>
</template>
<script>
import {Radio} from 'santd';

export default {
    components: {
        's-radio': Radio,
        's-group': Radio.Group
    },
    initData() {
        return {
            value1: 'Apple',
            value2: 'Apple',
            value3: 'Apple',
            plainOptions: ['Apple', 'Pear', 'Orange'],
            options: [
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' },
            ],
            optionsWithDisabled: [
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange', disabled: true }
            ]
        };
    },
    onChange1(e) {
        this.data.set('value1', e.target.value);
    },
    onChange2(e) {
        this.data.set('value2', e.target.value);
    },
    onChange3(e) {
        this.data.set('value3', e.target.value);
    }
}
</script>
```
