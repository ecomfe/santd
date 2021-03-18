<codebox>
#### 单位
通过前缀和后缀添加单位。

```html
<template>
  <div>
    <s-row gutter="{{16}}">
        <s-col span="{{12}}">
            <s-statistic
                title="Feedback"
                value="{{1128}}">
                <s-icon type="like" slot="prefix"/>
            </s-statistic>
        </s-col>
        <s-col span="{{12}}">
            <s-statistic
                title="Unmerged"
                value="{{93}}">
                <template slot="suffix">/ 100</template>
            </s-statistic>
        </s-col>
    </s-row>
  </div>
</template>
<script>
import {Statistic, Col, Row, Icon} from 'santd';

export default {
    components: {
        's-statistic': Statistic,
        's-icon': Icon,
        's-col': Col,
        's-row': Row
    }
}
</script>
```
</codebox>
