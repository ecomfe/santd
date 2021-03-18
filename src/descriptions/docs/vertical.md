<codebox>
#### 垂直
垂直的列表。

```html
<template>
    <div>
        <s-descriptions title="User Info" layout="vertical">
            <s-descriptionsitem label="UserName">Zhou Maomao</s-descriptionsitem>
            <s-descriptionsitem label="Telephone">18100000000</s-descriptionsitem>
            <s-descriptionsitem label="Live">Hangzhou, Zhejiang</s-descriptionsitem>
            <s-descriptionsitem label="Remark">empty</s-descriptionsitem>
            <s-descriptionsitem label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </s-descriptionsitem>
        </s-descriptions>
    </div>
</template>
<script>
import san from 'san';
import {Descriptions} from 'santd';

export default {
    components: {
        's-descriptions': Descriptions,
        's-descriptionsitem': Descriptions.Item
    }
}
</script>
```
</codebox>
