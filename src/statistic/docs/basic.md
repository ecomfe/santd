<text lang="cn">
#### 基本
简单的展示。
</text>

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
import statistic from 'santd/statistic';
import col from 'santd/col';
import row from 'santd/row';
export default {
    components: {
        's-statistic': statistic,
        's-col': col,
        's-row': row
    }
}
</script>
```