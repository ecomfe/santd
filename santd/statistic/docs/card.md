<cn>
#### 在卡片中使用
在卡片中展示统计数值。
</cn>

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
import statistic from 'santd/statistic';
import icon from 'santd/icon';
import col from 'santd/col';
import row from 'santd/row';
import card from 'santd/card';
export default {
    components: {
        's-statistic': statistic,
        's-icon': icon,
        's-col': col,
        's-row': row,
        's-card': card
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