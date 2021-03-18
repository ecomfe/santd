<codebox>
#### 基本
简单的展示。

```html
<template>
  <div>
    <s-row gutter="{{16}}">
        <s-col span="{{12}}">
            <s-statistic
                title="Active Users" value="{{112893}}"/>
        </s-col>
        <s-col span="{{12}}">
            <s-statistic
                title="Account Balance (CNY)" value="{{112893}}" precision="{{2}}"/>
        </s-col>
    </s-row>
  </div>
</template>
<script>
import {Statistic, Col, Row} from 'santd';

export default {
    components: {
        's-statistic': Statistic,
        's-col': Col,
        's-row': Row
    }
}
</script>
```
</codebox>
