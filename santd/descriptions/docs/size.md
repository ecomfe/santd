<cn>
#### 自定义尺寸
自定义尺寸，适应在各种容器中展示。
</cn>

```html
<template>
    <div>
        <s-radiogroup on-change="handleChange" value="{{size}}">
            <s-radio value="default">default</s-radio>
            <s-radio value="middle">middle</s-radio>
            <s-radio value="small">small</s-radio>
        </s-radiogroup>
        <br />
        <br />
        <s-descriptions title="Custom Size" bordered size="{{size}}">
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
import Descriptions from 'santd/descriptions';
import Radio from 'santd/radio';
import san from 'san';

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
