<cn>
#### 栅格卡片
在系统概览页面常常和栅格进行配合。
</cn>

```html
<template>
    <div style="background: #ececec; padding: 30px;">
        <s-row gutter="16">
            <s-col span="8">
                <s-card title="Card Title" bordered="{{false}}">Card Content</s-card>
            </s-col>
            <s-col span="8">
                <s-card title="Card Title" bordered="{{false}}">Card Content</s-card>
            </s-col>
            <s-col span="8">
                <s-card title="Card Title" bordered="{{false}}">Card Content</s-card>
            </s-col>
        </s-row>
    </div>
</template>
<script>
import Card from 'santd/card';
import Grid from 'santd/grid';

export default {
    components: {
        's-card': Card,
        's-row': Grid.Row,
        's-col': Grid.Col
    }
}
</script>
```
