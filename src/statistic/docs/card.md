<text lang="cn">
#### 在卡片中使用
在卡片中展示统计数值。
</text>

```html
<template>
  <div>
    <s-row gutter="{{16}}">
        <s-col span="{{12}}">
            <s-card>
                <s-statistic
                    title="Active"
                    value="{{11.28}}"
                    precision="{{2}}"
                    valueStyle="{{valueStyle}}">
                    <s-icon type="arrow-up" slot="prefix"/>
                    <template slot="suffix">%</template>
                </s-statistic>
            </s-card>
        </s-col>
        <s-col span="{{12}}">
            <s-card>
                <s-statistic
                    title="Idle"
                    value="{{9.3}}"
                    precision="{{2}}"
                    valueStyle="{{valueStyle2}}">
                    <s-icon type="arrow-down" slot="prefix"/>
                    <template slot="suffix">%</template>
                </s-statistic>
            </s-card>
        </s-col>
    </s-row>
  </div>
</template>
<script>
import {Statistic, Col, Row, Icon, Card} from 'santd';

export default {
    components: {
        's-statistic': Statistic,
        's-icon': Icon,
        's-col': Col,
        's-row': Row,
        's-card': Card
    },
    initData() {
        return {
            valueStyle: {
                color: '#3f8600'
            },
            valueStyle2: {
                color: '#cf1322'
            }
        };
    }
}
</script>
```