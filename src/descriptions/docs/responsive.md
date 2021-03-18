<codebox>
#### 响应式
通过响应式的配置可以实现在小屏幕设备上的完美呈现。

```html
<template>
    <div>
        <s-descriptions
            title="Responsive Descriptions"
            bordered="{{true}}"
            column="{{{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}}"
        >
            <s-descriptionsitem label="Product">Cloud Database</s-descriptionsitem>
            <s-descriptionsitem label="Billing Mode">Prepaid</s-descriptionsitem>
            <s-descriptionsitem label="time">18:00:00</s-descriptionsitem>
            <s-descriptionsitem label="Amount">$80.00</s-descriptionsitem>
            <s-descriptionsitem label="Discount">$20.00</s-descriptionsitem>
            <s-descriptionsitem label="Official Receipts">$60.00</s-descriptionsitem>
            <s-descriptionsitem label="Config Info">
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication_factor:3
                <br />
                Region: East China 1<br />
            </s-descriptionsitem>
        </s-descriptions>
    </div>
</template>
<script>
import san from 'san';
import {Descriptions, Radio} from 'santd';

export default {
    initData() {
        return {
            size: 'default'
        };
    },
    components: {
        's-descriptions': Descriptions,
        's-descriptionsitem': Descriptions.Item,
        's-radio': Radio,
        's-radiogroup': Radio.Group
    },
    handleChange(e) {
        this.data.set('size', e.target.value);
    }
}
</script>
```
</codebox>
