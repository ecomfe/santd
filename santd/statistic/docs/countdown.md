<cn>
#### 倒计时
倒计时组件。
</cn>

```html
<template>
  <div>
    <s-row gutter="{{16}}">
        <s-col span="{{12}}">
            <s-countdown
                title="Countdown" value="{{deadline}}" on-finish="handleFinish"/>
        </s-col>
        <s-col span="{{12}}">
            <s-countdown
                title="Million Seconds" value="{{deadline}}" format="HH:mm:ss:SSS"/>
        </s-col>
        <s-col span="{{24}}" style="margin-top: 32px">
            <s-countdown
                title="Day Level" value="{{deadline}}" format="D 天 H 时 m 分 s 秒"/>
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
        's-countdown': statistic.Countdown,
        's-col': col,
        's-row': row
    },
    initData() {
        return {
            deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
        };
    },
    handleFinish() {
        console.log('on-finish');
    }
}
</script>
```