<codebox>
#### 带边框的
带边框和背景颜色列表。

```html
<template>
    <div>
        <s-descriptions title="User Info" bordered="{{true}}">
            <s-descriptionsitem label="Product">Cloud Database</s-descriptionsitem>
            <s-descriptionsitem label="Billing Mode">Prepaid</s-descriptionsitem>
            <s-descriptionsitem label="Automatic Renewal">YES</s-descriptionsitem>
            <s-descriptionsitem label="Order time">2018-04-24 18:00:00</s-descriptionsitem>
            <s-descriptionsitem label="Usage Time" span="3">2019-04-24 18:00:00</s-descriptionsitem>
            <s-descriptionsitem label="Status" span="3">
                <s-badge status="processing" text="Running" />
            </s-descriptionsitem>
            <s-descriptionsitem label="Negotiated Amount">$80.00</s-descriptionsitem>
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
import {Descriptions, Badge} from 'santd';

export default {
    components: {
        's-descriptions': Descriptions,
        's-descriptionsitem': Descriptions.Item,
        's-badge': Badge
    }
}
</script>
```
</codebox>
