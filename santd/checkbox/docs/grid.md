<cn>
#### 布局
Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局。
</cn>

```html
<template>
    <div>
        <s-checkboxgroup on-change="handleChange" style="{{{width: '100%'}}}">
            <s-row>
                <s-col span="8"><s-checkbox value="A">A</s-checkbox></s-col>
                <s-col span="8"><s-checkbox value="B">B</s-checkbox></s-col>
                <s-col span="8"><s-checkbox value="C">C</s-checkbox></s-col>
                <s-col span="8"><s-checkbox value="D">D</s-checkbox></s-col>
                <s-col span="8"><s-checkbox value="E">E</s-checkbox></s-col>
            </s-row>
        </s-checkboxgroup>
    </div>
</template>

<script>
import Checkbox from 'santd/checkbox';
import Grid from 'santd/grid';

export default {
    components:{
        's-row': Grid.Row,
        's-col': Grid.Col,
        's-checkbox': Checkbox,
        's-checkboxgroup': Checkbox.Group
    },
    handleChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
}
</script>
```
