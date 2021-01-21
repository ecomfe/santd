<text lang="cn">
#### 基本
简单的展示。
</text>

```html
<template>
    <div>
        <s-descriptions title="User Info">
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
