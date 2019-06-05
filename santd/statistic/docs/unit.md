<cn>
#### 单位
通过前缀和后缀添加单位。
</cn>

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
import statistic from 'santd/statistic';
import icon from 'santd/icon';
import col from 'santd/col';
import row from 'santd/row';
export default {
    components: {
        's-statistic': statistic,
        's-icon': icon,
        's-col': col,
        's-row': row
    }
}
</script>
```